import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { PRODUCTS_LIMIT } from '../constants/constants';

export type PaginationTemplate = (string | number)[];

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private readonly productService: ProductService) {}

  getPaginationTemplate(
    activePage: number,
    totalItems: number
  ): PaginationTemplate {
    const pagesCount = Math.floor(totalItems / PRODUCTS_LIMIT);

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
