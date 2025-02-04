import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SignupActions } from './signup.actions';
import { AdminAuthService } from '../../../service/admin-auth.service';
import { Signup } from '../../../../model/signup';
import { Router } from '@angular/router';

@Injectable()
export class SignupEffects {
  constructor(
    private readonly actions$: Actions,
    private adminAuth: AdminAuthService,
    private router: Router
  ) {}

  createSignup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SignupActions.addSignup),
      mergeMap((action: { signup: Signup }) =>
        this.adminAuth.signup(action.signup).pipe(
          tap((response) => {
            console.log('API Response:', response);
            localStorage.setItem('token', response.token);
            this.router.navigate(['/admin/admin-dashboard']);
          }),
          map((response) =>
            SignupActions.addSignupSuccess({ token: response.token })
          ),
          catchError((error) =>
            of(SignupActions.addSignupFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
