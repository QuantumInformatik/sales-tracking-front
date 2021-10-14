import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const urlBase = environment.apiURL + 'customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getCustomers(name: any): Observable<any> {
    let queryParam = "";
    if(name){
      queryParam = `?name=${name}`
    }
    return this.http.get(`${urlBase}/get-by-name${queryParam}`);
  }
}
