import { Component, OnInit } from '@angular/core';
import { Product } from '../data-model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  tableId = 1;
  totalPrice = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts()
                        .then(p => this.products = p.products)
  }

  // getProducts(): void {
  // 	this.products = this.productService.getProducts();
  // }

}
