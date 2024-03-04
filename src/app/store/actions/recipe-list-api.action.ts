import { createAction, props } from '@ngrx/store';
import { recipeDto } from '../state/recipeDto';

export const saveSuccess = createAction(
  '[server] data saved successfully',
  props<{ payload: recipeDto }>()
);

export const saveError = createAction('[server] data save failed');

export const tableRequestSuccess = createAction(
  '[server] table requested sucessfully',
  props<{ payload: recipeDto[] }>()
);

export const tableRequestFail = createAction('[server] table request failed');
