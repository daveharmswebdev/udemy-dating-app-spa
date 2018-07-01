import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IValues } from './values';

@Injectable()
export class ValueService {
  private _baseUrl: String;

  constructor(private http: HttpClient) {
    this._baseUrl = `http://localhost:5000/api/`;
  }

  getValues() {
    return this.http.get<IValues>(this._baseUrl + 'values');
  }

}
