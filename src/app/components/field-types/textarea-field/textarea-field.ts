import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IFormField } from '../../../model/field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textarea-field',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './textarea-field.html',
  styleUrl: './textarea-field.scss'
})
export class TextareaField {
  field = input.required<IFormField>();
}
