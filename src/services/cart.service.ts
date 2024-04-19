import { Injectable, signal } from '@angular/core';
import { IProduct, IProductInCart } from '../types/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsInCartSig = signal<IProductInCart[]>([]);

  constructor() {}

  getLocalCartProducts(): void {
    const localCart = localStorage.getItem('cart');

    if (localCart) {
      const parsedLocalCart: IProductInCart[] = JSON.parse(localCart);
      this.productsInCartSig.set(parsedLocalCart);
    }
  }

  checkProductInCart(productId: number): boolean {
    const isProductInCart = this.productsInCartSig().some(
      (item) => item.product.id === productId
    );

    return isProductInCart;
  }

  addProductInCart(product: IProduct): void {
    const productInCart = this.productsInCartSig().find(
      (item) => item.product.id === product.id
    );

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      const updatedCart = [
        ...this.productsInCartSig(),
        { product, quantity: 1 },
      ];

      this.productsInCartSig.set(updatedCart);
    }

    localStorage.setItem('cart', JSON.stringify(this.productsInCartSig()));
  }

  removeProductFromCart(productId: number): void {
    const productInCart = this.productsInCartSig().find(
      (item) => item.product.id === productId
    );

    if (productInCart && productInCart.quantity > 1) {
      productInCart.quantity -= 1;
    } else {
      const updatedCart = this.productsInCartSig().filter(
        (item) => item.product.id !== productId
      );

      this.productsInCartSig.set(updatedCart);
    }

    localStorage.setItem('cart', JSON.stringify(this.productsInCartSig()));
  }

  clearCart(): void {
    localStorage.removeItem('cart');
  }
}
