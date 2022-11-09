import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userApi: string = 'https://reqres.in/api/users?page=2';
  dataUrl = "https://reqres.in/api/users";

  constructor(private httpClient: HttpClient) { }

  getUsers () : Observable<any> {
    return this.httpClient.get(this.userApi)
  }

  postData (formUser: any) : Observable<any> {
    return this.httpClient.post(this.dataUrl,{data: formUser})
  }

}
