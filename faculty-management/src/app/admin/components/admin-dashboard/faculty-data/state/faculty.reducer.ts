import { createReducer, on } from '@ngrx/store';
import { FacultyActions } from './faculty.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Faculty } from '../../../../../model/faculty';

export const facultyFeatureKey = 'faculty';

export interface FacultyState extends EntityState<Faculty> {
  loading: boolean;
  error: any;
}

export const facultyAdaptor: EntityAdapter<Faculty> =
  createEntityAdapter<Faculty>({
    selectId: (faculty: Faculty) => faculty._id,
  });

export const initialState: FacultyState = facultyAdaptor.getInitialState({
  loading: false,
  error: null,
});

export const facultyReducer = createReducer(
  initialState,
  on(FacultyActions.addFaculty, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FacultyActions.addFacultySuccess, (state, { faculty }) =>
    facultyAdaptor.addOne(faculty, {
      ...state,
      loading: false,
    })
  ),
  on(FacultyActions.addFacultyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(FacultyActions.loadFaculty, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FacultyActions.loadFacultiesSuccess, (state, { faculties }) =>
    facultyAdaptor.setAll(faculties, { ...state, loading: false })
  ),
  on(FacultyActions.loadFacultiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
