import { Component, Input } from '@angular/core';
import { IFormField, ITableColumn } from '../../../model/field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-columns-setting',
  imports: [CommonModule, FormsModule],
  templateUrl: './table-columns-setting.html',
  styleUrl: './table-columns-setting.scss',
})
export class TableColumnsSetting {
  @Input() field!: IFormField;

  addColumn() {
    if (!this.field.tableColumns) this.field.tableColumns = [];
    if (!this.field.tableData) this.field.tableData = [];

    const index = this.field.tableColumns.length + 1;
    const key = `col${index}`;

    const newColumn: ITableColumn = {
      key,
      label: `Column ${index}`,
      type: 'text',
    };

    this.field.tableColumns.push(newColumn);

    // ✅ Add this column to all existing rows
    this.field.tableData.forEach((row) => {
      row[key] = '';
    });
  }

  removeColumn(index: number) {
    if (!this.field.tableColumns || !this.field.tableData) return;

    const removed = this.field.tableColumns[index];

    // Remove column definition
    this.field.tableColumns.splice(index, 1);

    // Remove column data from all rows
    this.field.tableData.forEach((row) => {
      delete row[removed.key];
    });
  }
}
