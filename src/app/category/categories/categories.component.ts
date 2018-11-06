import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product/product.service';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html"
})
export class CategoriesComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit() {}

  goToShop() {
    this.productService.getProduct().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
