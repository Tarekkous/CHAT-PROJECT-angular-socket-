import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  urlAllMessage = `${environment.API_URL}/messages/friendMessages`;
  messageSubject = new Subject<any>();
  nextMyMessage = new Subject<any>();
  messageSendToDisplay = new Subject();
  messageReceivedToDisplay = new Subject();
  usersListLogin = new Subject();
  constructor(
    private _http: HttpClient,
    private _socket: Socket,
    private userService: UserService
  ) {}

  //! correction sockeeet---------------------------------------------------------
    // avoir la liste des users connectés
    // users list
    getOnlineUsers():void{
      this._socket.on('users list',(data:any)=>{
        this.usersListLogin.next(data)
      })
    }
    getOnlineUsersObservable():Observable<any>{
      return  this.usersListLogin.asObservable();
    }

  // *initier les conversations, on initie la conversation
  initConversation() {
    this._socket.emit('login', { token: this.userService.getToken() });
  }

  // *envoie un message, on va transferer l'objet , je vais emit dans le salon "send friend message"
  // * friendName, content le message en question

  sendMessage(user: any, message: string) {
    this._socket.emit('send friend message', {
      friendName: user.username,
      content: message,
    });
  }
  getMessagesOnline(): void {
    this._socket.on('friend message', (data: any) =>
      this.messageSubject.next(data)
    );
  }
  getMessagesOnlineObservable() {
   return this.messageSubject.asObservable();
  }
  // confirmation de l'envoi de MON message et l'envoyer
  getMessagesSent(): any {
    this._socket.on('friend message sent', (messages: any) => {
      console.log(messages);
      this.nextMyMessage.next(messages);
    });
  }
  // !test observable
  getMyMessageObservable(): Observable<any> {
    return this.nextMyMessage.asObservable();
  }

  getMessagesFromFriend(username:any):Observable<any>{
    return this._http.get(`${environment.API_URL}/api/messages/friendmessages/${username}`);
  }



  addFriend(user: any): Observable<any> {
    return this._http.post(`${environment.API_URL}/api/users/addfriend`, {friendName: user.username,});
  }
  getFriends(): Observable<any> {
    return this._http.get(`${environment.API_URL}/api/users/friends`);
  }



}


