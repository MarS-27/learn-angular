import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Injector,
  Input,
  OnInit,
  effect,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {
  PaginationService,
  PaginationTemplate,
} from '../../../services/pagination.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  @Input() totalProducts!: number;

  paginationTemplateSig = signal<PaginationTemplate>([]);

  constructor(
    public paginationService: PaginationService,
    public productService: ProductService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const pageNum = Number(params['page']);
      this.paginationTemplateSig.set(
        this.paginationService.getPaginationTemplate(
          pageNum,
          this.totalProducts
        )
      );
    });
  }
}
