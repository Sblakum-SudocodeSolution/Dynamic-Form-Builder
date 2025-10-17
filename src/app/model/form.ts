import { IFormField } from './field';

export interface IFormRow {
  id: string;
  fields: IFormField[];
  columns?: IFormCol[];
}

export interface IFormCol {
  id: string;
  fields: IFormField[];
}
