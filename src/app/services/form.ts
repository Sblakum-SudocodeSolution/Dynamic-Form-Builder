import {
  ApplicationRef,
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { IForm, IFormCol, IFormRow } from '../model/form';
import { IFormField } from '../model/field';
import { startViewTransition } from '../utils/view-transion';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _rows = signal<IFormRow[]>([]);
  private _cols = signal<IFormCol[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();
  public readonly cols = this._cols.asReadonly();
  private appRef = inject(ApplicationRef);

  private _form = signal<IForm>({
    id: crypto.randomUUID(),
    type: 'form',
    rows: [],
    viewMode: 'container',
  });

  form = this._form.asReadonly();

  public readonly selectedField = computed(() =>
    this._rows()
      .flatMap((row) => [
        ...(row.fields ?? []),
        ...(row.columns?.flatMap((col) => col.fields ?? []) ?? []),
      ])
      .find((f) => f.id === this._selectedFieldId())
  );

  constructor() {
    this._rows.set([{ id: crypto.randomUUID(), fields: [] }]);
    this._cols.set([{ id: crypto.randomUUID(), fields: [] }]);
  }

  setFormViewMode(mode: 'container' | 'card') {
    const updatedForm = { ...this._form(), viewMode: mode };
    this._form.set(updatedForm);
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

  addFieldToCol(field: IFormField, colId: string, index?: number) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      if (!row.columns) return row;

      const updatedCols = row.columns.map((col) => {
        if (col.id === colId) {
          const updatedFields = [...col.fields];
          if (index !== undefined) {
            updatedFields.splice(index, 0, field);
          } else {
            updatedFields.push(field);
          }
          return { ...col, fields: updatedFields };
        }
        return col;
      });

      return { ...row, columns: updatedCols };
    });

    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  deleteField(fieldId: string) {
    const rows = this._rows();

    const newRows = rows.map((row) => {
      const updatedRowFields = row.fields.filter((f) => f.id !== fieldId);
      const updatedColumns = row.columns?.map((col) => ({
        ...col,
        fields: col.fields.filter((f) => f.id !== fieldId),
      }));

      return {
        ...row,
        fields: updatedRowFields,
        columns: updatedColumns ?? row.columns,
      };
    });

    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  deleteFieldInCol(fieldId: string) {
    const cols = this._cols();
    const newCols = cols.map((col) => ({
      ...col,
      fields: col.fields.filter((f) => f.id !== fieldId),
    }));
    startViewTransition(() => {
      this._cols.set(newCols);
      this.appRef.tick();
    });
  }

  addRow() {
    const form = this._form();
    const newRow: IFormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };
    const rows = this._rows();

    startViewTransition(() => {
      this._rows.set([...rows, newRow]);
    });
  }

  addColumnToRow(rowId: string) {
    const rows = this._rows();

    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const currentCols = row.columns ?? [];

        const newCol: IFormCol = {
          id: crypto.randomUUID(),
          fields: [],
        };

        let updatedCols = [...currentCols, newCol];
        if (currentCols.length === 0 && row.fields && row.fields.length > 0) {
          updatedCols[0].fields = [...row.fields];
        }

        return {
          ...row,
          columns: updatedCols,
          fields: [],
        };
      }

      return row;
    });

    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  addColumnsToRow(rowId: string, numCols: number) {
    if (numCols <= 0) return;

    const rows = this._rows();

    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const currentCols = row.columns ?? [];

        const createdCols: IFormCol[] = [];

        if (currentCols.length > 0) {
          createdCols.push(...currentCols);
          for (let i = 0; i < numCols; i++) {
            createdCols.push({ id: crypto.randomUUID(), fields: [] });
          }
        } else {
          for (let i = 0; i < numCols; i++) {
            createdCols.push({ id: crypto.randomUUID(), fields: [] });
          }
          if (row.fields && row.fields.length > 0) {
            createdCols[0].fields = [...row.fields];
          }
        }

        return {
          ...row,
          columns: createdCols,
          fields: [],
        };
      }

      return row;
    });

    startViewTransition(() => {
      this._rows.set(newRows);
    });
  }

  addCol() {
    const newCol: IFormCol = {
      id: crypto.randomUUID(),
      fields: [],
    };
    const cols = this._cols();

    startViewTransition(() => {
      this._cols.set([...cols, newCol]);
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

  deleteCol(colId: string) {
    const rows = this._rows().map((row) => ({
      ...row,
      columns: row.columns?.filter((col) => col.id !== colId),
    }));

    startViewTransition(() => this._rows.set(rows));
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

  moveFieldInCol(
    fieldId: string,
    sourceColId: string,
    targetColId: string,
    targetIndex: number = -1
  ) {
    const cols = [...this._cols()];
    let fieldToMove: IFormField | undefined;

    const sourceColIndex = cols.findIndex((c) => c.id === sourceColId);
    if (sourceColIndex === -1) return;

    const sourceCol = cols[sourceColIndex];
    const sourceFieldIndex = sourceCol.fields.findIndex(
      (f) => f.id === fieldId
    );
    if (sourceFieldIndex === -1) return;

    fieldToMove = sourceCol.fields[sourceFieldIndex];

    sourceCol.fields = sourceCol.fields.filter((f) => f.id !== fieldId);

    const targetColIndex = cols.findIndex((c) => c.id === targetColId);
    if (targetColIndex === -1) return;

    const targetCol = cols[targetColIndex];
    const fields = [...targetCol.fields];

    const insertIndex =
      targetIndex < 0 || targetIndex > fields.length
        ? fields.length
        : targetIndex;

    fields.splice(insertIndex, 0, fieldToMove);
    cols[targetColIndex] = { ...targetCol, fields };
    cols[sourceColIndex] = { ...sourceCol };

    startViewTransition(() => {
      this._cols.set(cols);
      this._selectedFieldId.set(fieldToMove!.id);
      this.appRef.tick();
    });
  }

  moveExistingFieldToCol(fieldId: string, colId: string) {
    const rows = this._rows();

    let foundField: IFormField | null = null;

    const updatedRows = rows.map((row) => {
      let updatedColumns = row.columns;
      if (row.columns) {
        updatedColumns = row.columns.map((col) => {
          const exists = col.fields.some((f) => f.id === fieldId);
          if (exists) {
            foundField = col.fields.find((f) => f.id === fieldId) ?? null;
            return {
              ...col,
              fields: col.fields.filter((f) => f.id !== fieldId),
            };
          }
          return col;
        });
      }

      const updatedFields = row.fields.filter((f) => {
        if (f.id === fieldId) {
          foundField = f;
          return false;
        }
        return true;
      });

      return {
        ...row,
        fields: updatedFields,
        columns: updatedColumns ?? row.columns,
      };
    });

    if (!foundField) return;

    const finalRows = updatedRows.map((row) => {
      if (!row.columns) return row;

      return {
        ...row,
        columns: row.columns.map((col) => {
          if (col.id === colId) {
            return { ...col, fields: [...col.fields, foundField!] };
          }
          return col;
        }),
      };
    });

    startViewTransition(() => {
      this._rows.set(finalRows);
      this._selectedFieldId.set(foundField!.id);
      this.appRef.tick();
    });
  }

  setSelectedFieldId(fieldId: string | null) {
    this._selectedFieldId.set(fieldId);
  }

  updateField(fieldId: string, data: Partial<IFormField>) {
    const rows = this._rows();

    const updatedRows = rows.map((row) => ({
      ...row,
      fields: row.fields.map((f) => (f.id === fieldId ? { ...f, ...data } : f)),
      columns: row.columns?.map((col) => ({
        ...col,
        fields: col.fields.map((f) =>
          f.id === fieldId ? { ...f, ...data } : f
        ),
      })),
    }));

    this._rows.set(updatedRows);
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
}
