import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminDataService } from '../../../../service/admin-data.service';
import { FacultyActions } from './faculty.actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, exhaustMap } from 'rxjs/operators';
import { facultyAdaptor } from './faculty.reducer';

@Injectable({ providedIn: 'root' })
export class FacultyEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly adminDataService: AdminDataService
  ) {
    console.log('AdminDataService:', this.adminDataService); // Check the value here!
  }

  addFaculty$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FacultyActions.addFaculty),
      tap((action) => console.log('Add Faculty action received:', action)),
      exhaustMap((action) =>
        this.adminDataService.addFaculty(action.faculty).pipe(
          tap((response) => console.log('API Response:', response)),
          map((newFaculty) =>
            FacultyActions.addFacultySuccess({ faculty: newFaculty })
          ),
          catchError((error) => {
            console.error('Error in add faculty effect:', error);
            return of(
              FacultyActions.addFacultyFailure({ error: error.message })
            );
          })
        )
      )
    );
  });

  loadFaculties$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FacultyActions.loadFaculty),
      exhaustMap(() =>
        this.adminDataService.getAllFaculty().pipe(
          map((faculties) =>
            FacultyActions.loadFacultiesSuccess({ faculties })
          ),
          catchError((error) =>
            of(FacultyActions.loadFacultiesFailure({ error: error.message }))
          )
        )
      )
    );
  });

  editFaculties$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FacultyActions.editFaculty),
      exhaustMap(({ faculty }) =>
        this.adminDataService.updateFaculty(faculty).pipe(
          map((updateFaculty) =>
            FacultyActions.editFacultySuccess({ faculty: updateFaculty })
          ),
          catchError((error) => {
            console.error('Error updating faculty: ', error);
            return of(
              FacultyActions.editFacultyFailure({
                error: error.message || 'Failed to update faculty',
              })
            );
          })
        )
      )
    );
  });

  //Delete Faculties
  deleteFaculties$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FacultyActions.deleteFaculty),
      exhaustMap((action) =>
        this.adminDataService.deleteFaculty(action.facultyId).pipe(
          map(() =>
            FacultyActions.deleteFacultySuccess({ facultyId: action.facultyId })
          ),
          catchError((error) =>
            of(FacultyActions.deleteFacultyFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
