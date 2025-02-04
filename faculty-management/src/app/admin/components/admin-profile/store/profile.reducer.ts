import { createFeature, createReducer, on } from '@ngrx/store';
import { ProfileActions } from './profile.actions';

export const profileFeatureKey = 'profile';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(ProfileActions.loadProfiles, state => state),
  on(ProfileActions.loadProfilesSuccess, (state, action) => state),
  on(ProfileActions.loadProfilesFailure, (state, action) => state),
);

export const profileFeature = createFeature({
  name: profileFeatureKey,
  reducer,
});

