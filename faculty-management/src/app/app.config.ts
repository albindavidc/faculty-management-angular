import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { FacultyEffects } from './admin/components/admin-dashboard/faculty-data/state/faculty.effects';
import { provideState, provideStore } from '@ngrx/store';
import { facultyReducer } from './admin/components/admin-dashboard/faculty-data/state/faculty.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    provideStore({faculty: facultyReducer}),
    provideEffects(FacultyEffects),
    provideState({ name: 'faculty', reducer: facultyReducer }),
    
  ],
};
