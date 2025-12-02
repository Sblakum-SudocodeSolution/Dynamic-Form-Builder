import { IFormField } from '../../../model/field';
import { Component, computed, effect, input, signal } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-slider',
  imports: [CommonModule, MatSliderModule, NgStyle],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider {
  field = input.required<IFormField>();
  formControl = input<FormControl>();

  sliderValue = signal<number>(0);

  constructor() {
    effect(() => {
      const fieldValue = this.field();
      const control = this.formControl();

      const min = this.resolveMin(fieldValue.min);
      const max = this.resolveMax(fieldValue.max, min);
      const fallback = fieldValue.defaultValue ?? min;
      const controlValue = control?.value ?? fallback;

      const nextValue = this.clampValue(controlValue, min, max);

      if (control && control.value !== nextValue) {
        control.setValue(nextValue, { emitEvent: false });
      }

      if (this.sliderValue() !== nextValue) {
        this.sliderValue.set(nextValue);
      }
    });
  }

  private resolveMin(min?: number): number {
    return typeof min === 'number' ? min : 0;
  }

  private resolveMax(max: number | undefined, min: number): number {
    if (typeof max === 'number' && max >= min) {
      return max;
    }

    return min + 1;
  }

  private clampValue(value: number, min: number, max: number): number {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  value = computed(() => this.sliderValue());

  onInputChange(event: any) {
    const min = this.resolveMin(this.field().min);
    const max = this.resolveMax(this.field().max, min);
    const next = this.clampValue(event, min, max);

    if (this.sliderValue() !== next) {
      this.sliderValue.set(next);
    }

    const control = this.formControl();
    if (control && control.value !== next) {
      control.setValue(next);
    }
  }
}
