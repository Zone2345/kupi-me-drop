import { Component, OnInit } from '@angular/core';

import { ProductService } from './../services/product/product.service';

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html"
})
export class ShopComponent implements OnInit {
  products;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProduct().subscribe(data => {
      console.log("data get products", data);
      this.products = data;
    });
  }
}
