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

export const searchFilterChangedSucces = createAction(
  '[ server] Search Filter Changed successfully',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ search: any }>()
);

export const filterParamsChangedSuccess = createAction(
  '[ server]  Filter params Changed successfully',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ payload: any }>()
);

export const filterParamsChangedFail = createAction(
  '[ server]  Filter params Changed Failed'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
);

export const fileUploadSuccess = createAction(
  '[ server]  file Upload Successfully',
  props<{ file: File }>()
);

export const selectedIdUpdatedSuccess = createAction(
  '[ server]  selectedIdUpdated Successfully',
  props<{ selectedId: string; payload: recipeDto }>()
);
export const selectedIdUpdatedError = createAction(
  '[ server]  selectedId Updated failed'
);

export const fileUploadFail = createAction('[ server]   file Upload Failed');

export const removeBtnSucces = createAction('[ server]  remove Successfully');

export const removeBtnError = createAction('[ server]  remove error');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewButtonClickedSuccess = createAction(
  '[ server]   view succesffuly  ',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ payload: any }>()
);
export const viewButtonClickedError = createAction('[ server]   view error  ');
