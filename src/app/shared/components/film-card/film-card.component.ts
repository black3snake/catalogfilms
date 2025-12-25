import {Component, inject, Input, OnInit} from '@angular/core';
import {FilmType} from "../../../../types/film.type";
import {FilmService} from "../../services/film.service";

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit{
  // private filmService = inject(FilmService);
  @Input() film!: FilmType
  // categoryName = '';

  ngOnInit(): void {
    // console.log(this.film);

    // this.filmService.getCategoryByFilm(this.film.categoryId)
    //   .subscribe(data => {
    //     this.categoryName = data.name;
    //   })

  }


}
