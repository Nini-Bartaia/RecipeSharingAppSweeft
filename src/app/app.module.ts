import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './components/detail/detail.component';
import { ListComponent } from './pages/list/list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormComponent } from './components/form/form.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducer/recipes.reducer';
import { recipeEffect } from './store/effects/recipes.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from './store/services/recipe.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    ListComponent,
    NotFoundComponent,
    FormComponent,
  ],
  imports: [
    StoreModule.forRoot(),
    StoreModule.forFeature('recipes', reducer),
    EffectsModule.forRoot(recipeEffect),
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
      actionsBlocklist: ['@ngrx'],
    }),
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
