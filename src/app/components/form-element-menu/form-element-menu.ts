import { Component, inject } from '@angular/core';
import { FieldTypesService } from '../../services/field-types';
import { FieldButton } from './field-button/field-button';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-element-menu',
  imports: [FieldButton, DragDropModule],
  templateUrl: './form-element-menu.html',
  styleUrl: './form-element-menu.scss',
})
export class FormElementMenu {
  fieldTypeService = inject(FieldTypesService);

  fieldTypes = this.fieldTypeService.getAllFieldTypes();
  noDropAllowed(item: CdkDrag<any>) {
    return false;
  }
}
