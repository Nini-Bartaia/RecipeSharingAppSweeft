import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tableRequested } from '../../store/actions/recipe-list-page.action';
import { recipesSelector } from '../../store/selectors/recipesList.selector';
import { recipeDto } from '../../store/state/recipeDto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store
  ) {}
  displayedColumns: string[] = ['image', 'title', 'description'];

  dataSource: recipeDto[] = [];

  recipes$ = this.store.select(recipesSelector);

  ngOnInit() {
    this.store.dispatch(tableRequested());

    this.recipes$ = this.store.select(recipesSelector);
    this.recipes$.subscribe(recipes => {
      const recipeArray = Object.values(recipes);
      this.dataSource = [...this.dataSource, ...recipeArray];
    });
  }

  navigate() {
    this.router.navigate(['/form']);
  }
}
