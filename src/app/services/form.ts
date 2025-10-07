import { ApplicationRef, computed, inject, Injectable, signal } from '@angular/core';
import { IFormRow } from '../model/form';
import { IFormField } from '../model/field';
import { FormField } from '../components/main-canvas/form-field/form-field';
import { startViewTransition } from '../utils/view-transion';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _rows = signal<IFormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();
  private appRef = inject(ApplicationRef)

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

    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.filter((f) => f.id !== fieldId),
    }));
    startViewTransition(() => {
      this._rows.set(newRows);
      this.appRef.tick();
    });
  }

  addRow() {
    const newRow: IFormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };

    const rows = this._rows();

    startViewTransition(() => {

      this._rows.set([...rows, newRow]);
    });

  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }

    const rows = this._rows();
    const newRow = rows.filter((row) => row.id !== rowId);

    startViewTransition(() => {
      this._rows.set(newRow);
      this.appRef.tick();
    });

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
    startViewTransition(() => {

      this._rows.set(newRows);
      this.appRef.tick();
    });
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

  moveRowUp(rowId: string) {
    const rows = this._rows();
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    if (rowIndex > 0) {
      const newRows = [...rows];
      const temp = newRows[rowIndex - 1];
      newRows[rowIndex - 1] = newRows[rowIndex];
      newRows[rowIndex] = temp;


      startViewTransition(() => {
        this._rows.set(newRows);
      });
    }
  }

  moveRowDown(rowId: string) {
    const rows = this._rows();
    const rowIndex = rows.findIndex((row) => row.id === rowId);
    if (rowIndex < rows.length - 1) {
      const newRows = [...rows];
      const temp = newRows[rowIndex + 1];
      newRows[rowIndex + 1] = newRows[rowIndex];
      newRows[rowIndex] = temp;

      startViewTransition(() => {
        this._rows.set(newRows);
      });
    }
  }

  // exportForm() {
  //   const formCode = this.generateFormCode();
  //   console.log(formCode);
  // }

  // generateFormCode(): string {

  // }
}