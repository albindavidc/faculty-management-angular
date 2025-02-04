import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load Profiles': emptyProps(),
    'Load Profiles Success': props<{ data: unknown }>(),
    'Load Profiles Failure': props<{ error: unknown }>(),
  }
});
