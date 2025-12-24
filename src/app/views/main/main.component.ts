import {Component, inject, OnInit} from '@angular/core';
import {FilmService} from "../../shared/services/film.service";
import {ActivatedRoute} from "@angular/router";
import {ActiveParamsType} from "../../../types/active-params.type";
import {FilmType} from "../../../types/film.type";
import {debounceTime} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private filmService = inject(FilmService);

  films: FilmType[] = [];
  activeParams: ActiveParamsType = {categories: ''};

  ngOnInit(): void {

    this.activatedRoute.queryParamMap
      .pipe(
        debounceTime(300),
      )
      .subscribe(queryParamMap => {
        if(queryParamMap.hasOwnProperty('categories')) {
          const categories = queryParamMap.get('categories');
          if (categories !== null) {
            this.activeParams.categories = categories;
          }
        }
        if(queryParamMap.hasOwnProperty('page')) {
          const page = queryParamMap.get('page');
          if (page !== null) {
            this.activeParams.categories = page;
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


}
