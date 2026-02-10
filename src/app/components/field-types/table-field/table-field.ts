// import { Component, Input } from '@angular/core';
// import { IFormField } from '../../../model/field';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';

// @Component({
//   selector: 'app-table-field',
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatInputModule,
//     MatButtonModule,
//     MatTableModule,
//     MatFormFieldModule,
//     MatIconModule,
//   ],
//   templateUrl: './table-field.html',
//   styleUrl: './table-field.scss',
// })
// export class TableField {
//   @Input() field!: IFormField;

//   dataSource!: MatTableDataSource<any>;
//   displayedColumns: string[] = [];

//   filterText = '';
//   editingRowIndex: number | null = null;
//   newRow: any | null = null;

//   ngOnInit() {
//     if (!this.field.tableData) {
//       this.field.tableData = [];
//     }

//     this.displayedColumns = [
//       ...(this.field.tableColumns || []).map((c) => c.key),
//       'actions',
//     ];

//     this.dataSource = new MatTableDataSource(this.field.tableData);
//   }

//   applyFilter() {
//     this.dataSource.filter = this.filterText.trim().toLowerCase();
//   }

//   addRow() {
//     this.newRow = {};
//     (this.field.tableColumns || []).forEach((col) => {
//       this.newRow![col.key] = '';
//     });
//   }

//   saveNewRow() {
//     this.field.tableData!.push({ ...this.newRow });
//     this.dataSource.data = this.field.tableData!;
//     this.newRow = null;
//   }

//   cancelNewRow() {
//     this.newRow = null;
//   }

//   editRow(index: number) {
//     this.editingRowIndex = index;
//   }

//   saveRow() {
//     this.editingRowIndex = null;
//   }

//   deleteRow(index: number) {
//     if (!confirm('Are you sure you want to delete this record?')) return;
//     this.field.tableData!.splice(index, 1);
//     this.dataSource.data = this.field.tableData!;
//   }
// }

import {
  Component,
  Input,
  DoCheck,
  IterableDiffers,
  ChangeDetectorRef,
} from '@angular/core';
import { IFormField } from '../../../model/field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
  ],
  templateUrl: './table-field.html',
  styleUrl: './table-field.scss',
})
export class TableField implements DoCheck, AfterViewInit {
  @Input() field!: IFormField;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];

  filterText = '';
  editingRowIndex: number | null = null;
  newRow: any | null = null;

  private columnsDiffer: any;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private differs: IterableDiffers,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.field.tableData) {
      this.field.tableData = [];
    }

    this.columnsDiffer = this.differs
      .find(this.field.tableColumns || [])
      .create();

    this.refreshTable();
  }

  ngDoCheck() {
    if (!this.field?.tableColumns) return;

    const changes = this.columnsDiffer.diff(this.field.tableColumns);
    if (changes) {
      this.refreshTable();
    }
  }

  private refreshTable() {
    this.displayedColumns = [
      ...(this.field.tableColumns || []).map((col) => col.key),
      'actions',
    ];

    this.dataSource.data = [...(this.field.tableData || [])];
    // this.dataSource._updateChangeSubscription();

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator.firstPage();
    }

    // if (this.paginator) {
    //   this.paginator.firstPage();
    // }

    // this.cdr.detectChanges();
  }

  applyFilter() {
    this.dataSource.filter = this.filterText.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  addRow() {
    this.newRow = {};
    (this.field.tableColumns || []).forEach((col) => {
      this.newRow![col.key] = '';
    });
  }

  saveNewRow() {
    this.field.tableData!.push({ ...this.newRow });
    this.dataSource.data = [...this.field.tableData!];
    this.newRow = null;
  }

  cancelNewRow() {
    this.newRow = null;
  }

  editRow(index: number) {
    this.editingRowIndex = index;
  }

  saveRow() {
    this.editingRowIndex = null;
  }

  deleteRow(index: number) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.field.tableData!.splice(index, 1);
    this.dataSource.data = [...this.field.tableData!];
  }
}
