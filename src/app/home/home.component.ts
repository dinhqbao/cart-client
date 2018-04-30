import { Component, OnInit } from '@angular/core';
import { Product, Table, Order, OrderStatus, ServerUrl } from '../data-model';
import { ProductService } from '../services/product.service';
import { TableService } from '../services/table.service';
import { NgModel } from "@angular/forms";
import { OrderService } from '../services/order.service';
import * as io from 'socket.io-client';

declare var $: any;
declare var jquery: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  tables: Table[] = [];
  table: Table = new Table;
  order: Order;
  productsCart: any[] = [];
  alerts: any[] = [];
  // submittedTables: string[] = [];

  private apiUrl = "http://" + ServerUrl + ":3001/";
  private socket: SocketIOClient.Socket;

  constructor(
    private productService: ProductService,
    private tableService: TableService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .then(p => {
        this.products = p.products;
      });

    this.tableService.getTables()
      .then(t => {
        this.tables = t.tables
      });

    $('#tableList').modal('show');

    this.socket = io.connect(this.apiUrl);

    this.socket.emit("sendMessage", { msg: 'Client to server, can you hear me server?' });

    this.socket.on('orderAdded', (data) => {
      this.order = data.order;
    })
    
    this.socket.on('orderSucceeded', (data) => {
      this.order = data.order;
      let type = "success";
      let target = data.order.tableName;
      let msg = "Hoàn tất đặt hàng";

      this.alerts.push({
        type: type,
        target: target,
        msg: msg
      });
    })
  }

  getSelectedTable(table: any): void {
    this.table = table;
    this.table.totalPrice = 0

    this.orderService.getOrderByTable(this.table.name)
    .then(o => {
      this.order = o.order
    });
    // this.table.submitStatus = this.submittedTables.includes(this.table.tableName) ? 1: 0;
    let cart = localStorage.getItem(table._id);
    if(cart !== null) {
      this.productsCart = JSON.parse(cart);
    }
    else{
      this.productsCart = [];
    }

    for (let product of this.products) {
      var p = this.productsCart.find(x => x.productId == product._id);
      if(p != null){
        product.quantity = p.quantity;
        product.note = p.note;
      }
      else {
        product.quantity = 0;
        product.note = '';
      }
      this.table.totalPrice += product.price * product.quantity;
    }
    
    $('#tableList').modal('hide');
  }

  addToCart(product: any) {
    var cartProduct = this.productsCart.find(p => p.productId == product._id);
    if(cartProduct == null){
      product.quantity = 1;
      cartProduct = {
        productId: product._id,
        productName: product.name,
        quantity: product.quantity,
        note: product.note
      };
      this.productsCart.push(cartProduct);
    }
    else {
      product.quantity ++;
      cartProduct.quantity ++;
    }

    localStorage.setItem(this.table._id, JSON.stringify(this.productsCart));

    // $("#" + product._id).val(cartProduct.quantity);
    this.table.totalPrice += product.price;
  }

  removeFromCart(product: any) {
    if(product.quantity == 0){
      return;
    }
    if(product.quantity == 1){
      this.productsCart.splice(this.productsCart.findIndex(p => p.productId == product._id), 1);
    }
    else{
      let cartProduct = this.productsCart.find(p => p.productId == product._id);
      cartProduct.quantity --;
    }         
    product.quantity --;

    localStorage.setItem(this.table._id, JSON.stringify(this.productsCart));

    // $("#" + product._id).val(cartProduct.quantity);
    this.table.totalPrice -= (product.price);
  }

  focusOutProductNote(product: any) {    
    var cartProduct = this.productsCart.find(p => p.productId == product._id);
    if(cartProduct){
      cartProduct.note = product.note;
    }

    localStorage.setItem(this.table._id, JSON.stringify(this.productsCart));
  }

  resetTable() {
    // this.removeItem(this.submittedTables, this.table.name);
    this.table.totalPrice = 0;
    this.productsCart = [];
    // this.products.map(p => p['quantity'] = 0)
    for (const product of this.products) {
      product.quantity = 0;
      product.note = '';
    }
    localStorage.setItem(this.table._id, "[]");
    if(this.order){
      this.order.status = OrderStatus.Paid;
      this.orderService.updateOrder(this.order, this.socket);
      this.order = null;
    }
    
    $('#resetTableModal').modal('hide');
  }

  submitTable(e) {
    if(this.order){
      this.order.products = this.productsCart;
      this.order.status = OrderStatus.New;
      this.orderService.updateOrder(this.order, this.socket);
    }
    else{
      var order = new Order();
      order.tableName = this.table.name;
      order.products = this.productsCart;
      order.status = OrderStatus.New;
      
      // this.submittedTables.push(this.table.name);
      
      this.orderService.createOrder(order, this.socket);
    }
  }

  // removeItem(array, itemVal){
  //   var index = array.indexOf(itemVal);
  //   if (index > -1) {
  //     array.splice(index, 1);
  //   }
  // }
}
