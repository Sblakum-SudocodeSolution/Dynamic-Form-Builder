import { CommonModule, NgStyle } from '@angular/common';
import { Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IFormField } from '../../../model/field';

@Component({
  selector: 'app-image',
  imports: [CommonModule, MatButtonModule, MatIconModule, NgStyle],
  templateUrl: './image.html',
  styleUrl: './image.scss',
})
export class Image {
  field = input.required<IFormField>();
  previewUrl = signal<string | null>(null);
  cameraActive = signal<boolean>(false);

  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  private stream: MediaStream | null = null;

  openGallery() {
    this.fileInput.nativeElement.click();
  }

  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoRef.nativeElement.srcObject = this.stream;
      this.cameraActive.set(true);
    } catch (err) {
      console.error('Camera access denied:', err);
      alert('Unable to access camera. Please allow camera permissions.');
    }
  }

  capturePhoto() {
    if (!this.videoRef?.nativeElement) return;

    const video = this.videoRef.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    this.previewUrl.set(imageData);
    this.stopCamera();
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.cameraActive.set(false);
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }
}
