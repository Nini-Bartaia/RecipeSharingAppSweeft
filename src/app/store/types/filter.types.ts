import { recipeDto } from '../state/recipeDto';

export interface Filter {
  pageIndex?: number;
  pageSize?: number;
  sortDirection: sortDirection;
  sortBy?: string;
  search?: string;
  query?: recipeDto;
}

export enum sortDirection {
  Asc = 'asc',
  Desc = 'desc',
  None = '',
}
