import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IFormField } from '../../../model/field';
import { FormService } from '../../../services/form';

@Component({
  selector: 'app-rating',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating {
  field = input.required<IFormField>();
  private formService = inject(FormService);
  hoverIndex = signal<number>(0);

  ratingStyle(): 'star' | 'number' {
    return this.field().ratingStyleType ?? 'star';
  }

  max(): number {
    return this.field().maxRating ?? 5;
  }

  current(): number {
    return this.field().rating ?? 0;
  }

  setRating(value: number) {
    const updated = { ...this.field(), rating: value };
    this.formService.updateField(this.field().id, updated as any);
  }

  clearRating() {
    const updated = { ...this.field() };
    delete updated.rating;
    this.formService.updateField(this.field().id, updated as any);
  }

  isFilled(i: number): boolean {
    const hover = this.hoverIndex();
    if (hover > 0) return i <= hover;
    return i <= this.current();
  }
}
