import { Component, input, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IFormField } from '../../../model/field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-file-field',
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatButtonModule, NgStyle],
  templateUrl: './file-field.html',
  styleUrl: './file-field.scss',
})
export class FileField {
  field = input.required<IFormField>();
  fileNames = signal<string>('');

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files).map((f) => f.name);
    this.fileNames.set(files.join(', '));
    console.log(files);
  }
}
