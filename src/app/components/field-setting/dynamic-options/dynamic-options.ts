import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OptionItem } from '../../../model/field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-options',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
  ],
  templateUrl: './dynamic-options.html',
  styleUrl: './dynamic-options.scss',
})
export class DynamicOptions {
  title = input('');
  options = input.required<OptionItem[]>();
  optionChange = output<OptionItem[]>();

  addOptions() {
    const currentOption = this.options();
    const newOptions = [...currentOption];
    newOptions.push({
      label: `Option ${newOptions.length + 1}`,
      value: `Options ${newOptions.length + 1}`,
    });
    this.optionChange.emit(newOptions);
  }

  removeOptions(index: number) {
    const currentOption = this.options();
    const newOptions = [...currentOption];
    newOptions.splice(index, 1);
    this.optionChange.emit(newOptions);
  }

  updateOptions(index: number, newLabel: string) {
    const currentOption = this.options();
    const newOptions = [...currentOption];
    newOptions[index] = {
      ...newOptions[index],
      label: newLabel,
    };
    this.optionChange.emit(newOptions);
  }
}
