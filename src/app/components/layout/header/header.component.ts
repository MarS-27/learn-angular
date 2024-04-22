import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShopCartComponent } from '../../shop-cart/shop-cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ShopCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
