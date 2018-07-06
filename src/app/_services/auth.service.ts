import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { headers } from './headers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  _baseUrl: string;
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) {
    this._baseUrl = `http://localhost:5000/api/auth/`;
  }

  login(model: any) {
    return this.http.post<any>(this._baseUrl + 'login', model, { headers })
      .pipe(
        tap(result => {
          localStorage.setItem('token', result.tokenString);
          this.decodedToken = this.jwtHelper.decodeToken(result.tokenString);
          console.log(this.decodedToken);
        }),
        map(() => 'success'),
        catchError(this.handleError)
      );
  }

  register(model: any) {
    return this.http.post<any>(this._baseUrl + 'register', model, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  loggedIn() {
    return tokenNotExpired('token');
  }

  private handleError(error: HttpErrorResponse) {
    const applicationError = error.headers.get('application-error');

    if (applicationError) {
      return Observable.throw(applicationError);
    }

    const serverError = error.error;
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }

    return Observable.throw(modelStateErrors || 'Server Error');
  }

}
