import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load Profiles': emptyProps(),
    'Load Profiles Success': props<{ profile: any }>(),  
    'Load Profiles Failure': props<{ error: string }>(),
  },
});
