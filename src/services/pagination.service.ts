import { Injectable } from '@angular/core';

export type PaginationTemplate = (string | number)[];

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  getPaginationTemplate(
    activePage: number,
    pagesCount: number
  ): PaginationTemplate {
    if (pagesCount === 0 || pagesCount === 1) {
      return [];
    } else if (activePage < 3 || activePage > pagesCount - 2) {
      return [1, 2, 3, '...', pagesCount - 2, pagesCount - 1, pagesCount];
    } else if (activePage === 3) {
      return [1, 2, 3, 4, '...', pagesCount - 1, pagesCount];
    } else if (activePage === pagesCount - 2) {
      return [
        1,
        2,
        '...',
        pagesCount - 3,
        pagesCount - 2,
        pagesCount - 1,
        pagesCount,
      ];
    } else {
      return [
        1,
        '...',
        activePage - 1,
        activePage,
        activePage + 1,
        '...',
        pagesCount,
      ];
    }
  }
}
