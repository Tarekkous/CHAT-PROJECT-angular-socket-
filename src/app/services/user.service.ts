import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { User } from '../models/user';
import { ResponseApiServer } from '../models/response-api-server';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  responses!: [];
  mailUser!: any;
  userApi: string = 'https://reqres.in/api/users?page=2';
  dataUrl = `${environment.API_URL}/api/users`
  dataBaseApi = `${environment.API_URL}/api/users/register`
  dataBaseApiLogin = `${environment.API_URL}/api/users/login`
  apiLogin =  `${environment.API_URL}/api/users/`

  private apiUrl = `${environment.API_URL}/api/users`;
  // Observable qui permet de souscrire
  currentUser = new Subject<any>()
  newUserSubject = new BehaviorSubject<any>({})


  constructor(private httpClient: HttpClient) { }
  //! envoie du form login a la base de données
  postLoginUser(modelUser: User): Observable<any> {
    return this.httpClient.post(this.dataBaseApiLogin, modelUser)
  }
  //! envoie du form register a la base de données

  postRegisterUser(userModel: User): Observable<any> {
    return this.httpClient.post(this.dataBaseApi, userModel);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<ResponseApiServer>(this.userApi).pipe
      (map((response: ResponseApiServer) => {
        return response.data
      }))
  };

  postData(formUser: any): Observable<any> {
    return this.httpClient.post(this.dataUrl, { data: formUser })

  };

  setUserCurrent(user: any) {
    //envoyer ces infos a travers l'observable a tous
    this.currentUser.next(user)
  };
  getUserCurrent(): Observable<any> {
    return this.currentUser.asObservable()
  };

  // nexter le first et last name au moment du login et venant du login qui sont  stocké dans localstorage pour rajouter une carte personnalisé dans le users-list

  getNewUserCord(): Observable<any> {
    const newData = localStorage.getItem('digilab-user')
    if (newData) {
      const objUser = JSON.parse(newData)
      const firstName = objUser.mail.split(/[.@]/)[0]
      const lastName = objUser.mail.split(/[.@]/)[1]
      const myObject = { firstName: firstName, lastName: lastName, avatar: objUser.avatar}
      this.newUserSubject.next(myObject)
      return this.newUserSubject.asObservable();
    } else {
      return of()
    }
  };
  // nexter le token stocké dans localstorage venant du login  pour le  récupérer dans le profil
getToken(){
  const newTkn = localStorage.getItem('digichat-token')
  if(newTkn) {
    return newTkn;
  }

  return null
}
  loginUserCord(): Observable<User> {
    return this.httpClient.get<User>(this.apiLogin+"/profile")

  }

  register(registerValues:User):Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/register`, registerValues, {observe: 'response'});
  }

  login(loginValues:any):Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/login`, loginValues, {observe: 'response'});
  }

  getProfile():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/profile`,{observe: 'response'})
  }

  getUsersList():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/list`, {observe: 'response'})
  }


}
