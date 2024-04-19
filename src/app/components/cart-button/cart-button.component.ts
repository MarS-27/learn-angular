import { NgIf } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { IProduct, IProductInCart } from '../../../types/product.interface';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css',
})
export class CartButtonComponent {
  @Input() product!: IProduct;
  @Input() isProductInCart!: boolean;

  constructor(public cartService: CartService) {}

  onCartBtnClick(): void {
    if (this.isProductInCart) {
      this.cartService.removeProductFromCart(this.product.id);
    } else {
      this.cartService.addProductInCart(this.product);
    }
  }
}
