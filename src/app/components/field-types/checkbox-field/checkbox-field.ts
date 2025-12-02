import { Component, input } from '@angular/core';
import { IFormField } from '../../../model/field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-checkbox-field',
  imports: [MatCheckboxModule, NgStyle],
  templateUrl: './checkbox-field.html',
  styleUrl: './checkbox-field.scss',
})
export class CheckboxField {
  field = input.required<IFormField>();
}
