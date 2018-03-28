import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../data-model';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() tableId: number;
  
  apiUrl = "http://localhost:3001/"
  constructor(private cart: CartService) { }

  ngOnInit() {
  }

  addProduct(tableId: number, product: Product): void {
    this.cart.addToCart(tableId, product);
  }
  removeProduct(tableId: number, product: Product): void {
    this.cart.removeFromCart(tableId, product);
  }
}
