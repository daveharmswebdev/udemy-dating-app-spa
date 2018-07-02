import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  _baseUrl: string;
  userToken: any;

  constructor(private http: HttpClient) {
    this._baseUrl = `http://localhost:5000/api/auth/`;
  }

  login(model: any) {
    this.http.post(this._baseUrl + 'login', model, {
      headers: new HttpHeaders().set(
        'Content-type', 'application/json'
      )
    }).map((response: Response) => {
      const user = response.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
      }
    });
  }

}
