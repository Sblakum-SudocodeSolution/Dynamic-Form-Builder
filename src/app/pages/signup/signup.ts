import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  get getSignupFormControl() {
    return this.signupForm.controls;
  }

  signup() {
    let userData = {
      firstname: this.getSignupFormControl['firstname']?.value,
      lastname: this.getSignupFormControl['lastname']?.value,
      username: this.getSignupFormControl['email']?.value,
      password: this.getSignupFormControl['password']?.value,
    };

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    console.log(userData);
    this.signupForm.reset();
  }
}
