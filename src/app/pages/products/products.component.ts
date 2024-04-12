import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { PoroductsListComponent } from '../../components/poroducts-list/poroducts-list.component';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTS_LIMIT } from '../../../constants/constants';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [PoroductsListComponent, PaginationComponent, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    public productService: ProductService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const pageNum = Number(params['page']);
      const skip = (pageNum - 1) * PRODUCTS_LIMIT;

      this.productService.getProducts(skip);
    });
  }
}
