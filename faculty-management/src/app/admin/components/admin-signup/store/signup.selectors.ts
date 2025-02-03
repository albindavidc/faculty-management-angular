import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSignup from './signup.reducer';

export const selectSignupState = createFeatureSelector<fromSignup.SignupState>(
  fromSignup.signupFeatureKey
);

export const selectToken = createSelector(
  selectSignupState,
  (state) => state.token
);
export const selectSignupError = createSelector(
  selectSignupState,
  (state) => state.error
);
export const selectSignupLoading = createSelector(
  selectSignupState,
  (state) => state.loading
);
