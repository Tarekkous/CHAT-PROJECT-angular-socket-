import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getCountries() : Observable<any> {
    return this.httpClient.get('https://restcountries.com/v3.1/all')
  }

}
