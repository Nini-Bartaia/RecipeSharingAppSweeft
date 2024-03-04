import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  saveButtonClicked,
  tableRequested,
} from '../actions/recipe-list-page.action';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import {
  saveError,
  tableRequestFail,
  tableRequestSuccess,
} from '../actions/recipe-list-api.action';
import { Injectable } from '@angular/core';

@Injectable()
export class recipeEffect {
  saveRecipe$ = createEffect(() =>
    this.actions.pipe(
      ofType(saveButtonClicked),
      exhaustMap(({ payload }) =>
        this.service.save(payload).pipe(
          map(res => saveButtonClicked({ payload: { ...res } })),
          catchError(() => of(saveError()))
        )
      )
    )
  );

  getRecipes$ = createEffect(() => {
    return this.actions.pipe(
      ofType(tableRequested),
      mergeMap(() => {
        return this.service.getRecipes().pipe(
          map(res => tableRequestSuccess({ payload: { ...res } })),
          catchError(() => of(tableRequestFail()))
        );
      })
    );
  });

  constructor(
    private actions: Actions,
    private router: Router,
    private service: RecipeService
  ) {}
}
