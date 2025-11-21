import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IFormField } from '../../../model/field';

@Component({
  selector: 'app-multi-select',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.scss',
})
export class MultiSelect {
  field = input.required<IFormField>();
}
