import { createFeatureSelector, createSelector } from '@ngrx/store';
import { recipeState } from '../state/recipe-list.state';

export const saveFeature = createFeatureSelector<recipeState>('recipes');

export const recipesSelector = createSelector(saveFeature, state => {
  return state.recipeList;
});

export const navigateSelector = createSelector(saveFeature, state => {
  return state.navigate;
});
export const uploadedImageSelector = createSelector(saveFeature, state => {
  return state.image;
});

export const selectedItemSelector = createSelector(saveFeature, state => {
  return state.selectedItem;
});
export const selectedIdSelector = createSelector(saveFeature, state => {
  return state.selectedId;
});
export const viewSelector = createSelector(saveFeature, state => {
  return state.viewItem;
});
