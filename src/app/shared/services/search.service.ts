import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private clearSearchSource = new Subject<void>();
  clearSearch$ = this.clearSearchSource.asObservable();

  clearSearch() {
    this.clearSearchSource.next();
  }
}
