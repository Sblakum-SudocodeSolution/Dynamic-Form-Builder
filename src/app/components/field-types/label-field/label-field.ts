import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IFormField } from '../../../model/field';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-label-field',
  imports: [MatFormFieldModule, NgStyle],
  templateUrl: './label-field.html',
  styleUrl: './label-field.scss'
})
export class LabelField {
  field = input.required<IFormField>();
}
