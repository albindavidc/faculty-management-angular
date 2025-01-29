import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FacultyActions = createActionGroup({
  source: 'Faculty',
  events: {
    'Faculty Facultys': emptyProps(),
    'Faculty Facultys Success': props<{ data: unknown }>(),
    'Faculty Facultys Failure': props<{ error: unknown }>(),
  }
});
