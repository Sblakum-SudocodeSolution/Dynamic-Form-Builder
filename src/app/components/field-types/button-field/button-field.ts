import { Component, input } from '@angular/core';
import { IFormField } from '../../../model/field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-field',
  imports: [MatButtonModule],
  templateUrl: './button-field.html',
  styleUrl: './button-field.scss'
})
export class ButtonField {
  field = input.required<IFormField>();
}
