import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Product, Table, Cart } from '../data-model';

@Injectable()
export class CartService {
  private apiUrl = 'http://localhost:3001/api/product/';
  tables: Table[] = [];

  constructor(private http: Http) {}

  addToCart(tableId: number, product: Product) {
    debugger;
    let cart = this.tables.find(x => x.tableId == tableId).cart;
    let cartItem = cart.find(x => x.productId == product._id);
    if(cartItem != null){
        cartItem.quantity ++;
    }
    else{
        cartItem = new Cart();
        cartItem.productId = product._id;
        cartItem.quantity = 1;
        cartItem.unitPrice = product.price;
        cart.push(cartItem);
    }
  }

  removeFromCart(tableId: number, product: Product) {
    debugger;
    let cart = this.tables.find(x => x.tableId == tableId).cart;
    let cartItem = cart.find(x => x.productId == product._id);
    if(cartItem != null){
        cartItem.quantity --;
    }
    else{        
      cart = cart.filter(x => x.productId != product._id);
    }
  }
  
  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  handleData(res: any) {
    let body = res.json();
       console.log(body);
       return body || {};
  }
}
