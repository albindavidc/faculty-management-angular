import { createReducer, on } from '@ngrx/store';
import { ProfileActions } from './profile.actions';

export interface ProfileState {
  profile: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.loadProfiles, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProfileActions.loadProfilesSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false,
  })),
  on(ProfileActions.loadProfilesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
