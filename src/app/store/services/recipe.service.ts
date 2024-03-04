import { Injectable } from '@angular/core';
import { recipeDto } from '../state/recipeDto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  // getRecipes() {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   return this.http
  //     .get<recipeDto[]>(this.baseUrl + 'recipes', {
  //       headers: headers,
  //     })
  //     .pipe(
  //       map(res => {
  //         return res;
  //       })
  //     );
  // }

  getRecipes(payload: {
    pageIndex: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
    search: string;
  }): Observable<recipeDto[]> {
    let params = new HttpParams()
      .set('_page', payload.pageIndex.toString())
      .set('_limit', payload.pageSize.toString());

    if (payload.search !== undefined && payload.search.trim() !== '') {
      console.log(payload.search);
      params = params.set('q', payload.search);
    }

    if (payload.sortBy && payload.sortDirection) {
      params = params
        .set('_sort', payload.sortBy)
        .set('_order', payload.sortDirection);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<recipeDto[]>(`${this.baseUrl}recipes`, {
      headers: headers,
      params: params,
    });
  }

  uploadImage(file: File, key: string) {
    const formData = new FormData();
    formData.append('image', file);

    const params = {
      key: key,
      expiration: '600', // Optional: Set expiration time in seconds (600 seconds = 10 minutes)
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (
      this.http
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .post<any>('https://api.imgbb.com/1/upload', formData, {
          params,
        })
        .pipe(
          map(res => {
            console.log(res.data['display_url']);
            return res.data['display_url'];
          })
        )
    );
  }

  findOne(id: string): Observable<recipeDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get<recipeDto>(`${this.baseUrl}recipes/${id}`, { headers: headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}recipes/${id}`);
  }
}
