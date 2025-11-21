import { Component, input } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IFormField } from '../../../model/field';

@Component({
  selector: 'app-date-time',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './date-time.html',
  styleUrl: './date-time.scss',
})
export class DateTime {
  field = input.required<IFormField>();
}
