import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const urlBase = environment.apiURL + 'provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) {
  }

  getProviders(name: any): Observable<any> {
    let queryParam = "";
    if(name){
      queryParam = `?name=${name}`
    }
    return this.http.get(`${urlBase}/get-by-name${queryParam}`);
  }
}
