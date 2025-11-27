import { Type } from '@angular/core';

export interface IFieldType {
  type: string;
  label: string;
  icon: string;
  defaultConfig: any;
  settingsConfig: IFieldSettings[];
  component: Type<unknown>;
  generateCode?: any;
}

export interface IFieldSettings {
  type:
    | 'text'
    | 'checkbox'
    | 'select'
    | 'number'
    | 'radio'
    | 'textarea'
    | 'dynamic-options'
    | 'date'
    | 'h1'
    | 'time'
    | 'file'
    | 'datetime'
    | 'month-year'
    | 'group'
    | 'image'
    | 'dynamic-list'
    | 'slider'
    | 'multi-select';

  key: string;
  label: string;
  options?: OptionItem[];
  fields?: IFieldSettings[];
  placeholder?: string;
  rows?: { label: string }[];
  columns?: { label: string }[];
}

export interface OptionItem {
  label: string;
  value: string | number;
}

export interface RadioItem {
  label: string;
  value: string;
}

export interface FieldConfig {
  label: string;
  placeholder: string;
  required: boolean;
  options?: OptionItem[];
}

export interface IFormField {
  multiple: any;
  id: string;
  type: string;
  label: string;
  required: boolean;
  inputType?: string;
  placeholder?: string;
  [key: string]: any;
  headingType?: string;
  headingAlign?: 'left' | 'center' | 'right';
  buttonType?: string;
  buttonAlign?: 'left' | 'center' | 'right';
  fieldStyleType: 'outline' | 'fill';
  radioOptions?: RadioItem[];
  options: OptionItem[];
  address?: {
    fields: {
      street1: FieldConfig;
      street2: FieldConfig;
      city: FieldConfig;
      state: FieldConfig;
      zipcode: FieldConfig;
      country: FieldConfig & { options?: OptionItem[] };
    };
  };
  rating?: number;
  maxRating?: number;
  ratingStyleType?: 'star' | 'number';

  matrixValues?: Record<number, number[]>;

  rows?: { label: string }[];
  columns?: { label: string; options?: { label: string; value: string }[] }[];
  dropdownOptions?: { label: string; value: string }[];
  fieldType?: 'text' | 'number' | 'currency' | 'checkbox' | 'radio';

  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}
