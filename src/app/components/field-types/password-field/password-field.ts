import { Component, input } from '@angular/core';
import { IFormField } from '../../../model/field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-password-field',
  imports: [MatFormFieldModule, MatInputModule, NgStyle],
  templateUrl: './password-field.html',
  styleUrl: './password-field.scss',
})
export class PasswordField {
  field = input.required<IFormField>();
}
