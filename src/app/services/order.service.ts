import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Order, ServerUrl } from '../data-model';

@Injectable()
export class OrderService {
  private apiUrl = "http://" + ServerUrl + ":3001/api/Order/";

  constructor(private http: Http) { }

  getOrderByTable(tableName: string): Promise<any> {
    return this.http.get(this.apiUrl + tableName)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError)
  }

  getOrders(): Promise<any> {
    return this.http.get(this.apiUrl)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError)
  }

  createOrder(order: Order, socket: any): void {
    socket.emit('addOrder', order);
  }

  updateOrder(order: Order, socket: any): void {
    socket.emit('updateOrder', order);
  }

  deleteOrder(order: Order, socket: any): void {
    socket.emit('deleteOrder', order);
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
