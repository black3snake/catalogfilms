import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FilmService} from "../../shared/services/film.service";
import {ActivatedRoute} from "@angular/router";
import {ActiveParamsType} from "../../../types/active-params.type";
import {FilmType} from "../../../types/film.type";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private filmService = inject(FilmService);
  private destroy$ = new Subject<void>();

  films: FilmType[] = [];
  activeParams: ActiveParamsType = {_expand: "category"};

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(queryParamMap => {
        this.activeParams = {_expand: "category"};
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
  }

  searchFilm() {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
