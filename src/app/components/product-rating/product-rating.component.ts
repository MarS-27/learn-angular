import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.css',
})
export class ProductRatingComponent implements OnInit {
  @Input() rating!: number;

  stars: string[] = [];

  ngOnInit(): void {
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      this.stars.push('assets/star-logo.svg');
    }

    if (hasHalfStar) {
      this.stars.push('assets/half-star-logo.svg');
    }

    const emptyStars = 5 - this.stars.length;

    for (let i = 0; i < emptyStars; i++) {
      this.stars.push('assets/empty-star-logo.svg');
    }
  }
}
