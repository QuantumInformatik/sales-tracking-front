import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const urlBase = environment.apiURL + 'invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {
  }

  saveInvoice(invoice: any): Observable<any> {
    return this.http.post(urlBase, invoice);
  }
}
