import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from './components/film-card/film-card.component';
import {RouterLink} from "@angular/router";
import { PopupCardComponent } from './components/popup-card/popup-card.component';
import {MatDialogModule} from "@angular/material/dialog";
import { StrLimiterPipe } from './pipes/str-limiter.pipe';


@NgModule({
  declarations: [
    FilmCardComponent,
    PopupCardComponent,
    StrLimiterPipe,
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    RouterLink
  ],
  exports: [
    FilmCardComponent,
    StrLimiterPipe,
  ]
})
export class SharedModule { }
