import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IFormField } from '../../../model/field';

@Component({
  selector: 'app-time',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './time.html',
  styleUrl: './time.scss',
})
export class Time {
  field = input.required<IFormField>();
}
