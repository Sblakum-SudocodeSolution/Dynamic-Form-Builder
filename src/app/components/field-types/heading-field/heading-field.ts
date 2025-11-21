import { Component, input } from '@angular/core';
import { IFormField } from '../../../model/field';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-heading-field',
  imports: [MatFormFieldModule],
  templateUrl: './heading-field.html',
  styleUrl: './heading-field.scss',
})
export class HeadingField {
  field = input.required<IFormField>();
}
