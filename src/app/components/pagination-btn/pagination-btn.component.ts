import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination-btn',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagination-btn.component.html',
  styleUrl: './pagination-btn.component.css',
})
export class PaginationBtnComponent {
  @Input() variant!: 'prevPage' | 'nextPage';
  @Input() pagesCount!: number;
  currPage: number = 1;

  constructor(private readonly route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.currPage = Number(params['page']);
    });
  }

  setPageQueryParam(): { page: number } {
    if (this.variant === 'prevPage') {
      return { page: this.currPage - 1 };
    } else {
      return { page: this.currPage + 1 };
    }
  }

  setDisabledClass(): string {
    if (
      (this.variant === 'prevPage' && this.currPage === 1) ||
      (this.variant === 'nextPage' && this.currPage === this.pagesCount)
    ) {
      return 'pagination-btn__disabled';
    } else {
      return '';
    }
  }
}
