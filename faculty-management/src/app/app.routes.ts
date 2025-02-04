import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './service/admin.guard';
import { AdminSignupComponent } from './admin/components/admin-signup/admin-signup.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { AdminProfileComponent } from './admin/components/admin-profile/admin-profile.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'signup', component: AdminSignupComponent },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        // canActivate: [adminGuard],
      },
      {
        path: 'login',
        component: AdminLoginComponent,
        // canActivate: [adminGuard],
      },
      {
        path: 'profile',
        component: AdminProfileComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];
