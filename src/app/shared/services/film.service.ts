import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActiveParamsType} from "../../../types/active-params.type";
import {FilmType} from "../../../types/film.type";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private http = inject(HttpClient);

  getFilms(params: ActiveParamsType): Observable<{totalCount: number, pages: number, items: FilmType[]}> {
    return this.http.get<{totalCount: number, pages: number, items: FilmType[]}>(environment.apiUrl + 'films', {
      params: params
    });
  }

  getFilm(url: string): Observable<FilmType> {
    return this.http.get<FilmType>(environment.apiUrl + 'films', {
      params: { url: url }
    });
  }

}
