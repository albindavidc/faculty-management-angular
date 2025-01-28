import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  adminUserName: string = environment.adminUserName;
  adminPassword: string = environment.adminPassword;

  constructor( private router: Router) {}

  adminLogin(userName: string, password: string) {
    if (userName === this.adminUserName && password === this.adminPassword) {
      console.log('Login is successfull');
      localStorage.setItem(
        'token',
        (Math.random() + 1).toString(36).substring(7)
      );
      this.router.navigate(['/admin/admin-dashboard']);
    } else {
      alert('Login is failed');
      console.log('Login failed');
      this.router.navigate(['/admin/login'])
    }
  }

  isAdminLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
