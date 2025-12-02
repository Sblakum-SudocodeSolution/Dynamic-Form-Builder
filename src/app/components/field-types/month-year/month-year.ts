import { Component, input, signal } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IFormField } from '../../../model/field';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-month-year',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgStyle
  ],
  templateUrl: './month-year.html',
  styleUrl: './month-year.scss',
})
export class MonthYear {
  field = input.required<IFormField>();
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  displayValue = signal<string>('');

  chosenYearHandler(normalizedYear: Date) {
    this.selectedYear = normalizedYear.getFullYear();
  }

  chosenMonthHandler(normalizedMonth: Date, datepicker: any) {
    this.selectedMonth = normalizedMonth.getMonth() + 1;
    const formatted =
      this.selectedYear && this.selectedMonth
        ? `${this.selectedMonth.toString().padStart(2, '0')}/${
            this.selectedYear
          }`
        : '';
    this.displayValue.set(formatted);
    datepicker.close();
  }
}
