import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import SignaturePad from 'signature_pad';
import { IFormField } from '../../../model/field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signature',
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, NgStyle],
  templateUrl: './signature.html',
  styleUrl: './signature.scss',
})
export class Signature implements AfterViewInit {
  @Input() formGroup!: FormGroup;
  @Input() field!: IFormField;
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  signaturePad!: SignaturePad;
  signatureDataUrl: string | null = null;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.resizeCanvas(canvas);

    this.signaturePad = new SignaturePad(canvas, {
      backgroundColor: 'rgb(255,255,255)',
      penColor: 'rgb(0,0,0)',
    });

    this.signaturePad.addEventListener('endStroke', () => {
      this.signatureDataUrl = this.signaturePad.toDataURL();
    });
  }

  clearSignature() {
    this.signaturePad.clear();
    this.signatureDataUrl = null;
  }

  private resizeCanvas(canvas: HTMLCanvasElement) {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d')?.scale(ratio, ratio);
  }
}
