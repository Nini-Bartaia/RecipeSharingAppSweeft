import { createAction, props } from '@ngrx/store';
import { recipeDto } from '../state/recipeDto';

export const saveButtonClicked = createAction(
  '[List Page] save button clicked',
  props<{ payload: recipeDto }>()
);

export const tableRequested = createAction('[List Page] table requested');

export const searchFilterChanged = createAction(
  '[ List Page] Search Filter Changed',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ search: any }>()
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterParamsChanged = createAction(
  '[list page] filter parameters changed',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ payload: any }>()
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterChanged = createAction(
  '[list page] filter changed',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ payload: any }>()
);

export const addButtonClicked = createAction(
  '[list page] add button clicked',
  props<{ selectedId: string }>()
);

export const uploadButtonClicked = createAction(
  '[form page] upload button clicked',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ file: File }>()
);

export const editButtonClicked = createAction(
  '[list page] edit button clicked',
  props<{ id: string }>()
);

export const selectedIdUpdated = createAction(
  '[list page] selectedId updated',
  props<{ selectedId: string }>()
);
export const removeButtonClicked = createAction(
  '[list page] remove button clicked',
  props<{ id: string }>()
);

export const viewButtonClicked = createAction(
  '[list page] view Recipe',
  props<{ id: string }>()
);
