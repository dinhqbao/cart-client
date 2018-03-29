import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Product, Table } from '../data-model';

@Injectable()
export class TableService {
  private apiUrl = 'http://localhost:3001/api/table/';
  tables: Table[] = [];

  constructor(private http: Http) {}

  getTables(): Promise<any> {
    return this.http.get(this.apiUrl)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError)
  }
  
  removeFromCart(product: Product): void {
    throw new Error("Method not implemented.");
  }

  addToCart(product: Product): void {
    throw new Error("Method not implemented.");
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
