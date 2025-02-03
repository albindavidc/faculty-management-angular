import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Signup } from '../../../../model/signup';

export const SignupActions = createActionGroup({
  source: 'Signup',
  events: {
    'Add Signup': props<{ signup: Signup }>(),
    'Add Signup Success': props<{ token: string }>(),
    'Add Signup Failure': props<{ error: string }>(),
  },
});
