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
  type: 'text' | 'checkbox' | 'select' | 'textarea' | 'dynamic-options' | 'date' | 'h1';
  key: string;
  label: string;
  options?: OptionItem[];
}

export interface OptionItem {
  label: string;
  value: string;
}

export interface RadioItem {
  label: string;
  value: string;
}

export interface IFormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  inputType?: string;
  placeholder?: string;
  rows?: number;
  headingType?: string;
  buttonType?: string;
  radioOptions?: RadioItem[];
  options: OptionItem[];
}
