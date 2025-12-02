import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form';
import { IFieldType, IFormField } from '../../../model/field';
import { FormField } from '../form-field/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-editor',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    FormField,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
  ],
  templateUrl: './form-editor.html',
  styleUrl: './form-editor.scss',
})
export class FormEditor {
  formService = inject(FormService);

  onDropInRow(event: CdkDragDrop<string>, rowId: string) {
    const data = event.item.data;

    if (event.previousContainer.data === 'field-selector') {
      const fieldType = data as IFieldType;

      if (
        fieldType.type === 'grid-1' ||
        fieldType.type === 'grid-2' ||
        fieldType.type === 'grid-3'
      ) {
        const columns =
          fieldType.defaultConfig?.columns ??
          (fieldType.type === 'grid-1'
            ? 1
            : fieldType.type === 'grid-2'
            ? 2
            : 3);

        this.formService.addColumnsToRow(rowId, Number(columns));
        return;
      }

      const newField: IFormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        ...fieldType.defaultConfig,
        margin: fieldType.defaultConfig?.margin ?? {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      };
      this.formService.addField(newField, rowId, event.currentIndex);
      return;
    }

    const dragData = event.item.data as IFormField;
    const previousRowId = event.previousContainer.data as string;

    this.formService.moveField(
      dragData.id,
      previousRowId,
      rowId,
      event.currentIndex
    );
  }

  onDropInCol(event: CdkDragDrop<any>, colId: string) {
    const droppedData = event.item.data as IFieldType | IFormField;

    if (
      (droppedData as any).type === 'grid-1' ||
      (droppedData as any).type === 'grid-2' ||
      (droppedData as any).type === 'grid-3'
    ) {
      console.warn('Grid fields cannot be dropped inside a column.');
      return;
    }

    if (event.previousContainer.data === 'field-selector') {
      const fieldType = droppedData as IFieldType;

      const newField: IFormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        label: fieldType.label,
        icon: (fieldType as any).icon,
        component: fieldType.component,
        settingsConfig: fieldType.settingsConfig || [],
        multiple: (fieldType as any).multiple ?? false,
        required: (fieldType as any).required ?? false,
        fieldStyleType: (fieldType as any).fieldStyleType ?? 'fill',
        config: fieldType.defaultConfig?.config
          ? { ...fieldType.defaultConfig.config }
          : {},
        style: fieldType.defaultConfig?.style
          ? { ...fieldType.defaultConfig.style }
          : {},
        margin: fieldType.defaultConfig?.margin ?? {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        options: [],
      };

      this.formService.addFieldToCol(newField, colId);
      return;
    }

    const existingField = droppedData as IFormField;
    this.formService.moveExistingFieldToCol(existingField.id, colId);
  }
}
