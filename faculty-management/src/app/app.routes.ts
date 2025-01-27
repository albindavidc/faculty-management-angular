import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/components/login/login.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
    ],
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];
