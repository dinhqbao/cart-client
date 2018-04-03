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
      .then(t => this.tables = t.tables
    );

    $('#tableList').modal('show');
  }

  getSelectedTable(table: any): void {
    this.table = table;
    this.table.totalPrice = 0;
    let cart = localStorage.getItem(table._id.toString());
    if(cart !== null){
      this.cartProducts = JSON.parse(cart);
    } 

    for (var product of this.products) {
      var p = this.cartProducts.find(x => x.productId == product._id);
      if(p != null){
        product.quantity = p.quantity;
      }
      else {
        product.quantity = 0;
      }
      this.table.totalPrice += product.price * product.quantity;
    }
    
    $('#tableList').modal('hide');
  }

  addToCart(product: any) {
    var cartProduct = this.cartProducts.find(p => p.productId == product._id);
    if(cartProduct == null){
      cartProduct = {
        productId: product._id,
        unitPrice: product.price,
        quantity: 1
      };
      this.cartProducts.push(cartProduct);
    }
    else {
      cartProduct.quantity ++;
    }

    localStorage.setItem(this.table._id, JSON.stringify(this.cartProducts));

    $("#" + product._id).val(cartProduct.quantity);
    this.table.totalPrice += (product.price);
  }

  removeFromCart(product: any) {
    var cartProduct = this.cartProducts.find(p => p.productId == product._id);
    if(cartProduct == null){
    }
    else {
      cartProduct.quantity --;
    }
    localStorage.setItem(this.table._id, JSON.stringify(this.cartProducts));

    $("#" + product._id).val(cartProduct.quantity);
    this.table.totalPrice -= (product.price);
  }

  resetTable() {
    this.table.totalPrice = 0;
    this.cartProducts = [];
    // this.products.map(p => p['quantity'] = 0)
    for (const product of this.products) {
      product.quantity = 0;
    }
    localStorage.setItem(this.table._id, "[]");
  }
}
