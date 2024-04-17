import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {
  PaginationService,
  PaginationTemplate,
} from '../../../services/pagination.service';
import { ProductService } from '../../../services/product.service';
import { PaginationBtnComponent } from '../pagination-btn/pagination-btn.component';
import { PRODUCTS_LIMIT } from '../../../constants/constants';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive, PaginationBtnComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  @Input() totalProducts!: number;

  paginationTemplateSig = signal<PaginationTemplate>([]);
  pagesCount: number = 0;

  constructor(
    public paginationService: PaginationService,
    public productService: ProductService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pagesCount = Math.floor(this.totalProducts / PRODUCTS_LIMIT);

    this.route.queryParams.subscribe((params) => {
      const pageNum = Number(params['page']);
      this.paginationTemplateSig.set(
        this.paginationService.getPaginationTemplate(pageNum, this.pagesCount)
      );
    });
  }
}
