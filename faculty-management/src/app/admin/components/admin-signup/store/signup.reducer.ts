import { createFeature, createReducer, on } from '@ngrx/store';
import { SignupActions } from './signup.actions';

export const signupFeatureKey = 'signup';

export interface SignupState {
  token: string | null;
  error: string | null;
  loading: boolean;
}

export const initialState: SignupState = {
  token: null,
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(SignupActions.addSignup, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SignupActions.addSignupSuccess, (state, { token }) => ({
    ...state,
    token,
    loading: false,
    error: null,
  })),
  on(SignupActions.addSignupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const signupFeature = createFeature({
  name: signupFeatureKey,
  reducer,
});
