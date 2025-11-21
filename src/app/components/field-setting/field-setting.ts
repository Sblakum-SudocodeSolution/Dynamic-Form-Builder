import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../services/form';
import { FieldTypesService } from '../../services/field-types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DynamicOptions } from './dynamic-options/dynamic-options';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-field-setting',
  imports: [
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatCheckbox,
    MatSelectModule,
    DynamicOptions,
    MatRadioModule,
    MatIconModule,
  ],
  templateUrl: './field-setting.html',
  styleUrl: './field-setting.scss',
})
export class FieldSetting {
  formService = inject(FormService);
  fieldTypesService = inject(FieldTypesService);

  fieldSettings = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return [];

    const fieldDef = this.fieldTypesService.getFieldType(field.type);
    return fieldDef?.settingsConfig || [];
  });

  fieldvalues = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return {};
    return field as any;
  });

  updateField(fieldId: string, key: string, value: any) {
    this.formService.updateField(fieldId, { [key]: value });
  }

  updateNestedField(
    fieldId: string,
    subKey: string,
    property: string,
    value: any
  ) {
    const field: any = this.formService.selectedField();
    if (!field?.address?.fields?.[subKey]) return;

    const updated = {
      ...field,
      address: {
        ...field.address,
        fields: {
          ...field.address.fields,
          [subKey]: {
            ...field.address.fields[subKey],
            [property]: value,
          },
        },
      },
    };

    this.formService.updateField(fieldId, updated as any);
  }
}
