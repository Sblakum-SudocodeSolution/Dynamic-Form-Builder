import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IFormField } from '../../../model/field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-field',
  imports: [MatIconModule, CommonModule, MatFormFieldModule],
  templateUrl: './file-field.html',
  styleUrl: './file-field.scss',
})
export class FileField {
  field = input.required<IFormField>();

  onFileSelected(event: Event) {
    const fileElement = event.target as HTMLInputElement;
    const file = fileElement.files ? fileElement.files[0] : null;

    if (file) {
      console.log('file:', file.name);
    }
  }
}
