import {Component, inject, Input, OnInit} from '@angular/core';
import {FilmType} from "../../../../types/film.type";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PopupCardComponent} from "../popup-card/popup-card.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit{
  private dialog = inject(MatDialog);
  private router = inject(Router);

  @Input() film!: FilmType
  dialogRef: MatDialogRef<any> | null = null;

  ngOnInit(): void {

  }

  moreDetails(film: FilmType) {
    this.dialogRef = this.dialog.open(PopupCardComponent, {
      data: {
        ...film
      },
    });

    this.dialogRef.backdropClick()
      .subscribe(() => {
        this.dialogRef?.close();
        // this.router.navigate(['/']);
      });
  }

}
