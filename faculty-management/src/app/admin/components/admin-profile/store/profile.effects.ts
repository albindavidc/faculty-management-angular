import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as ProfileActions from '../store/profile.actions';
import { Action } from '@ngrx/store';
import { AdminAuthService } from '../../../service/admin-auth.service';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private adminService: AdminAuthService) {}

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.ProfileActions.loadProfiles),
      mergeMap(() =>
        this.adminService.getProfile().pipe(
          map((profile): Action => ProfileActions.ProfileActions.loadProfilesSuccess({ profile })), // Ensure explicit Action type
          catchError((error) =>
            of(ProfileActions.ProfileActions.loadProfilesFailure({ error: error.message })) // Wrap in `of()` to return an observable
          )
        )
      )
    )
  );
}
