import { CommonModule } from '@angular/common';
import { Component, Input, input, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IFormField } from '../../../model/field';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-matrix-choice-checkbox',
  imports: [CommonModule, MatCheckboxModule, MatFormFieldModule],
  templateUrl: './matrix-choice-checkbox.html',
  styleUrl: './matrix-choice-checkbox.scss',
})
export class MatrixChoiceCheckbox {
  @Input() field!: IFormField;
  @Input() formControl!: FormControl;

  toggleValue(rowIndex: number, colIndex: number) {
    const key = `${rowIndex}-${colIndex}`;
    const currentValues = this.formControl?.value || {};
    const newValue = { ...currentValues, [key]: !currentValues[key] };
    this.formControl?.setValue(newValue);
  }

  isChecked(rowIndex: number, colIndex: number): boolean {
    const key = `${rowIndex}-${colIndex}`;
    return this.formControl?.value?.[key] ?? false;
  }
}
