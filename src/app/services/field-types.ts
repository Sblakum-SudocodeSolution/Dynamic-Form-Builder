import { Injectable } from '@angular/core';
import { IFieldType } from '../model/field';
import { TextField } from '../components/field-types/text-field/text-field';
import { CheckboxField } from '../components/field-types/checkbox-field/checkbox-field';
import { SelectField } from '../components/field-types/select-field/select-field';
import { DateField } from '../components/field-types/date-field/date-field';

const TEXT_FIELD_DEFINITION: IFieldType = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'text',
      key: 'placeholder',
      label: 'Placeholder',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
    {
      type: 'select',
      key: 'inputType',
      label: 'Input Type',
      options: [
        {
          value: 'text',
          label: 'Text',
        },
        {
          value: 'number',
          label: 'Number',
        },
        {
          value: 'email',
          label: 'Email',
        },
        {
          value: 'tel',
          label: 'Phone',
        },
      ],
    },
  ],
  component: TextField,
};

const CHECKBOX_FIELD_DEFINITION: IFieldType = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox Field',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
  ],
  component: CheckboxField,
};

const SELECT_FIELD_DEFINITION: IFieldType = {
  type: 'select',
  label: 'Dropdown',
  icon: 'arrow_drop_down_circle',
  component: SelectField,
  defaultConfig: {
    label: 'Select',
    required: false,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
    {
      type: 'dynamic-options',
      key: 'options',
      label: 'Dropdown Options',
    },
  ],
};

const DATE_FIELD_DEFINITION: IFieldType = {
  type: 'date',
  label: 'Date Picker',
  icon: 'calendar_today',
  component: DateField,
  defaultConfig: {
    label: 'Date',
    required: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required',
    },
  ],

  generateCode: (field: any) =>
    `<mat-form-field class="w-full"\n` +
    ` <mat-label>{{field().label}}</mat-label>\n` +
    ` <input matInput [matDatepicker]="picker${field.id}" [required]="${field.required}" />\n` +
    `<mat-datepicker-toggle matIconSuffix [for]="picker${field.id}"></mat-datepicker-toggle>\n` +
    ` <mat-datepicker #picker${field.id}></mat-datepicker>\n` +
    ` </mat-form-field>\n `,
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypesService {
  fieldTypes = new Map<string, IFieldType>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['select', SELECT_FIELD_DEFINITION],
    ['date', DATE_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): IFieldType | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldTypes(): IFieldType[] {
    return Array.from(this.fieldTypes.values());
  }
}
