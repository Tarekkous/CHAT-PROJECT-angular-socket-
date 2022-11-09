import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  jokeApi:string = 'https://official-joke-api.appspot.com/random_joke';

  constructor(private http : HttpClient) { }

  getMessages():Observable<any>{
   return  this.http.get(this.jokeApi);
  }

}
