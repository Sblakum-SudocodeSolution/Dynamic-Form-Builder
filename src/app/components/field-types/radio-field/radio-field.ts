import { Component, input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { IFormField } from '../../../model/field';


@Component({
  selector: 'app-radio-field',
  imports: [MatRadioModule,
    MatFormFieldModule,
    FormsModule],
  templateUrl: './radio-field.html',
  styleUrl: './radio-field.scss'
})
export class RadioField {
  field = input.required<IFormField>();
}
