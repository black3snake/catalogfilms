import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FilmService} from "../../shared/services/film.service";
import {ActivatedRoute} from "@angular/router";
import {ActiveParamsType} from "../../../types/active-params.type";
import {FilmType} from "../../../types/film.type";
import {debounceTime, of, Subject, switchMap, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SearchService} from "../../shared/services/search.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private filmService = inject(FilmService);
  private _snackBar = inject(MatSnackBar);
  private searchService = inject(SearchService);
  private destroy$ = new Subject<void>();

  films: FilmType[] = [];
  filteredFilms: FilmType[] = [];
  valueQuantity = 0;
  showedSearch = false;
  searchField = new FormControl();
  activeParams: ActiveParamsType = {_expand: "category"};

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => {
          if (value && value.length > 2) {
            this.valueQuantity = value.length;
            return this.filmService.searchFilms(value);
          } else {
            this.filteredFilms = [];
            this.showedSearch = false;
            this.valueQuantity = value.length;
            return of([]);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data: FilmType[]) => {
          if (data.length > 0) {
            this.filteredFilms = data;
            this.showedSearch = true;
          }
          console.log(this.filteredFilms)
          console.log(this.showedSearch)
        },
        error: (err: HttpErrorResponse) => {
          if (err.error && err.error.message) {
            this._snackBar.open(err.error.message);
          } else {
            this._snackBar.open('Ошибка ответа от сервера при поиске')
          }
        }
      });

    this.activatedRoute.queryParamMap
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(queryParamMap => {
        this.activeParams = {_expand: "category"};
        this.searchField.setValue('');
        if (queryParamMap.has('categoryId')) {
          const categoryId = queryParamMap.get('categoryId');
          if (categoryId !== null) {
            this.activeParams.categoryId = +categoryId;
          }
        }
        if (queryParamMap.has('page')) {
          const page = queryParamMap.get('page');
          if (page !== null) {
            this.activeParams.page = +page;
          }
        }
        this.filmService.getFilms(this.activeParams)
          .subscribe({
            next: (data) => {
              this.films = data
            },
            error: (error: HttpErrorResponse) => {

            }
          })
      })

    this.searchService.clearSearch$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.clearSearch());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clearSearch() {
    this.searchField.setValue('');
    this.filteredFilms = [];
    this.showedSearch = false;
  }
}
