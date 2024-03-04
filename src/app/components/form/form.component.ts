import { Component, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { recipeDto } from '../../store/state/recipeDto';
import { Store } from '@ngrx/store';
import {
  saveButtonClicked,
  uploadButtonClicked,
} from '../../store/actions/recipe-list-page.action';
import { Router } from '@angular/router';
import {
  selectedIdSelector,
  selectedItemSelector,
  uploadedImageSelector,
} from '../../store/selectors/recipesList.selector';

export interface Ingredients {
  name: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  constructor(
    private store: Store,
    private router: Router
  ) {
    this.uploadedImage$.subscribe(res => {
      this.image = res;
    });

    this.store.select(selectedItemSelector).subscribe(res => {
      this.selectedItem = res;
      this.populateForm();
    });
  }

  selectedId$ = this.store.select(selectedIdSelector);

  selectedItem!: recipeDto;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingredients: string[] = [];
  uploadedImage$ = this.store.select(uploadedImageSelector);
  image: string = '';
  showSave: boolean = false;
  showUpdate: boolean = false;

  announcer = inject(LiveAnnouncer);

  populateForm() {
    if (this.selectedItem) {
      console.log(this.selectedItem);
      this.form.patchValue({
        title: this.selectedItem.title,
        description: this.selectedItem.description,
        ingredients: this.selectedItem.ingredients as [],
        instruction: this.selectedItem.instruction,
        image: this.selectedItem.image,
      });
    }
  }

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
    ingredients: new FormControl([], Validators.required),
    instruction: new FormControl('', Validators.required),
    image: new FormControl(''),
  });

  onSave() {
    const recipeDto: recipeDto = {
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      ingredients: this.ingredients,
      instruction: this.form.controls.instruction.value,
      image: this.image,
    };
    if (this.form.valid && this.image) {
      console.log(this.form.valid);
      this.store.dispatch(saveButtonClicked({ payload: recipeDto }));
      this.router.navigate(['list']);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileUpload(event: any, file: HTMLInputElement) {
    if (event && event.target.files?.length > 0) {
      this.store.dispatch(uploadButtonClicked({ file: event.target.files[0] }));
    }

    file.value = '';
  }
}
