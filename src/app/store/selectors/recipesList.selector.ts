import { createFeatureSelector, createSelector } from '@ngrx/store';
import { recipeState } from '../state/recipe-list.state';

export const saveFeature = createFeatureSelector<recipeState>('recipes');

export const recipesSelector = createSelector(saveFeature, state => {
  return state.recipeList;
});
