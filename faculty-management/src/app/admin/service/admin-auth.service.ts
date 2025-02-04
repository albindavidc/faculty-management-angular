import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Signup } from '../../model/signup';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private apiUrl = 'http://localhost:3001/admin';

  #httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  signup(signupObj: Signup): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/newSignup`,
      signupObj
      // this.#httpOptions
    );
  }

  login(loginData: {
    userName: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/newLogin`,
      loginData
    );
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No token found in localStorage');
      throw new Error('Unauthorized: No token provided');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/profile`, { headers });
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
