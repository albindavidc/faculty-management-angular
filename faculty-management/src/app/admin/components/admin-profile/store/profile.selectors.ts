import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from './profile.reducer';

export const selectProfileState =
  createFeatureSelector<fromProfile.ProfileState>('profile');

// selector to get the profile data
export const selectProfile = createSelector(
  selectProfileState,
  (state) => state.profile
);

// selector to get the loading state
export const selectProfileLoading = createSelector(
  selectProfileState,
  (state) => state.loading
);

// selector to get the error state
export const selectProfileError = createSelector(
  selectProfileState,
  (state) => state.error
);
