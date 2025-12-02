import { Component, input } from '@angular/core';
import { IFormField } from '../../../model/field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-heading-field',
  imports: [MatFormFieldModule, NgStyle],
  templateUrl: './heading-field.html',
  styleUrl: './heading-field.scss',
})
export class HeadingField {
  field = input.required<IFormField>();
}
