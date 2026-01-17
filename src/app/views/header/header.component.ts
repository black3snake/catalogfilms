import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../../shared/services/search.service";
import {FilmService} from "../../shared/services/film.service";
import {Subject, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryType} from "../../../types/category.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  private filmService = inject(FilmService);
  private destroy$ = new Subject<void>();
  private _snackBar = inject(MatSnackBar);
  activeCategoryId: number | null = null;
  categories: CategoryType[] = [];

  ngOnInit(): void {
    this.filmService.getCategory()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
      next: (data) => {
        this.categories = data
      },
      error: (err: HttpErrorResponse) => {
        if (err.error && err.error.message) {
          this._snackBar.open(err.error.message);
        } else {
          this._snackBar.open('Ошибка ответа от сервера в получении категорий')
        }
      }
    })

    this.activatedRoute.queryParams.subscribe(params => {
      this.activeCategoryId = params['categoryId'] ? +params['categoryId'] : null;
    });
  }

  onLogoClick(): void {
    this.searchService.clearSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
