import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Faculty } from '../../../../../model/faculty';

export const FacultyActions = createActionGroup({
  source: 'Faculty',
  events: {
    'Add Faculty': props<{ faculty: Faculty }>(),
    'Add Faculty Success': props<{ faculty: Faculty }>(),
    'Add Faculty Failure': props<{ error: any }>(),

    'Load Faculty': emptyProps(),
    'Load Faculties Success': props<{ faculties: Faculty[] }>(),
    'Load Faculties Failure': props<{ error: any }>(),

    'Edit Faculty': props<{ faculty: Faculty }>(),
    'Edit Faculty Success': props<{ faculty: Faculty }>(),
    'Edit Faculty Failure': props<{ error: any }>(),
  },
});
