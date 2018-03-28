import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Product } from '../data-model';

@Injectable()
export class ProductService {
  private apiUrl = 'http://localhost:3001/api/product/';

  constructor(private http: Http) { }

  getProducts(): Promise<any> {
    return this.http.get(this.apiUrl)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError)
  }

  createProduct(product: Product): Promise<any> {
    return this.http.post(this.apiUrl, product)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError);
  }

  updateProduct(product: Product): Promise<any> {
    return this.http.put(this.apiUrl, product)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError);
  }

  deleteProduct(product: Product): any {
    return this.http.delete(this.apiUrl + product._id)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError);
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
