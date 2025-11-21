import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-terms-condition',
  imports: [
    MatCheckboxModule,
    MatSlideToggleModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './terms-condition.html',
  styleUrl: './terms-condition.scss',
})
export class TermsCondition {
  policyForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.policyForm = this.fb.group({
      termscondition: [false, Validators.compose([Validators.requiredTrue])],
      policyone: [false, Validators.compose([Validators.requiredTrue])],
      policytwo: [false, Validators.compose([Validators.requiredTrue])],
      policythree: [false, Validators.compose([Validators.requiredTrue])],
    });
  }

  get getpolicyFormControl() {
    return this.policyForm.controls;
  }

  savePolicy() {
    if (this.policyForm.invalid) {
      this.policyForm.markAllAsTouched();
      return;
    }
  }
}
