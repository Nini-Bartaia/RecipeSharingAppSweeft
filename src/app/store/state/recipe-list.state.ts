import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { recipeDto } from './recipeDto';

export interface recipeState extends EntityState<recipeDto> {
  recipeList: recipeDto[];
  search: string;
  selectedId: string;
  navigate: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedItem: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewItem: any;
}

export const adapter: EntityAdapter<recipeDto> =
  createEntityAdapter<recipeDto>();
