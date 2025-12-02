import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IFormField } from '../../../model/field';

@Component({
  selector: 'app-audio',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    NgStyle
  ],
  templateUrl: './audio.html',
  styleUrl: './audio.scss',
})
export class Audio {
  @Input() field!: IFormField;
  selectedFile?: File;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  get audioUrl(): string | null {
    return this.selectedFile ? URL.createObjectURL(this.selectedFile) : null;
  }
}
