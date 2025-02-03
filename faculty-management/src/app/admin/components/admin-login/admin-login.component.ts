import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminAuthService } from '../../service/admin-auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit {
  adminLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminAuth: AdminAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminLogin = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onLogin() {
    this.adminAuth.login(this.adminLogin.value).subscribe({
      next: (response) => {
        console.log('Login successfull and back to the compo.', response);

        localStorage.setItem('token', response.token);

        this.router.navigate(['/admin/admin-dashboard']);
      },
      error: (error) => {
        console.error('Login Failed: ', error);
      },
    });
  }
}
