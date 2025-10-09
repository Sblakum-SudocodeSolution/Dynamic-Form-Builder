import { Component, inject } from '@angular/core';
import { FieldTypesService } from '../../services/field-types';
import { FieldButton } from './field-button/field-button';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-form-element-menu',
  imports: [FieldButton, DragDropModule, MatExpansionModule],
  templateUrl: './form-element-menu.html',
  styleUrl: './form-element-menu.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormElementMenu {
  readonly panelOpenState = signal(false);
  fieldTypeService = inject(FieldTypesService);

  fieldTypes = this.fieldTypeService.getAllFieldTypes();
  noDropAllowed(item: CdkDrag<any>) {
    return false;
  }
}
