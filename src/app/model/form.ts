import { IFormField } from './field';

// export interface IFormRow {
//   id: string;
//   fields: IFormField[];
//   columns?: IFormCol[];
// }

// export interface IFormCol {
//   id: string;
//   fields: IFormField[];
// }

// export interface IFormContainer {
//   id: string;
//   type: 'container';
//   rows: IFormRow[];
// }

// export interface IForm {
//   id: string;
//   type: 'form';
//   rows?: IFormRow[];
//   container?: IFormContainer;
//   containers?: IFormContainer[];
// }

export interface IFormRow {
  id: string;
  fields: IFormField[];
  columns?: IFormCol[];
}

export interface IFormCol {
  id: string;
  fields: IFormField[];
}

export interface IFormContainer {
  id: string;
  type: 'container';
  title?: string;
  rows: IFormRow[];
}

export interface IForm {
  id: string;
  type: 'form';
  container?: IFormContainer;
}
