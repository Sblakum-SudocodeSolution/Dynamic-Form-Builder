import { Component, input, signal } from '@angular/core';
import { IFieldType } from '../../../model/field';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-field-button',
  imports: [MatIconModule, DragDropModule],
  templateUrl: './field-button.html',
  styleUrl: './field-button.scss',
})
export class FieldButton {
  field = input.required<IFieldType>();
  whileDragging = signal(false);
}
