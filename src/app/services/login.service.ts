import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  private url = "http://localhost:80/api-phx";

  constructor(private http: HttpClient) { }

  create(data:any): Observable<any> {
    return this.http.post(`${this.url}/create.php`, data);
  }

  login(credentials:any): Observable<any> {
    return this.http.post(`${this.url}/login.php`, {
      email: credentials.email,
      mdp: credentials.mdp
    });
  }

}
