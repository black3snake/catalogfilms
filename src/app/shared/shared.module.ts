import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from './components/film-card/film-card.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    FilmCardComponent,
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    FilmCardComponent,
  ]
})
export class SharedModule { }
