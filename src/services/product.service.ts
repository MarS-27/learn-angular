import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IProduct, IProducts } from '../types/product.interface';
import { PRODUCTS_LIMIT } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsSig = signal<IProducts | null>(null);

  constructor(private readonly http: HttpClient) {}

  getProducts(skip: number): void {
    this.http
      .get<IProducts>(`products?limit=${PRODUCTS_LIMIT}&skip=${skip}`)
      .subscribe((products) => {
        this.productsSig.set(products);
      });
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`products/${id}`);
  }
}
