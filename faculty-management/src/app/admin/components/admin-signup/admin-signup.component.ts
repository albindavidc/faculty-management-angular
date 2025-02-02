import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-signup',
  imports: [],
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.css',
})
export class AdminSignupComponent implements OnInit {
  adminSignup!: FormGroup;
  isSubmitting: boolean = false;
  submitError: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.#InitializeForm();
  }

  #InitializeForm() {
    this.adminSignup = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required, Validators.email],
        password: [
          '',
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ),
          Validators.minLength(6),
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.#passwordMatchValidator }
    );
  }

  #passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  get f() {
    return this.adminSignup.controls;
  }

  onSubmit() {
    this.submitError = null;
    this.#markFormGroupTouched(this.adminSignup);
    if (this.adminSignup.invalid) {
      return;
    }

    this.isSubmitting = true;

    try {
      this.adminSignup.reset();
      this.isSubmitting = false;
    } catch (error) {
      this.submitError = 'Registration Failed. Please try again later';
      this.isSubmitting = false;
    }
  }

  #markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAllAsTouched();
      if (control instanceof FormGroup) {
        this.#markFormGroupTouched(control);
      }
    });
  }
}
