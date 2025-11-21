import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { IFormField } from '../../../model/field';

@Component({
  selector: 'app-matrix-choice-textbox',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './matrix-choice-textbox.html',
  styleUrl: './matrix-choice-textbox.scss',
})
export class MatrixChoiceTextbox {
  @Input() field!: IFormField;
  @Input() formControl!: FormControl;

  ngOnInit(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({});
    }
    if (!this.formControl.value) {
      this.formControl.setValue({});
    }
  }

  getValue(rowIndex: number, colIndex: number): string | number {
    const matrix = this.formControl?.value || {};
    return matrix[`${rowIndex}-${colIndex}`] || '';
  }

  setValue(rowIndex: number, colIndex: number, value: any): void {
    const matrix = { ...(this.formControl?.value || {}) };
    matrix[`${rowIndex}-${colIndex}`] = value;
    this.formControl?.setValue(matrix);
    this.formControl?.markAsDirty();
  }

  getInputType(): string {
    switch (this.field?.fieldType) {
      case 'number':
        return 'number';
      case 'currency':
        return 'number';
      default:
        return 'text';
    }
  }

  getPlaceholder(): string {
    switch (this.field?.fieldType) {
      case 'number':
        return '123';
      case 'currency':
        return '.00';
      default:
        return 'text';
    }
  }
}
