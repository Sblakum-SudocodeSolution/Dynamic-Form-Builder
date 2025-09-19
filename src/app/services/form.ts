import { computed, Injectable, signal } from '@angular/core';
import { IFormRow } from '../model/form';
import { IFormField } from '../model/field';
import { FormField } from '../components/main-canvas/form-field/form-field';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _rows = signal<IFormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();

  public readonly selectedField = computed(() =>
    this._rows()
      .flatMap((row) => row.fields)
      .find((f) => f.id === this._selectedFieldId())
  );

  constructor() {
    this._rows.set([{ id: crypto.randomUUID(), fields: [] }]);
  }

  addField(field: IFormField, rowId: string, index?: number) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const updatedFields = [...row.fields];

        if (index !== undefined) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }
        return { ...row, fields: updatedFields };
      }
      return row;
    });
    this._rows.set(newRows);
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.filter((f) => f.id !== fieldId),
    }));
    this._rows.set(newRows);
  }

  addRow() {
    const newRow: IFormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };

    const rows = this._rows();
    this._rows.set([...rows, newRow]);
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }

    const rows = this._rows();
    const newRow = rows.filter((row) => row.id !== rowId);
    this._rows.set(newRow);
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1
  ) {
    const rows = this._rows();
    let fieldToMove: IFormField | undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;

    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex((f) => f.id === fieldId);
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });

    if (!fieldToMove) return;
    const newRows = [...rows];
    const fieldsWithRemovedField = newRows[sourceRowIndex].fields.filter(
      (f) => f.id !== fieldId
    );
    newRows[sourceRowIndex].fields = fieldsWithRemovedField;

    const targetRowIndex = newRows.findIndex((r) => r.id === targetRowId);

    if (targetRowIndex >= 0) {
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetFields;
    }

    this._rows;
  }

  setSelectedFieldId(fieldId: string) {
    this._selectedFieldId.set(fieldId);
  }

  updateField(fieldId: string, data: Partial<FormField>) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.map((f) => (f.id === fieldId ? { ...f, ...data } : f)),
    }));
    this._rows.set(newRows);
  }
}
