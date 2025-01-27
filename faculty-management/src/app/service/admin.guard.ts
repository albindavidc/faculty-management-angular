import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../admin/service/admin-auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminAuthService);
  const router = inject(Router);

  if (adminService.isAdminLoggedIn() === true) {
    return true;
  } else {
    router.navigate(['/admin/login']);
    return false;
  }
};
