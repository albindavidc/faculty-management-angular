import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminAuthService } from '../../service/admin-auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  adminLoginData = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  });

  constructor(private fb: FormBuilder, private adminAuth: AdminAuthService) {}

  ngOnInit(): void {
    this.adminLoginData = this.fb.group({
      userName: ['', [Validators.email]],
      password: ['', [Validators.minLength(6)]],
    });
  }

  adminLogin() {
    this.adminAuth.adminLogin(
      this.adminLoginData.value.userName,
      this.adminLoginData.value.password
    );
  }
}
