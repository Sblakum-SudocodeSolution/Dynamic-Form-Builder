import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IFormField } from '../../../model/field';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-select-field',
  imports: [MatSelectModule, MatFormFieldModule, NgStyle],
  templateUrl: './select-field.html',
  styleUrl: './select-field.scss',
})
export class SelectField {
  field = input.required<IFormField>();
}
