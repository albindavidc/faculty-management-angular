import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Signup } from '../../../model/signup';
import { select, Store } from '@ngrx/store';
import { SignupState } from './store/signup.reducer';
import { Observable } from 'rxjs';
import { SignupActions } from './store/signup.actions';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-signup',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.css',
})
export class AdminSignupComponent implements OnInit {
  adminSignup!: FormGroup;
  isSubmitting$: Observable<boolean>;
  submitError$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ signup: SignupState }>,
    private router: Router
  ) {
    this.isSubmitting$ = this.store.pipe(
      select((state) => state.signup.loading)
    );
    this.submitError$ = this.store.pipe(select((state) => state.signup.error));
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.adminSignup = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        userName: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            ),
            Validators.minLength(6),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  get f() {
    return this.adminSignup.controls;
  }

  onSubmit() {
    console.log('Form Submitted!', this.adminSignup.value);
    console.log('Form Validity:', this.adminSignup.valid);

    this.markFormGroupTouched(this.adminSignup);

    if (this.adminSignup.invalid) {
      console.warn('Form is invalid. Errors:');
      Object.keys(this.adminSignup.controls).forEach((key) => {
        const control = this.adminSignup.get(key);
        console.warn(`Field: ${key}, Errors:`, control?.errors);
      });
      return;
    }

    try {
      const signupForm = this.adminSignup.value;
      console.log('Dispatching Form:', signupForm);

      this.store.dispatch(
        SignupActions.addSignup({ signup: { ...signupForm, _id: '' } })
      );

      console.log('Signup Dispatched Successfully!');
      this.adminSignup.reset();
    } catch (error) {
      console.error('Submission Error:', error);
      this.store.dispatch(
        SignupActions.addSignupFailure({
          error: 'Registration Failed. Please try again later',
        })
      );
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAllAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
