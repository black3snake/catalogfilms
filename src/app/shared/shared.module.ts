import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from './components/film-card/film-card.component';


@NgModule({
  declarations: [
    FilmCardComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
