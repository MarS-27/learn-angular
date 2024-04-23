import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { RouterLink } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-shop-cart',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.css',
  animations: [
    trigger('openCloseCart', [
      state(
        'openCart',
        style({
          gridTemplateRows: '1fr',
          paddingTop: '10px',
          paddingBottom: '10px',
          border: '2px solid var(--clr-light-gray)',
        })
      ),
      state(
        'closeCart',
        style({
          gridTemplateRows: '0fr',
        })
      ),
      transition('openCart => closeCart', [animate('0.3s')]),
      transition('closeCart => openCart', [animate('0.3s')]),
    ]),
  ],
})
export class ShopCartComponent implements OnInit {
  isCartOpen: boolean = false;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getLocalCartProducts();
  }

  handleToggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  handleClearCart() {
    this.cartService.clearCart();
    this.isCartOpen = false;
  }

  handleRemoveProductFromCart(productId: number) {
    this.cartService.removeProductFromCart(productId, true);

    if (!this.cartService.productsInCartSig().length) {
      this.isCartOpen = false;
    }
  }

  totalPrice(): number {
    const price = this.cartService.productsInCartSig().reduce((prev, curr) => {
      prev += curr.quantity * curr.product.price;
      return prev;
    }, 0);

    return price;
  }
}
