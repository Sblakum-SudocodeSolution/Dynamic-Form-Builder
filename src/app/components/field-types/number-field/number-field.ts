import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IFormField } from '../../../model/field';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-number-field',
  imports: [MatFormFieldModule, MatInputModule, NgStyle],
  templateUrl: './number-field.html',
  styleUrl: './number-field.scss',
})
export class NumberField {
  field = input.required<IFormField>();
}
