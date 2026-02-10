import { Component, inject } from '@angular/core';
import { FormElementMenu } from './components/form-element-menu/form-element-menu';
import { MainCanvas } from './components/main-canvas/main-canvas';
import { FieldSetting } from './components/field-setting/field-setting';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from './services/form';
import { Header } from './pages/header/header';

@Component({
  selector: 'app-root',
  imports: [
    FormElementMenu,
    MainCanvas,
    FieldSetting,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    Header
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  formService = inject(FormService);
  year = new Date().getFullYear();
  copyRight = `${this.year} © SudoCode Solutions Pvt. Ltd.`;
}
