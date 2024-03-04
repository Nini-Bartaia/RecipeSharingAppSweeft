import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addButtonClicked,
  editButtonClicked,
  filterChanged,
  filterParamsChanged,
  removeButtonClicked,
  saveButtonClicked,
  searchFilterChanged,
  selectedIdUpdated,
  uploadButtonClicked,
  viewButtonClicked,
} from '../actions/recipe-list-page.action';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import {
  fileUploadFail,
  fileUploadSuccess,
  filterParamsChangedFail,
  filterParamsChangedSuccess,
  removeBtnError,
  removeBtnSucces,
  saveError,
  saveSuccess,
  selectedIdUpdatedError,
  selectedIdUpdatedSuccess,
  viewButtonClickedError,
  viewButtonClickedSuccess,
} from '../actions/recipe-list-api.action';
import { Injectable } from '@angular/core';

@Injectable()
export class recipeEffect {
  saveRecipe$ = createEffect(() =>
    this.actions.pipe(
      ofType(saveButtonClicked),
      exhaustMap(({ payload }) =>
        this.service.save(payload).pipe(
          map(res => saveSuccess({ payload: { ...res } })),
          catchError(() => of(saveError()))
        )
      )
    )
  );

  // getRecipes$ = createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(tableRequested),
  //     mergeMap(() => {
  //       return this.service.getRecipes().pipe(
  //         map(res => tableRequestSuccess({ payload: { ...res } })),
  //         catchError(() => of(tableRequestFail()))
  //       );
  //     })
  //   );
  // });

  // searchChanged$ = createEffect(
  //   () =>
  //     this.actions.pipe(
  //       ofType(searchFilterChanged),
  //       map(({ search }) => {
  //         this.router.navigate([], {
  //           queryParams: {
  //             search: search,
  //             pageIndex: 0,
  //           },
  //           queryParamsHandling: 'merge',
  //         });
  //       })
  //     ),
  //   {
  //     dispatch: false,
  //   }
  // );

  searchChanged$ = createEffect(() =>
    this.actions.pipe(
      ofType(searchFilterChanged),
      switchMap(({ search }) => {
        const queryParams = {
          search: search,
          pageIndex: 0, // Reset pageIndex when search changes
        };
        this.router.navigate([], {
          queryParams: queryParams,
          queryParamsHandling: 'merge',
        });

        return of(filterParamsChanged({ payload: queryParams }));
      })
    )
  );

  // recipes$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(filterParamsChanged),
  //     exhaustMap(({ payload }) =>
  //       this.service.getRecipes(payload).pipe(
  //         map(payload =>
  //           filterParamsChangedSuccess({
  //             payload: payload,
  //           })
  //         ),
  //         catchError(() => [filterParamsChangedFail()])
  //       )
  //     )
  //   )
  // );
  recipes$ = createEffect(() =>
    this.actions.pipe(
      ofType(filterParamsChanged),
      exhaustMap(({ payload }) => {
        console.log('Payload:', payload); // Add console.log here
        return this.service.getRecipes(payload).pipe(
          map(payload =>
            filterParamsChangedSuccess({
              payload: payload,
            })
          ),
          catchError(() => [filterParamsChangedFail()])
        );
      })
    )
  );

  filterChanged$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(filterChanged),
        tap(({ payload }) => {
          this.router.navigate(['list'], {
            queryParams: {
              ...payload,
              query: JSON.stringify(payload.query),
            },
            queryParamsHandling: 'merge',
          });
        })
      );
    },
    { dispatch: false }
  );

  addBtnClicked$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(addButtonClicked),
        tap(({ selectedId }) => {
          this.router.navigate(['form'], {
            queryParams: {
              selectedId: selectedId,
            },
            queryParamsHandling: 'merge',
          });
        })
      ),
    { dispatch: false }
  );

  addImage$ = createEffect(() =>
    this.actions.pipe(
      ofType(uploadButtonClicked),
      exhaustMap(({ file }) =>
        this.service.uploadImage(file, 'a7aaf9990cdccdaee5d342b3a966cf63').pipe(
          map(res => {
            return fileUploadSuccess({ file: res });
          }),
          catchError(() => of(fileUploadFail()))
        )
      )
    )
  );

  edit$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(editButtonClicked),
        tap(({ id }) => {
          this.router.navigate(['form'], {
            queryParams: {
              selectedId: id,
            },
            queryParamsHandling: 'merge',
          });
        })
      ),
    { dispatch: false }
  );

  selectedIdUpdated$ = createEffect(() =>
    this.actions.pipe(
      ofType(selectedIdUpdated),
      exhaustMap(({ selectedId }) =>
        this.service.findOne(selectedId).pipe(
          map(res => {
            return selectedIdUpdatedSuccess({
              selectedId: selectedId,
              payload: res,
            });
          }),
          catchError(() => of(selectedIdUpdatedError()))
        )
      )
    )
  );
  viewRecipe$ = createEffect(() =>
    this.actions.pipe(
      ofType(viewButtonClicked),
      exhaustMap(({ id }) =>
        this.service.findOne(id).pipe(
          map(res => {
            return viewButtonClickedSuccess({
              payload: res,
            });
          }),
          catchError(() => of(viewButtonClickedError()))
        )
      )
    )
  );
  removeBanner$ = createEffect(() =>
    this.actions.pipe(
      ofType(removeButtonClicked),
      exhaustMap(({ id }) =>
        this.service.removeRecipe(id).pipe(
          map(
            () => removeBtnSucces(),
            catchError(() => [removeBtnError()])
          )
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private router: Router,
    private service: RecipeService
  ) {}
}
