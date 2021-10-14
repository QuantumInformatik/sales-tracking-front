import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const urlBase = environment.apiURL + 'user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUser(user: any): Observable<any> {
    return this.http.post(`${urlBase}/singin`, user);
  }
}
