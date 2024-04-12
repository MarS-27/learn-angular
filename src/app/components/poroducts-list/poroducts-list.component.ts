import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-poroducts-list',
  standalone: true,
  imports: [NgFor],

  templateUrl: './poroducts-list.component.html',
  styleUrl: './poroducts-list.component.css',
})
export class PoroductsListComponent {
  constructor(public productService: ProductService) {}
}
