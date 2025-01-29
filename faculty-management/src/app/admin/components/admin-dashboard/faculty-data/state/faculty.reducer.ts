import { createReducer, on } from '@ngrx/store';
import { FacultyActions } from './faculty.actions';

export const facultyFeatureKey = 'faculty';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

