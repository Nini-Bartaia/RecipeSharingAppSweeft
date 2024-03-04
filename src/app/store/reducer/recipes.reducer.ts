import { Action, createReducer, on } from '@ngrx/store';
import { adapter, recipeState } from '../state/recipe-list.state';
import { saveButtonClicked } from '../actions/recipe-list-page.action';
import {
  saveSuccess,
  tableRequestSuccess,
} from '../actions/recipe-list-api.action';

export const initialState: recipeState = adapter.getInitialState({
  recipeList: [],
});

export const recipeReducer = createReducer(
  initialState,
  on(saveButtonClicked, (state, { payload }) => {
    return { ...state, payload };
  }),

  on(saveSuccess, (state, { payload }) => {
    return adapter.upsertOne(payload, state);
  }),

  on(tableRequestSuccess, (state, { payload }): recipeState => {
    return { ...state, recipeList: payload };
  })
);

export function reducer(state: never, action: Action) {
  return recipeReducer(state, action);
}
