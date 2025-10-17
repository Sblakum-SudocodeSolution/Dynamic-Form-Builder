import {
  ApplicationRef,
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { IFormCol, IFormRow } from '../model/form';
import { IFormField } from '../model/field';
import { FormField } from '../components/main-canvas/form-field/form-field';
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

  // public readonly selectedField = computed(() =>
  //   this._rows()
  //     .flatMap((row) => row.fields)
  //     .find((f) => f.id === this._selectedFieldId())
  // );

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

  // addFieldToCol(field: IFormField, colId: string, index?: number) {
  //   const cols = this._cols();
  //   const newCols = cols.map((col) => {
  //     if (col.id === colId) {
  //       const updatedFields = [...col.fields];
  //       if (index !== undefined) {
  //         updatedFields.splice(index, 0, field);
  //       } else {
  //         updatedFields.push(field);
  //       }
  //       return { ...col, fields: updatedFields };
  //     }
  //     return col;
  //   });

  //   startViewTransition(() => {
  //     this._cols.set(newCols);
  //   });
  // }

  addFieldToCol(field: IFormField, colId: string, index?: number) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      if (!row.columns) return row; // skip rows without columns

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

  // deleteField(fieldId: string) {
  //   const rows = this._rows();
  //   const newRows = rows.map((row) => ({
  //     ...row,
  //     fields: row.fields.filter((f) => f.id !== fieldId),
  //   }));
  //   startViewTransition(() => {
  //     this._rows.set(newRows);
  //     this.appRef.tick();
  //   });
  // }

  deleteField(fieldId: string) {
    const rows = this._rows();

    const newRows = rows.map((row) => {
      // Remove from row-level fields
      const updatedRowFields = row.fields.filter((f) => f.id !== fieldId);

      // If columns exist, also check them
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
    const newRow: IFormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };

    const rows = this._rows();

    startViewTransition(() => {
      this._rows.set([...rows, newRow]);
    });
  }

  // addColumnToRow(rowId: string) {
  //   const rows = this._rows();
  //   const newRows = rows.map((row) => {
  //     if (row.id === rowId) {
  //       const currentCols = row.columns ?? [];

  //       if (currentCols.length >= 2) {
  //         console.warn('Max 2 columns per row reached');
  //         return row;
  //       }

  //       const newCol: IFormCol = {
  //         id: crypto.randomUUID(),
  //         fields: [],
  //       };

  //       const updatedCols = [...currentCols, newCol];

  //       return {
  //         ...row,
  //         columns: updatedCols,
  //       };
  //     }
  //     return row;
  //   });

  //   startViewTransition(() => {
  //     this._rows.set(newRows);
  //   });
  // }

  // addColumnToRow(rowId: string) {
  //   const rows = this._rows();

  //   const newRows = rows.map((row) => {
  //     if (row.id === rowId) {
  //       const currentCols = row.columns ?? [];

  //       if (currentCols.length >= 2) {
  //         console.warn('Max 2 columns per row reached');
  //         return row;
  //       }

  //       const newCol: IFormCol = {
  //         id: crypto.randomUUID(),
  //         fields: [],
  //       };

  //       let updatedCols = [...currentCols, newCol];

  //       if (currentCols.length === 0 && row.fields && row.fields.length > 0) {
  //         updatedCols[0].fields = [...row.fields];
  //       }

  //       return {
  //         ...row,
  //         columns: updatedCols,
  //         fields: [],
  //       };
  //     }

  //     return row;
  //   });

  //   startViewTransition(() => {
  //     this._rows.set(newRows);
  //   });
  // }

  addColumnToRow(rowId: string) {
    const rows = this._rows();

    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const currentCols = row.columns ?? [];

        // Create a new column
        const newCol: IFormCol = {
          id: crypto.randomUUID(),
          fields: [],
        };

        let updatedCols = [...currentCols, newCol];

        // If this is the first column being added AND row already has fields,
        // move those fields into the new first column
        if (currentCols.length === 0 && row.fields && row.fields.length > 0) {
          updatedCols[0].fields = [...row.fields];
        }

        return {
          ...row,
          columns: updatedCols,
          fields: [], // clear row-level fields once columns exist
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

  // deleteCol(colId: string) {
  //   if (this._cols().length === 1) {
  //     return;
  //   }
  //   const cols = this._cols();
  //   const newCol = cols.filter((col) => col.id !== colId);

  //   startViewTransition(() => {
  //     this._cols.set(newCol);
  //     this.appRef.tick();
  //   });
  // }

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

  // moveFieldInCol(
  //   fieldId: string,
  //   sourceColId: string,
  //   targetColId: string,
  //   targetIndex: number = -1
  // ) {
  //   const cols = this._cols();
  //   let fieldToMove: IFormField | undefined;
  //   let sourceColIndex = -1;
  //   let sourceFieldIndex = -1;
  //   cols.forEach((col, colIndex) => {
  //     if (col.id === sourceColId) {
  //       sourceColIndex = colIndex;
  //       sourceFieldIndex = col.fields.findIndex((f) => f.id === fieldId);
  //       if (sourceFieldIndex >= 0) {
  //         fieldToMove = col.fields[sourceFieldIndex];
  //       }
  //     }
  //   });

  //   if (!fieldToMove) return;
  //   const newCols = [...cols];
  //   const fieldsWithRemovedField = newCols[sourceColIndex].fields.filter(
  //     (f) => f.id !== fieldId
  //   );
  //   newCols[sourceColIndex].fields = fieldsWithRemovedField;
  //   const targetColIndex = newCols.findIndex((r) => r.id === targetColId);

  //   if (targetColIndex >= 0) {
  //     const targetFields = [...newCols[targetColIndex].fields];
  //     targetFields.splice(targetIndex, 0, fieldToMove);
  //     newCols[targetColIndex].fields = targetFields;
  //   }
  //   startViewTransition(() => {
  //     this._cols.set(newCols);
  //     this.appRef.tick();
  //   });
  // }

  moveFieldInCol(
    fieldId: string,
    sourceColId: string,
    targetColId: string,
    targetIndex: number = -1
  ) {
    const cols = [...this._cols()]; // clone array to avoid mutating signal directly
    let fieldToMove: IFormField | undefined;

    // Find source column and remove the field
    const sourceColIndex = cols.findIndex((c) => c.id === sourceColId);
    if (sourceColIndex === -1) return;

    const sourceCol = cols[sourceColIndex];
    const sourceFieldIndex = sourceCol.fields.findIndex(
      (f) => f.id === fieldId
    );
    if (sourceFieldIndex === -1) return;

    // Extract the existing field object (don't copy)
    fieldToMove = sourceCol.fields[sourceFieldIndex];

    // Remove it from the source column
    sourceCol.fields = sourceCol.fields.filter((f) => f.id !== fieldId);

    // Find target column
    const targetColIndex = cols.findIndex((c) => c.id === targetColId);
    if (targetColIndex === -1) return;

    const targetCol = cols[targetColIndex];
    const fields = [...targetCol.fields];

    // Determine correct insertion position
    const insertIndex =
      targetIndex < 0 || targetIndex > fields.length
        ? fields.length
        : targetIndex;

    // Insert the *same object* (no copy)
    fields.splice(insertIndex, 0, fieldToMove);

    // Assign updated arrays
    cols[targetColIndex] = { ...targetCol, fields };
    cols[sourceColIndex] = { ...sourceCol };

    startViewTransition(() => {
      this._cols.set(cols);
      this._selectedFieldId.set(fieldToMove!.id); // optional: keep selection
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

  // updateField(fieldId: string, data: Partial<FormField>) {
  //   const rows = this._rows();

  //   const newRows = rows.map((row) => ({
  //     ...row,
  //     // Update fields directly under row
  //     fields:
  //       row.fields?.map((f) => (f.id === fieldId ? { ...f, ...data } : f)) ??
  //       [],
  //     // Update fields inside columns
  //     columns:
  //       row.columns?.map((col) => ({
  //         ...col,
  //         fields:
  //           col.fields?.map((f) =>
  //             f.id === fieldId ? { ...f, ...data } : f
  //           ) ?? [],
  //       })) ?? [],
  //   }));

  //   this._rows.set(newRows);
  // }

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
