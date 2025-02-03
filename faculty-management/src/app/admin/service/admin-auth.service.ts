import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Signup } from '../../model/signup';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private apiUrl = 'http://localhost:3001/admin/signup/newSignup';

  #httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  signup(signupObj: Signup): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      this.apiUrl,
      signupObj
      // this.#httpOptions
    );
  }

  login(loginData: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, loginData);
  }

  // adminUserName: string = environment.adminUserName;
  // adminPassword: string = environment.adminPassword;
  // constructor( private router: Router) {}

  // adminLogin(userName: string, password: string) {
  //   if (userName === this.adminUserName && password === this.adminPassword) {
  //     console.log('Login is successfull');
  //     localStorage.setItem(
  //       'token',
  //       (Math.random() + 1).toString(36).substring(7)
  //     );
  //     this.router.navigate(['/admin/admin-dashboard']);
  //   } else {
  //     alert('Login is failed');
  //     console.log('Login failed');
  //     this.router.navigate(['/admin/login'])
  //   }
  // }

  // isAdminLoggedIn(): boolean {
  //   if (localStorage.getItem('token')) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
