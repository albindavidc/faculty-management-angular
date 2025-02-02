import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminAuthService } from './service/admin-auth.service';
import { CommonModule } from '@angular/common';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';

@Component({
  selector: 'app-admin',
  imports: [RouterModule, AdminSignupComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private adminAuth: AdminAuthService) {}

  get isLoggedIn(): boolean {
    return this.adminAuth.isAdminLoggedIn();
  }
}
