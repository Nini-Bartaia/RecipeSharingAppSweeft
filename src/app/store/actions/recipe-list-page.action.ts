import { createAction, props } from '@ngrx/store';
import { recipeDto } from '../state/recipeDto';

export const saveButtonClicked = createAction(
  '[List Page] save button clicked',
  props<{ payload: recipeDto }>()
);

export const tableRequested = createAction('[List Page] table requested');
