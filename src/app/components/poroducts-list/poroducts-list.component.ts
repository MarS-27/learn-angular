import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { CartButtonComponent } from '../cart-button/cart-button.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-poroducts-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    ProductRatingComponent,
    CartButtonComponent,
  ],

  templateUrl: './poroducts-list.component.html',
  styleUrl: './poroducts-list.component.css',
})
export class PoroductsListComponent {
  isFullTitleShow: number | null = null;

  constructor(
    public productService: ProductService,
    public cartService: CartService
  ) {}

  onTitleMouseEnter(productId: number) {
    this.isFullTitleShow = productId;
  }

  onTitleMouseLeave() {
    this.isFullTitleShow = null;
  }
}
