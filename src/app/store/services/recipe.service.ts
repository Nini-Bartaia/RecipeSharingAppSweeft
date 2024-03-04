import { Injectable } from '@angular/core';
import { recipeDto } from '../state/recipeDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000/';

  save(form: recipeDto) {
    const requestBody = {
      title: form.title,
      description: form.description,
      instruction: form.instruction,
      ingredients: form.ingredients,
      image: form.image,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<recipeDto>(this.baseUrl + 'recipes', requestBody, { headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getRecipes() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get<recipeDto[]>(this.baseUrl + 'recipes', {
        headers: headers,
      })
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
