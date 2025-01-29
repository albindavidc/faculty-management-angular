import { createFeatureSelector, createSelector } from '@ngrx/store';
import { facultyAdaptor, FacultyState } from './faculty.reducer';

export const selectFacultyState = createFeatureSelector<FacultyState>('faculty');

export const {
    selectAll: selectAllFacultiesFromAdaptor,
    selectEntities: selectFacultyEntities,
    selectIds: selectFacultyIds,
    selectTotal: selectTotalFaculties,
} = facultyAdaptor.getSelectors(selectFacultyState);

export const selectAllFaculties = createSelector(
    selectFacultyState,
    (state) => state.faculties
)

export const selectFacultyLoading = createSelector(
    selectFacultyState,
    (state) => state.loading
)

export const selectFacultyError = createSelector(
    selectFacultyState,
    (state) => state.error
);
