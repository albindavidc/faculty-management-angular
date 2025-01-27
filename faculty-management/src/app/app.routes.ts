import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/components/login/login.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];
