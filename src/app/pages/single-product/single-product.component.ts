import { Component, OnInit, signal } from '@angular/core';
import { IProduct } from '../../../types/product.interface';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductRatingComponent } from '../../components/product-rating/product-rating.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [ProductRatingComponent, LoaderComponent, NgIf, AsyncPipe],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css',
})
export class SingleProductComponent implements OnInit {
  productSig = signal<IProduct | null>(null);

  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = Number(params['id']);

      this.productService
        .getProductById(productId)
        .subscribe((product) => this.productSig.set(product));
    });
  }
}
