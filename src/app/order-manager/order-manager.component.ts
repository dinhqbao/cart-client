import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Order, OrderStatus, ServerUrl } from '../data-model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {
  private apiUrl = "http://" + ServerUrl + ":3001/"
  private socket: SocketIOClient.Socket;
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().then(o => {
      this.orders = o.orders;

      this.socket = io.connect(this.apiUrl);
      this.socket.emit("sendMessage", { msg: 'Order-Manager to server, can you hear me server?' });

      this.socket.on('orderAdded', (data) => {
        this.orders.push(data.order);
      })

      this.socket.on('orderUpdated', (data) => {
        let foundIndex = this.orders.findIndex(o => o._id == data.order._id)
        this.orders[foundIndex] = data.order;
      })

      this.socket.on('orderPaid', (data) => {
        let foundIndex = this.orders.findIndex(o => o._id == data.order._id)
        this.orders.splice(foundIndex, 1);
      })
    });
  }

  OrderSuccess(order: Order): void {
    if(order.status == OrderStatus.New){
      order.status = OrderStatus.Success;
      this.orderService.updateOrder(order, this.socket);
    }
    // this.socket.emit("orderSucceeded", order);
  }
}
