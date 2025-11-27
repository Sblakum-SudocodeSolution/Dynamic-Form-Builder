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
import { Address } from '../components/field-types/address/address';
import { MultiSelect } from '../components/field-types/multi-select/multi-select';
import { Time } from '../components/field-types/time/time';
import { DateTime } from '../components/field-types/date-time/date-time';
import { MonthYear } from '../components/field-types/month-year/month-year';
import { Image } from '../components/field-types/image/image';
import { Rating } from '../components/field-types/rating/rating';
import { Slider } from '../components/field-types/slider/slider';
import { Video } from '../components/field-types/video/video';
import { Audio } from '../components/field-types/audio/audio';
import { Signature } from '../components/field-types/signature/signature';
import { MatrixChoiceRadio } from '../components/field-types/matrix-choice-radio/matrix-choice-radio';
import { MatrixChoiceTextbox } from '../components/field-types/matrix-choice-textbox/matrix-choice-textbox';
import { MatrixChoiceDropdown } from '../components/field-types/matrix-choice-dropdown/matrix-choice-dropdown';

const TEXT_FIELD_DEFINITION: IFieldType = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
    fieldStyleType: 'fill',
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
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
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
    fieldStyleType: 'fill',
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
    {
      type: 'select',
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
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
    placeholder: 'DD/MM/YY',
    fieldStyleType: 'fill',
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
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
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
    fieldStyleType: 'fill',
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
    {
      type: 'select',
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
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
    fieldStyleType: 'fill',
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
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
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
    fieldStyleType: 'fill',
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
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
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
    fieldStyleType: 'fill',
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
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
    },
  ],
  component: PasswordField,
};

const FILE_FIELD_DEFINITION: IFieldType = {
  type: 'file',
  label: 'File Upload',
  icon: 'upload_file',
  component: FileField,
  defaultConfig: {
    label: 'File Upload',
    placeholder: 'No file chosen',
    required: false,
    multiple: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'text', key: 'placeholder', label: 'Placeholder' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'checkbox', key: 'multiple', label: 'Allow Multiple Files' },
  ],
  generateCode: (field: any) =>
    `<div class="w-full">
  <label class="block mb-1 font-medium">{{field().label}}</label>
  <div class="flex items-center gap-2 border border-gray-300 rounded-md p-2 bg-white">
    <input type="file" class="hidden" [attr.multiple]="field().multiple ? true : null" [required]="field().required" />
    <button mat-flat-button color="primary" type="button">
      <mat-icon>upload</mat-icon> Upload File
    </button>
    <span class="text-sm text-gray-600 flex-1">{{field().placeholder}}</span>
  </div>
</div>`,
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

const ADDRESS_FIELD_DEFINITION: IFieldType = {
  type: 'address',
  label: 'Address',
  icon: 'home',
  defaultConfig: {
    label: 'Address',
    required: false,
    address: {
      fields: {
        street1: {
          label: 'Street 1',
          required: false,
        },
        street2: {
          label: 'Street 2',
          required: false,
        },
        city: { label: 'City', required: false },
        state: { label: 'State', required: false },
        zipcode: {
          label: 'Zip Code',
          required: false,
        },
        country: {
          label: 'Country',
          required: false,
          options: [
            { value: 'india', label: 'India' },
            { value: 'usa', label: 'USA' },
            { value: 'uk', label: 'UK' },
          ],
        },
      },
    },
    fieldStyleType: 'fill',
  },
  settingsConfig: [
    {
      type: 'group',
      key: 'address',
      label: 'Address Fields',
      fields: [
        { type: 'text', key: 'street1', label: 'Street 1' },
        { type: 'text', key: 'street2', label: 'Street 2' },
        { type: 'text', key: 'city', label: 'City' },
        { type: 'text', key: 'state', label: 'State' },
        { type: 'number', key: 'zipcode', label: 'Zip Code' },
        { type: 'dynamic-options', key: 'country', label: 'Country' },
      ],
    },
    {
      type: 'select',
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
    },
  ],
  component: Address,
};

const MULTI_SELECT_FIELD_DEFINITION: IFieldType = {
  type: 'multi-select',
  label: 'Multi Select',
  icon: 'playlist_add_check',
  component: MultiSelect,
  defaultConfig: {
    label: 'Multi Select',
    required: false,
    options: [
      { value: 'reading', label: 'Reading' },
      { value: 'traveling', label: 'Traveling' },
      { value: 'sports', label: 'Sports' },
    ],
    fieldStyleType: 'fill',
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
      label: 'Select Options',
    },
    {
      type: 'select',
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
    },
  ],
};

