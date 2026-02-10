import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { IFormField } from '../../../model/field';
import { FieldTypesService } from '../../../services/field-types';
import { FormService } from '../../../services/form';
import { MainCanvas } from '../main-canvas';

@Component({
  selector: 'app-field-preview',
  imports: [NgComponentOutlet],
  templateUrl: './field-preview.html',
  styleUrl: './field-preview.scss',
})
export class FieldPreview {
  field = input.required<IFormField>();

  fieldTypeService = inject(FieldTypesService);
  formService = inject(FormService);
  mainCanvas = inject(MainCanvas);

  previewComponent = computed(() => {
    const type = this.fieldTypeService.getFieldType(this.field().type);
    return type?.component ?? null;
  });

  selectField(event: MouseEvent) {
    event.stopPropagation();
    if (this.mainCanvas.activeTab() === 'preview') {
      return;
    }

    const id = this.field()?.id ?? null;

    if (id) {
      this.formService.setSelectedFieldId(id);
    }
  }
}
