import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Product, Table, ServerUrl } from '../data-model';

@Injectable()
export class TableService {
  private apiUrl = "http://" + ServerUrl + ":3001/api/table/";

  constructor(private http: Http) {}

  getTables(): Promise<any> {
    return this.http.get(this.apiUrl)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError)
  }

  createTable(table: Table): Promise<any> {
    return this.http.post(this.apiUrl, table)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError);
  }

  updateTable(table: Table): Promise<any> {
    return this.http.put(this.apiUrl, table)
                .toPromise()
                .then(this.handleData)
                .catch(this.handleError);
  }

  deleteTable(table: Table): any {
    return this.http.delete(this.apiUrl + table._id)
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
