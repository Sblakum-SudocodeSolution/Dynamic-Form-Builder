import { Component, inject, signal } from '@angular/core';
import { FormEditor } from './form-editor/form-editor';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormPreview } from './form-preview/form-preview';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../services/form';

@Component({
  selector: 'app-main-canvas',
  imports: [
    FormEditor,
    FormPreview,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './main-canvas.html',
  styleUrl: './main-canvas.scss',
})
export class MainCanvas {
  activeTab = signal<'editor' | 'preview'>('editor');

  formService = inject(FormService);

  onTabChange(tab: 'editor' | 'preview') {
    if (!tab || tab === this.activeTab()) {
      return;
    }

    this.activeTab.set(tab);

    if (tab === 'preview') {
      this.formService.setSelectedFieldId(null);
    }
  }

  onCanvasClick(event: MouseEvent) {
    const isDirect = event.target === event.currentTarget;

    if (!isDirect) {
      return;
    }

    this.formService.setSelectedFieldId(null);
  }
}
