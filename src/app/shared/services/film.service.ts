import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActiveParamsType} from "../../../types/active-params.type";
import {FilmType} from "../../../types/film.type";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {environment} from "../../../environments/environment";
import {CategoryType} from "../../../types/category.type";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private http = inject(HttpClient);

  //http://localhost:3000/films?_expand=category (categoryId,page)
  getFilms(params: ActiveParamsType): Observable<FilmType[]> {
    return this.http.get<FilmType[]>(environment.apiUrl + 'films', {
      params: params
    });
  }

  //http://localhost:3000/films?url=bezuprechnyy-mir&_expand=category
  getFilmByUrl(url: string): Observable<FilmType> {
    return this.http.get<FilmType[]>(
      `${environment.apiUrl}films?url=${url}&_expand=category`
    ).pipe(
      map(films => films[0]) // Берем первый элемент
    );
  }

  getFilmsByCategoryUrl(categoryUrl: string): Observable<FilmType[]> {
    return this.http.get<CategoryType[]>(
      `${environment.apiUrl}categories?url=${categoryUrl}`
    ).pipe(
      switchMap(categories => {
        if (categories.length === 0) {
          return of([]);
        }
        const categoryId = categories[0].id;
        return this.http.get<FilmType[]>(
          `${environment.apiUrl}films?categoryId=${categoryId}&_expand=category`
        );
      })
    );
  }

  //http://localhost:3000/categories/1
  getCategoryByFilm(id: number): Observable<CategoryType> {
    return this.http.get<CategoryType>(`${environment.apiUrl}categories/${id}`)
  }

  // запрос для поиска на база запроса всех фильмов
  searchFilms(query: string): Observable<FilmType[]> {
    if (!query || query.trim() === '') {
      return this.getFilms({_expand: "category"});
    }
    const searchTerm = query.trim().toLowerCase();
    return this.http.get<FilmType[]>(environment.apiUrl + 'films', {params:{_expand: "category"}}).pipe(
      map(films =>
        films.filter(film =>
          film.title.toLowerCase().includes(searchTerm) ||
          film.genre.toLowerCase().includes(searchTerm) ||
          film.director.toLowerCase().includes(searchTerm) ||
          film.year.toString().includes(searchTerm) ||
          film.imdb.toString().includes(searchTerm)
        )
      ),
      catchError(error => {
        console.error('Search error:', error);
        return of([]);
      })
    );
  }


}
