import { Component, inject, input } from '@angular/core';
import { IFormField } from '../../../model/field';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../services/form';
import { FieldPreview } from "../field-preview/field-preview";

@Component({
  selector: 'app-form-field',
  imports: [TitleCasePipe, MatButtonModule, MatIconModule, FieldPreview],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  field = input.required<IFormField>();

  formService = inject(FormService)

  deleteField(e: Event) {
    e.stopPropagation();
    this.formService.deleteField(this.field().id)
  }

  deleteFieldInCol(e: Event) {
    e.stopPropagation();
    this.formService.deleteFieldInCol(this.field().id)
  }
}