const TIME_FIELD_DEFINITION: IFieldType = {
  type: 'time',
  label: 'Time Picker',
  icon: 'access_time',
  component: Time,
  defaultConfig: {
    label: 'Time',
    required: false,
    placeholder: 'HH:MM',
    fieldStyleType: 'fill',
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'text', key: 'placeholder', label: 'Placeholder' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    {
      type: 'select',
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
    },
  ],

  generateCode: (field: any) =>
    `<mat-form-field class="w-full">
  <mat-label>{{field().label}}</mat-label>
  <input matInput type="time" [placeholder]="field().placeholder" [required]="field().required">
</mat-form-field>`,
};

const DATETIME_FIELD_DEFINITION: IFieldType = {
  type: 'datetime',
  label: 'Date & Time',
  icon: 'event',
  component: DateTime,
  defaultConfig: {
    label: 'Date & Time',
    required: false,
    placeholder: 'Select date and time',
    fieldStyleType: 'fill',
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'text', key: 'placeholder', label: 'Placeholder' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    {
      type: 'select',
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
    },
  ],
  generateCode: (field: any) =>
    `<div class="flex gap-2 w-full">
  <mat-form-field class="flex-1">
    <mat-label>{{field().label}} (Date)</mat-label>
    <input matInput [matDatepicker]="picker" [placeholder]="field().placeholder" [required]="field().required">
    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>

  <mat-form-field class="flex-1">
    <mat-label>Time</mat-label>
    <input matInput type="time" [required]="field().required">
  </mat-form-field>
</div>`,
};

const MONTH_YEAR_FIELD_DEFINITION: IFieldType = {
  type: 'month-year',
  label: 'Month & Year',
  icon: 'date_range',
  component: MonthYear,
  defaultConfig: {
    label: 'Month & Year',
    required: false,
    placeholder: 'Select month and year',
    fieldStyleType: 'fill',
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'text', key: 'placeholder', label: 'Placeholder' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    {
      type: 'select',
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
    },
  ],
  generateCode: (field: any) =>
    `<mat-form-field class="w-full">
  <mat-label>{{field().label}}</mat-label>
  <input matInput [matDatepicker]="picker" [placeholder]="field().placeholder" [required]="field().required" readonly>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker
    #picker
    startView="multi-year"
    (yearSelected)="chosenYearHandler($event)"
    (monthSelected)="chosenMonthHandler($event, picker)"
  ></mat-datepicker>
</mat-form-field>`,
};

const IMAGE_FIELD_DEFINITION: IFieldType = {
  type: 'image',
  label: 'Image Capture',
  icon: 'photo_camera',
  component: Image,
  defaultConfig: {
    label: 'Image Capture',
    required: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
  ],
  generateCode: (field: any) =>
    `<div class="flex flex-col gap-2">
  <label class="font-medium">{{field().label}}</label>
  <button mat-stroked-button color="primary"><mat-icon>photo_camera</mat-icon> Capture Image</button>
</div>`,
};

const RATING_FIELD_DEFINITION: IFieldType = {
  type: 'rating',
  label: 'Rating',
  icon: 'star',
  component: Rating,
  defaultConfig: {
    label: 'Rating',
    required: false,
    maxRating: 5,
    ratingStyleType: 'star',
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },

    {
      type: 'select',
      key: 'ratingStyleType',
      label: 'Rating Style',
      options: [
        { value: 'star', label: 'Star' },
        { value: 'number', label: 'Number' },
      ],
    },

    {
      type: 'select',
      key: 'maxRating',
      label: 'Max Stars',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
      ],
    },
  ],
};

const AUDIO_FIELD_DEFINITION: IFieldType = {
  type: 'audio',
  label: 'Audio Uploader',
  icon: 'audiotrack',
  defaultConfig: {
    label: 'Upload Audio',
    required: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
  ],
  component: Audio,
};

const VIDEO_FIELD_DEFINITION: IFieldType = {
  type: 'video',
  label: 'Video Uploader',
  icon: 'videocam',
  defaultConfig: {
    label: 'Upload Video',
    required: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
  ],
  component: Video,
};

const SIGNATURE_FIELD_DEFINITION: IFieldType = {
  type: 'signature',
  label: 'Signature',
  icon: 'draw',
  defaultConfig: {
    label: 'Signature',
    required: false,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
  ],
  component: Signature,
};

const RANGE_FIELD_DEFINITION: IFieldType = {
  type: 'range',
  label: 'Range',
  icon: 'tune',
  component: Slider,
  defaultConfig: {
    label: 'Range',
    required: false,
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 100,
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    { type: 'number', key: 'min', label: 'Minimum Value' },
    { type: 'number', key: 'max', label: 'Maximum Value' },
    { type: 'number', key: 'step', label: 'Step Size' },
    { type: 'number', key: 'defaultValue', label: 'Default Value' },
  ],
};

