import { Component, inject, Input } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { IFormRow } from '../../../model/form';
import { FormService } from '../../../services/form';
import { IFieldType, IFormField } from '../../../model/field';
import { CommonModule } from '@angular/common';
import { FormField } from '../form-field/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-row',
  imports: [
    CommonModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    FormField,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
  ],
  templateUrl: './app-row.html',
  styleUrl: './app-row.scss',
})
export class AppRow {
  @Input() row!: IFormRow;
  formService = inject(FormService);

  onDropInRow(event: CdkDragDrop<string>, rowId: string) {
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data as IFieldType;
      const newField: IFormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        ...fieldType.defaultConfig,
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

  onDropInCol(event: CdkDragDrop<string>, colId: string) {
    if (event.previousContainer === event.container) {
      return;
    }

    const droppedField = event.item.data as IFormField;

    const newField: IFormField = {
      ...droppedField,
      id: crypto.randomUUID(),
    };

    this.formService.addFieldToCol(newField, colId);
  }
}
