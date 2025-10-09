import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IFormField } from '../../../model/field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-field',
  imports: [MatFormFieldModule, MatIconModule, CommonModule],
  templateUrl: './file-field.html',
  styleUrl: './file-field.scss',
})
export class FileField {
  field = input.required<IFormField>();

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  }

  // selectedFileName: string | null = null;
  // selectedFile: File | null = null;

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //     this.selectedFileName = this.selectedFile.name;
  //     console.log('Selected file:', this.selectedFile);
  //   }
  // }
}
