import { Action, createReducer, on } from '@ngrx/store';
import { adapter, recipeState } from '../state/recipe-list.state';
import {
  addButtonClicked,
  editButtonClicked,
  filterParamsChanged,
  removeButtonClicked,
  saveButtonClicked,
  searchFilterChanged,
  selectedIdUpdated,
  uploadButtonClicked,
  viewButtonClicked,
} from '../actions/recipe-list-page.action';
import {
  fileUploadSuccess,
  filterParamsChangedSuccess,
  saveSuccess,
  selectedIdUpdatedSuccess,
  viewButtonClickedSuccess,
} from '../actions/recipe-list-api.action';

export const initialState: recipeState = adapter.getInitialState({
  recipeList: [],
  search: '',
  selectedId: '',
  navigate: false,
  image: undefined,
  selectedItem: [],
  viewItem: '',
});

export const recipeReducer = createReducer(
  initialState,
  on(saveButtonClicked, (state, { payload }) => {
    return { ...state, payload };
  }),

  on(saveSuccess, (state, { payload }) => {
    return adapter.upsertOne(payload, state);
  }),

  // on(tableRequestSuccess, (state, { payload }): recipeState => {
  //   return { ...state, recipeList: payload };
  // }),

  on(searchFilterChanged, (state, { search }) => {
    return { ...state, search: search };
  }),

  on(filterParamsChanged, (state, { payload }) => {
    return { ...state, payload };
  }),
  on(filterParamsChangedSuccess, (state, { payload }) => {
    console.log(payload);
    return { ...state, recipeList: payload };
  }),
  on(addButtonClicked, (state, { selectedId }) => {
    console.log(selectedId);
    return {
      ...state,
      navigate: true,
      selectedId: selectedId,
      selectedItem: null,
      form: null,
      imageUploaded: null,
      imageId: null,
    };
  }),
  on(uploadButtonClicked, (state, { file }) => {
    return { ...state, file };
  }),
  on(fileUploadSuccess, (state, { file }) => {
    console.log({ file });
    return { ...state, image: file };
  }),
  on(editButtonClicked, (state, { id }) => {
    return { ...state, selectedId: id };
  }),
  on(selectedIdUpdated, (state, { selectedId }) => {
    console.log(selectedId);
    return { ...state, selectedId: selectedId };
  }),

  on(selectedIdUpdatedSuccess, (state, { payload }): recipeState => {
    console.log(payload);
    return {
      ...state,
      selectedItem: payload,

      image: payload.image,
    };
  }),

  on(removeButtonClicked, (state, { id }) => {
    return adapter.removeOne(id, { ...state });
  }),
  on(viewButtonClicked, (state, { id }) => {
    return { ...state, selectedId: id };
  }),

  on(viewButtonClickedSuccess, (state, { payload }) => {
    return { ...state, viewItem: payload };
  })
);

export function reducer(state: never, action: Action) {
  return recipeReducer(state, action);
}
