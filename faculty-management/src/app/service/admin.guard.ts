import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../admin/service/admin-auth.service';
import { inject } from '@angular/core';
import { signupFeature } from '../admin/components/admin-signup/store/signup.reducer';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectToken } from '../admin/components/admin-signup/store/signup.selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  // if (adminService.isAdminLoggedIn() === true) {
  //   return true;
  // } else {
  //   router.navigate(['/admin/login']);
  //   return false;
  // }

  return store.select(selectToken).pipe(
    take(1),
    map((token) => {
      if (token) {
        return true;
      } else {
        router.navigate(['/admin/login']);
        return false;
      }
    })
  );
};
