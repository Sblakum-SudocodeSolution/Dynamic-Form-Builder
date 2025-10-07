import { Component } from '@angular/core';
import { FormElementMenu } from "./components/form-element-menu/form-element-menu";
import { MainCanvas } from "./components/main-canvas/main-canvas";
import { FieldSetting } from "./components/field-setting/field-setting";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-root',
  imports: [FormElementMenu, MainCanvas, FieldSetting, DragDropModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  year = new Date().getFullYear();
  copyRight = `${this.year} © SudoCode Solutions Pvt. Ltd.`;
}
