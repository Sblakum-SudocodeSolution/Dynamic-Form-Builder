import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IFormField } from '../../../model/field';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-text-field',
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, NgStyle],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextField {
  field = input.required<IFormField>();
}
