import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFormField } from '../../../model/field';
import { CommonModule, NgStyle } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-matrix-choice-dropdown',
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, NgStyle],
  templateUrl: './matrix-choice-dropdown.html',
  styleUrl: './matrix-choice-dropdown.scss',
})
export class MatrixChoiceDropdown {
  @Input() field!: IFormField;
  @Input() formControl!: FormControl;

  getValue(rowIndex: number, colIndex: number): string {
    const matrix = this.formControl?.value || {};
    return matrix[`${rowIndex}-${colIndex}`] || '';
  }

  setValue(rowIndex: number, colIndex: number, value: string): void {
    const matrix = { ...(this.formControl?.value || {}) };
    matrix[`${rowIndex}-${colIndex}`] = value;
    this.formControl?.setValue(matrix);
    this.formControl?.markAsDirty();
  }

  getOptions(colIndex: number) {
    return (
      this.field.columns?.[colIndex]?.options ||
      this.field.dropdownOptions ||
      []
    );
  }
}
