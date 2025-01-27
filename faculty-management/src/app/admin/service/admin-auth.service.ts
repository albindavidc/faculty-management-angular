import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  adminUserName: string = environment.adminUserName;
  adminPassword: string = environment.adminPassword;

  // constructor(private http: HttpClient) {}

  adminLogin(userName: string, password: string) {
    if (userName === this.adminUserName && password === this.adminPassword) {
      console.log('Login is successfull');
    } else {
      alert('Login is failed');
      console.log('Login failed');
    }
  }
}
