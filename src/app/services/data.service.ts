import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalHttpService } from './global-http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService extends GlobalHttpService{


  getCountries() : Observable<any> {
    return this.httpClient.get('https://restcountries.com/v3.1/all')
  }

}
