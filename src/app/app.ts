import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormElementMenu } from "./components/form-element-menu/form-element-menu";
import { MainCanvas } from "./components/main-canvas/main-canvas";
import { FieldSetting } from "./components/field-setting/field-setting";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [FormElementMenu, MainCanvas, FieldSetting, DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
