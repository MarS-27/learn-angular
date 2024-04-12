import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IProducts } from '../types/product.interface';
import { PRODUCTS_LIMIT } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsSig = signal<IProducts | null>(null);

  constructor(private readonly http: HttpClient) {}

  getProducts(skip: number) {
    return this.http
      .get<IProducts>(`products?limit=${PRODUCTS_LIMIT}&skip=${skip}`)
      .subscribe((products) => {
        this.productsSig.set(products);
      });
  }
}
