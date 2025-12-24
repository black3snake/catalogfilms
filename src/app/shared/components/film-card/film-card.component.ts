import {Component, Input} from '@angular/core';
import {FilmType} from "../../../../types/film.type";

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent {
  @Input() film!: FilmType

}
