import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { map, tap } from 'rxjs/operators';
import { headers } from './headers';

@Injectable()
export class AuthService {
  _baseUrl: string;
  userToken: any;

  constructor(private http: HttpClient) {
    this._baseUrl = `http://localhost:5000/api/auth/`;
  }

  login(model: any) {
    return this.http.post<any>(this._baseUrl + 'login', model, { headers })
      .pipe(
        tap(result => {
          console.log(result);
          localStorage.setItem('token', result.tokenString);
        }),
        map(() => 'success')
      );
  }

  register(model: any) {
    return this.http.post<any>(this._baseUrl + 'register', model, { headers });
  }

}
