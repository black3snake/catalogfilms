import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../../shared/services/search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  activeCategoryId: number | null = null;


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.activeCategoryId = params['categoryId'] ? +params['categoryId'] : null;
    });
  }

  isActive(categoryId: number): boolean {
    return this.activeCategoryId === categoryId;
  }

  onLogoClick(): void {
    this.searchService.clearSearch();
  }
}
