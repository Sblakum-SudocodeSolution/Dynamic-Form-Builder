import { Component, inject } from '@angular/core';
import { FieldTypesService } from '../../services/field-types';
import { FieldButton } from './field-button/field-button';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { IFieldType } from '../../model/field';

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

  private readonly categoryConfig: { title: string; types: string[] }[] = [
    {
      title: 'Basic Fields',
      types: ['text', 'textarea', 'number', 'range', 'email', 'password'],
    },
    {
      title: 'Selection Controls',
      types: ['radio', 'checkbox', 'select', 'multi-select', 'rating'],
    },
    {
      title: 'Matrix Choices',
      types: [
        'matrix-choice-radio',
        'matrix-choice-checkbox',
        'matrix-choice-dropdown',
        'matrix-choice-textbox',
      ],
    },
    {
      title: 'Date & Time',
      types: ['date', 'time', 'datetime', 'month-year'],
    },
    {
      title: 'Uploads',
      types: ['file', 'image', 'audio', 'video', 'signature'],
    },
    {
      title: 'Content & Layout',
      types: ['label', 'heading', 'button', 'address'],
    },
  ];

  categories = this.buildCategories();

  private buildCategories(): { title: string; fields: IFieldType[] }[] {
    const allTypes = this.fieldTypeService.getAllFieldTypes();
    const used = new Set<string>();

    const mapped = this.categoryConfig
      .map((category) => {
        const fields = category.types
          .map((type) => {
            const fieldType = this.fieldTypeService.getFieldType(type);
            if (fieldType) {
              used.add(type);
            }
            return fieldType;
          })
          .filter((field): field is IFieldType => !!field);

        return {
          title: category.title,
          fields,
        };
      })
      .filter((category) => category.fields.length > 0);

    const remaining = allTypes.filter((type) => !used.has(type.type));
    if (remaining.length) {
      mapped.push({
        title: 'Other Fields',
        fields: remaining,
      });
    }

    return mapped;
  }

  noDropAllowed(item: CdkDrag<any>) {
    return false;
  }
}
