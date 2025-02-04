import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { FacultyEffects } from './admin/components/admin-dashboard/faculty-data/store/faculty.effects';
import { provideState, provideStore } from '@ngrx/store';
import { facultyReducer } from './admin/components/admin-dashboard/faculty-data/store/faculty.reducer';
import { SignupEffects } from './admin/components/admin-signup/store/signup.effects';
import { signupFeature } from './admin/components/admin-signup/store/signup.reducer';
import { profileReducer } from './admin/components/admin-profile/store/profile.reducer';
import { ProfileEffects } from './admin/components/admin-profile/store/profile.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    provideStore({
      faculty: facultyReducer,
      signup: signupFeature.reducer,
      profile: profileReducer,
    }),
    provideEffects(FacultyEffects, SignupEffects, ProfileEffects),
    provideState({ name: 'faculty', reducer: facultyReducer }),
  ],
};
