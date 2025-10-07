import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-file-field',
  imports: [MatFormFieldModule],
  templateUrl: './file-field.html',
  styleUrl: './file-field.scss'
})
export class FileField {
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  }
}
