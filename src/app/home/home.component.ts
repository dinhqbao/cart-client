import { Component, OnInit } from '@angular/core';
import { Product, Table } from '../data-model';
import { ProductService } from '../services/product.service';
import { TableService } from '../services/table.service';

declare var $: any;
declare var jquery: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  // product: Product = new Product();
  tables: Table[] = [];
  table = new Table;
  cartProducts: any;

  apiUrl = "http://localhost:3001/"

  constructor(private productService: ProductService,
    private tableService: TableService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .then(p => {
        this.products = p.products;
      });

    this.tableService.getTables()
      .then(t => this.tables = t.tables);

    $('#tableList').modal('show');
  }

  getSelectedTable(table: any): void {
    this.table = table;
    let cart = localStorage.getItem(table._id.toString());
    if(cart !== null){
      this.cartProducts = JSON.parse(cart);
    } else {
      this.cartProducts = [];
    }

    $('#tableList').modal('hide');
  }

  addToCart(product: any) {
    debugger;
    var cartProduct = this.cartProducts.find(p => p.productId == product._id);
    if(cartProduct == null){
      this.cartProducts.push({
        productId: product._id,
        unitPrice: product.price,
        quantity: 1
      })
    }
    else {
      cartProduct.quantity ++;
    }
    this.cartProducts.totalPrice += (product.price);

    localStorage.setItem(this.table._id, JSON.stringify(this.cartProducts));
  }

  removeFromCart(product: any) {
    debugger;
    var pCart = this.cartProducts.find(p => p.productId == product._id);
    if(pCart == null){
    }
    else {
      pCart.quantity --;
    }
    this.cartProducts.totalPrice -= (product.price);

    localStorage.setItem(this.table._id, JSON.stringify(this.cartProducts));
  }
}
