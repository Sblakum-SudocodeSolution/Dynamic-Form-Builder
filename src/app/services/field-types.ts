import { Injectable } from '@angular/core';
import { IFieldType } from '../model/field';
import { TextField } from '../components/field-types/text-field/text-field';
import { CheckboxField } from '../components/field-types/checkbox-field/checkbox-field';
import { SelectField } from '../components/field-types/select-field/select-field';
import { DateField } from '../components/field-types/date-field/date-field';
import { HeadingField } from '../components/field-types/heading-field/heading-field';
import { TextareaField } from '../components/field-types/textarea-field/textarea-field';
import { RadioField } from '../components/field-types/radio-field/radio-field';
import { LabelField } from '../components/field-types/label-field/label-field';
import { NumberField } from '../components/field-types/number-field/number-field';
import { EmailField } from '../components/field-types/email-field/email-field';
import { PasswordField } from '../components/field-types/password-field/password-field';
import { FileField } from '../components/field-types/file-field/file-field';
import { ButtonField } from '../components/field-types/button-field/button-field';

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
    // {
    //   type: 'select',
    //   key: 'inputType',
    //   label: 'Input Type',
    //   options: [
    //     {
    //       value: 'text',
    //       label: 'Text',
    //     },
    //     {
    //       value: 'number',
    //       label: 'Number',
    //     },
    //     {
    //       value: 'email',
    //       label: 'Email',
    //     },
    //     {
    //       value: 'tel',
    //       label: 'Phone',
    //     },
    //   ],
    // },
  ],
  component: TextField,
};

const CHECKBOX_FIELD_DEFINITION: IFieldType = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
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

const HEADING_FIELD_DEFINITION: IFieldType = {
  type: 'heading',
  label: 'Heading',
  icon: 'title',
  defaultConfig: {
    label: 'Heading',
    required: false,
    headingType: '2em',
    headingAlign: 'left',
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Heading' },
    {
      type: 'select',
      key: 'headingType',
      label: 'Heading Type',
      options: [
        {
          value: '2em',
          label: 'H1',
        },
        {
          value: '1.5em',
          label: 'H2',
        },
        {
          value: '1.17em',
          label: 'H3',
        },
        {
          value: '.83em',
          label: 'H4',
        },
        {
          value: '.75em',
          label: 'H5',
        },
        {
          value: '.67em',
          label: 'H6',
        },
      ],
    },
    {
      type: 'select',
      key: 'headingAlign',
      label: 'Heading Align',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
    },
  ],
  component: HeadingField,
};

const SELECT_FIELD_DEFINITION: IFieldType = {
  type: 'select',
  label: 'Select',
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

const TEXTAREA_FIELD_DEFINITION: IFieldType = {
  type: 'textarea',
  label: 'Text area',
  icon: 'notes',
  component: TextareaField,
  defaultConfig: {
    label: 'Text area',
    required: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
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
      key: 'rows',
      label: 'Rows',
      options: [
        {
          value: '3',
          label: '3',
        },
        {
          value: '4',
          label: '4',
        },
        {
          value: '5',
          label: '5',
        },
        {
          value: '6',
          label: '6',
        },
      ],
    },
  ],
};

const RADIO_FIELD_DEFINITION: IFieldType = {
  type: 'radio',
  label: 'Radio Group',

  icon: 'radio_button_checked',
  component: RadioField,
  defaultConfig: {
    label: 'Radio Group',
    required: false,
    radioOptions: [
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
      key: 'radioOptions',
      label: 'Radio Options',
    },
  ],
};

const LABLE_FIELD_DEFINITION: IFieldType = {
  type: 'label',
  label: 'Label',
  icon: 'label',
  component: LabelField,
  defaultConfig: {
    label: 'Label',
    required: false,
  },
  settingsConfig: [{ type: 'text', key: 'label', label: 'Label' }],
};

const NUMBER_FIELD_DEFINITION: IFieldType = {
  type: 'number',
  label: 'Number',
  icon: 'pin',
  defaultConfig: {
    label: 'Number',
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
  ],
  component: NumberField,
};

const EMAIL_FIELD_DEFINITION: IFieldType = {
  type: 'email',
  label: 'Email',
  icon: 'email',
  defaultConfig: {
    label: 'Email',
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
  ],
  component: EmailField,
};

const PASSWORD_FIELD_DEFINITION: IFieldType = {
  type: 'password',
  label: 'Password',
  icon: 'password',
  defaultConfig: {
    label: 'Password',
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
  ],
  component: PasswordField,
};

const FILE_FIELD_DEFINITION: IFieldType = {
  label: 'file',
  type: 'file',
  icon: 'attach_file',
  defaultConfig: {
    label: 'File',
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
  component: FileField,
};

const BUTTON_FIELD_DEFINITION: IFieldType = {
  type: 'button',
  label: 'Button',
  icon: 'smart_button',
  defaultConfig: {
    label: 'Button',
    // action: 'submit',
    buttonType: 'primary',
    buttonAlign: 'left',
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    {
      type: 'select',
      key: 'buttonType',
      label: 'Type',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'success', label: 'Success' },
        { value: 'info', label: 'Info' },
        { value: 'danger', label: 'Danger' },
      ],
    },
    {
      type: 'select',
      key: 'buttonAlign',
      label: 'Align',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
    },
  ],
  component: ButtonField,
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypesService {
  fieldTypes = new Map<string, IFieldType>([
    ['text', TEXT_FIELD_DEFINITION],
    ['number', NUMBER_FIELD_DEFINITION],
    ['email', EMAIL_FIELD_DEFINITION],
    ['password', PASSWORD_FIELD_DEFINITION],
    ['label', LABLE_FIELD_DEFINITION],
    ['heading', HEADING_FIELD_DEFINITION],
    ['textarea', TEXTAREA_FIELD_DEFINITION],
    ['radio', RADIO_FIELD_DEFINITION],
    ['select', SELECT_FIELD_DEFINITION],
    ['date', DATE_FIELD_DEFINITION],
    ['file', FILE_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['button', BUTTON_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): IFieldType | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldTypes(): IFieldType[] {
    return Array.from(this.fieldTypes.values());
  }
}
