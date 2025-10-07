import { Component, input } from '@angular/core';
import { IFormField } from '../../../model/field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-email-field',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './email-field.html',
  styleUrl: './email-field.scss'
})
export class EmailField {
  field = input.required<IFormField>();
}
