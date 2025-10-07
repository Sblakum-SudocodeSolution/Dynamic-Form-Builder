import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IFormField } from '../../../model/field';

@Component({
  selector: 'app-label-field',
  imports: [MatFormFieldModule],
  templateUrl: './label-field.html',
  styleUrl: './label-field.scss'
})
export class LabelField {
  field = input.required<IFormField>();
}
