import { Component, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { recipeDto } from '../../store/state/recipeDto';
import { Store } from '@ngrx/store';
import { saveButtonClicked } from '../../store/actions/recipe-list-page.action';

export interface Ingredients {
  name: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  constructor(private store: Store) {}
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingredients: string[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (event) {
      // eslint-disable-next-line no-control-regex
      const values = value.split(new RegExp('[,\n]'));

      values.forEach(ingredient => {
        this.ingredients.push(ingredient);
      });
    }

    event.chipInput!.clear();
  }

  remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index) {
      this.ingredients.splice(index, 1);

      this.announcer.announce(`Removed ${ingredient}`);
    } else if (index == 0) {
      this.ingredients.shift();
    }
  }

  edit(ingredient: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(ingredient);
      return;
    }

    const index = this.ingredients.indexOf(ingredient);
    if (index >= 0) {
      this.ingredients[index] = value;
    }
  }

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingredients: new FormControl(null, Validators.required),
    instruction: new FormControl('', Validators.required),
    image: new FormControl(''),
  });

  onSave() {
    const recipeDto: recipeDto = {
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      ingredients: this.ingredients,
      instruction: this.form.controls.instruction.value,
      image: this.form.controls.image.value,
    };

    this.store.dispatch(saveButtonClicked({ payload: recipeDto }));
  }
}
