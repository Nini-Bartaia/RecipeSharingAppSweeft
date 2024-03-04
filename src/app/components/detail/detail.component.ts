import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { viewSelector } from '../../store/selectors/recipesList.selector';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  constructor(private store: Store) {}
  recipe$ = this.store.select(viewSelector);
}
