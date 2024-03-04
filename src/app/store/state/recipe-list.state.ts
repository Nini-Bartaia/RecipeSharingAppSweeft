import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { recipeDto } from './recipeDto';

export interface recipeState extends EntityState<recipeDto> {
  recipeList: recipeDto[];
}

export const adapter: EntityAdapter<recipeDto> =
  createEntityAdapter<recipeDto>();
