import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Product} from "../model/product.dto";

const urlBase = environment.apiURL + 'product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(urlBase, product);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(urlBase, product);
  }

  deleteProduct(productId: number): Observable<any> {
    let queryParam = "";
    if(productId){
      queryParam = `?productId=${productId}`
    }
    return this.http.delete(`${urlBase}/delete${queryParam}`);
  }

  getProducts(name: any): Observable<any> {
    let queryParam = "";
    if(name){
      queryParam = `?name=${name}`
    }
    return this.http.get(`${urlBase}/get-by-name${queryParam}`);
  }
}
