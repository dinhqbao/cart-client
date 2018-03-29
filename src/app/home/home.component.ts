import { Component, OnInit } from '@angular/core';
import { Product, Table, CartItem } from '../data-model';
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
  product: Product = new Product();
  tables: Table[] = [];
  table: Table = new Table;

  apiUrl = "http://localhost:3001/"

  constructor(private productService: ProductService,
    private tableService: TableService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .then(p => {
        this.products = p.products;
      });
      this.table = new Table();
      this.table._id = 1;
      this.table.totalPrice = 0;
      this.table.cart = [];

    // this.tableService.getTables()
    //   .then(t => this.tables = t.tables);

    // $('#tableList').modal('show');
  }

  // getSelectedTable(table: Table): void {
  //   this.table = table;
  //   $('#tableList').modal('hide');
  // }

  addToCart(product: Product) {
    var pCart = this.table.cart.find(p => p.productId == product._id);
    if(pCart == null){
      this.table.cart.push({
        productId: product._id,
        unitPrice: product.price,
        quantity: 1
      })
    }
    else {
      pCart.quantity ++;
    }
    this.table.totalPrice += (product.price);
  }

  removeFromCart(product: Product) {
    var pCart = this.table.cart.find(p => p.productId == product._id);
    if(pCart == null){
    }
    else {
      pCart.quantity --;
    }
    this.table.totalPrice -= (product.price);
  }
}
