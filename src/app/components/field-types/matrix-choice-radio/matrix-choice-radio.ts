import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-matrix-choice-radio',
  imports: [
    CommonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './matrix-choice-radio.html',
  styleUrl: './matrix-choice-radio.scss',
})
export class MatrixChoiceRadio {
  @Input() field: any;
  @Input() formControl!: FormControl;

  getSelectedColumn(rowIndex: number): number | null {
    return this.formControl?.value?.[rowIndex] ?? null;
  }

  selectValue(rowIndex: number, columnIndex: number) {
    const value = { ...(this.formControl?.value || {}) };
    value[rowIndex] = columnIndex;
    this.formControl?.setValue(value);
  }

  isSelected(rowIndex: number, columnIndex: number): boolean {
    return this.formControl?.value?.[rowIndex] === columnIndex;
  }

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

  getInputType(): string {
    switch (this.field?.fieldType) {
      case 'radio':
        return 'radio';
      default:
        return 'checkbox';
    }
  }
}
