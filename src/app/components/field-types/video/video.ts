import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IFormField } from '../../../model/field';

@Component({
  selector: 'app-video',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './video.html',
  styleUrl: './video.scss',
})
export class Video {
  @Input() field!: IFormField;
  selectedFile?: File;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  get videoUrl(): string | null {
    return this.selectedFile ? URL.createObjectURL(this.selectedFile) : null;
  }
}