const MATRIX_CHOICE_RADIO_FIELD_DEFINITION: IFieldType = {
  type: 'matrix-choice-radio',
  label: 'Matrix Choice (Select)',
  icon: 'radio_button_checked',
  component: MatrixChoiceRadio,
  defaultConfig: {
    label: 'Matrix Choice (Radio)',
    fieldType: 'checkbox',
    required: false,
    rows: [
      { label: 'First Question' },
      { label: 'Second Question' },
      { label: 'Third Question' },
    ],
    columns: [
      { label: 'Answer A' },
      { label: 'Answer B' },
      { label: 'Answer C' },
    ],
  },
  settingsConfig: [
    { type: 'text', key: 'label', label: 'Label' },
    { type: 'checkbox', key: 'required', label: 'Required' },
    {
      type: 'select',
      key: 'fieldType',
      label: 'Field Type',
      options: [
        { label: 'Checkbox', value: 'checkbox' },
        { label: 'Radio', value: 'radio' },
      ],
    },
    { type: 'dynamic-options', key: 'rows', label: 'Rows (Questions)' },
    { type: 'dynamic-options', key: 'columns', label: 'Columns (Answers)' },
  ],
};

const MATRIX_CHOICE_TEXTBOX_FIELD_DEFINITION: IFieldType = {
  type: 'matrix-choice-textbox',
  label: 'Matrix Choice (Input-box)',
  icon: 'grid_on',
  component: MatrixChoiceTextbox,
  defaultConfig: {
    label: 'Matrix Choice',
    fieldType: 'text',
    rows: [
      { label: 'First Question' },
      { label: 'Second Question' },
      { label: 'Third Question' },
    ],
    columns: [
      { label: 'Answer A' },
      { label: 'Answer B' },
      { label: 'Answer C' },
    ],
    fieldStyleType: 'fill',
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
      placeholder: 'Enter label',
    },
    { type: 'checkbox', key: 'required', label: 'Required' },

    {
      type: 'select',
      key: 'fieldType',
      label: 'Field Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
        { label: 'Currency', value: 'currency' },
      ],
    },
    {
      type: 'select',
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
    },
    { type: 'dynamic-options', key: 'rows', label: 'Rows (Questions)' },
    { type: 'dynamic-options', key: 'columns', label: 'Columns (Answers)' },
  ],
};

const MATRIX_CHOICE_DROPDOWN_FIELD_DEFINITION: IFieldType = {
  type: 'matrix-choice-dropdown',
  label: 'Matrix Choice (Dropdown)',
  icon: 'table_chart',
  component: MatrixChoiceDropdown,
  defaultConfig: {
    label: 'Matrix Choice',
    rows: [
      { label: 'First Question' },
      { label: 'Second Question' },
      { label: 'Third Question' },
    ],
    columns: [
      { label: 'Answer A' },
      { label: 'Answer B' },
      { label: 'Answer C' },
    ],
    dropdownOptions: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    fieldStyleType: 'fill',
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label',
    },

    {
      type: 'select',
      key: 'fieldStyleType',
      label: 'Field Style Type',
      options: [
        { value: 'fill', label: 'Fill' },
        { value: 'outline', label: 'Outline' },
      ],
    },

    {
      type: 'dynamic-options',
      key: 'dropdownOptions',
      label: 'Dropdown Options',
    },

    { type: 'dynamic-options', key: 'rows', label: 'Rows (Questions)' },
    { type: 'dynamic-options', key: 'columns', label: 'Columns (Answers)' },
  ],
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
    ['address', ADDRESS_FIELD_DEFINITION],
    ['radio', RADIO_FIELD_DEFINITION],
    ['select', SELECT_FIELD_DEFINITION],
    ['multi-select', MULTI_SELECT_FIELD_DEFINITION],
    ['date', DATE_FIELD_DEFINITION],
    ['time', TIME_FIELD_DEFINITION],
    ['datetime', DATETIME_FIELD_DEFINITION],
    ['month-year', MONTH_YEAR_FIELD_DEFINITION],
    ['file', FILE_FIELD_DEFINITION],
    ['image', IMAGE_FIELD_DEFINITION],
    ['audio', AUDIO_FIELD_DEFINITION],
    ['video', VIDEO_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['rating', RATING_FIELD_DEFINITION],
    ['signature', SIGNATURE_FIELD_DEFINITION],
    ['button', BUTTON_FIELD_DEFINITION],
    ['matrix-choice-radio', MATRIX_CHOICE_RADIO_FIELD_DEFINITION],
    ['matrix-choice-textbox', MATRIX_CHOICE_TEXTBOX_FIELD_DEFINITION],
    ['matrix-choice-dropdown', MATRIX_CHOICE_DROPDOWN_FIELD_DEFINITION],
    ['range', RANGE_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): IFieldType | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldTypes(): IFieldType[] {
    return Array.from(this.fieldTypes.values());
  }
}
