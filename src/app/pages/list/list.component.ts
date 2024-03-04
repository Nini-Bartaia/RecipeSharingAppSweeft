/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  addButtonClicked,
  editButtonClicked,
  filterChanged,
  filterParamsChanged,
  removeButtonClicked,
  searchFilterChanged,
  selectedIdUpdated,
  viewButtonClicked,
} from '../../store/actions/recipe-list-page.action';
import {
  navigateSelector,
  recipesSelector,
} from '../../store/selectors/recipesList.selector';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Filter } from '../../store/types/filter.types';
import { debounceTime } from 'rxjs';
import { isEquivalent } from '../../store/helpers/isEquivalent.function';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private announcer: LiveAnnouncer
  ) {
    this.store.select(navigateSelector).subscribe(res => {
      console.log(res);
      this.navigateToRoute = res;
    });

    // this.store.dispatch(tableRequested());

    this.recipes$ = this.store.select(recipesSelector);
    this.recipes$.subscribe(recipes => {
      // const recipeArray = Object.values(recipes);
      // // this.dataSource = new MatTableDataSource(recipeArray);
      // //this.length = recipeArray.length;
      // this.dataSource = [...this.dataSource, ...recipeArray];
      // length = recipeArray.length;
      // console.log(this.length);
      //this.dataSource = Object.values(recipes);
      const recipeArray = Object.values(recipes);
      this.dataSource = recipeArray; // Assigning new data directly
      this.length = recipeArray.length; //
    });
  }

  currentFilterParams: {
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: string;
    search?: string;
  } = {
    pageIndex: 0,
    pageSize: 5,
    sortBy: '',
    sortDirection: '',
    search: '',
  };

  filterOptions!: Filter;
  displayedColumns: string[] = [
    'image',
    'title',
    'description',
    'remove',
    'edit',
    'view',
  ];
  filterFormControl: FormControl<string | null> = new FormControl<
    string | null
  >('');
  @ViewChild(MatSort) sort!: MatSort;
  navigateToRoute: boolean = false;

  dataSource: any[] = [];
  length = 0;

  recipes$ = this.store.select(recipesSelector);
  search: string = '';

  ngOnInit(): void {
    this.filterFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(res => {
        this.store.dispatch(searchFilterChanged({ search: res }));
      });

    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams?.['selectedId'] && queryParams?.['selectedId'] != '0') {
        this.store.dispatch(
          selectedIdUpdated({
            selectedId: queryParams['selectedId'],
          })
        );
      }

      // eslint-disable-next-line prefer-const
      let localFilterOptions = {
        pageIndex: queryParams['pageIndex'] || 0,
        pageSize: queryParams['pageSize'] || 5,
        sortBy: queryParams['sortBy'] || 'title',
        sortDirection: queryParams['sortDirection'],
        search: queryParams['search'],
      };

      if (!isEquivalent(localFilterOptions, this.currentFilterParams)) {
        this.currentFilterParams = localFilterOptions;

        this.store.dispatch(
          filterParamsChanged({ payload: localFilterOptions })
        );
      }
    });
  }

  navigate() {
    this.store.dispatch(addButtonClicked({ selectedId: '0' }));
  }

  sortData(event: any) {
    this.filterOptions = {
      ...this.filterOptions,
      sortBy: event.sortBy,
      sortDirection: event.sortDirection,
    };
    this.store.dispatch(filterChanged({ payload: this.filterOptions }));
  }
  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  handlePageEvent(event: PageEvent) {
    this.filterOptions = {
      ...this.filterOptions,
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    };
    this.store.dispatch(filterChanged({ payload: this.filterOptions }));
  }

  edit(id: string) {
    this.store.dispatch(editButtonClicked({ id: id }));
  }

  removeBtn(id: string) {
    this.store.dispatch(removeButtonClicked({ id: id }));
  }

  view(id: string) {
    this.store.dispatch(viewButtonClicked({ id: id }));
    this.router.navigate(['detail', id]);
  }
}
