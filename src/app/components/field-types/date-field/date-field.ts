import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IFormField } from '../../../model/field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-date-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgStyle
  ],
  templateUrl: './date-field.html',
  styleUrl: './date-field.scss',
})
export class DateField {
  field = input.required<IFormField>();
}
