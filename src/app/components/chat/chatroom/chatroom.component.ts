import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { JokeService } from 'src/app/services/joke.service';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  msgInput!: FormGroup;
  userCurrent!: any;
  msgtext!: string;
  msgContainer: any[] = [];
  MessageJoke: any;
  msg!: any;
  infoUser: any;
  results: any;
  allMessages: any[] = [];
  msgRecu!: string;
  msgSend!: string;
  UsersConnected!: any;

  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private fb: FormBuilder,
    private _jokeService: JokeService,
    public chatService: ChatService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.msgInput = this.fb.group({
      messageText: ['', Validators.required],
    });

    // get messages Joke
    // this._jokeService.getMessages().subscribe((value: any) => {
    //   this.MessageJoke = value;
    // });


    // //! correction sockeeet

    // initiation
    this.chatService.initConversation();

    // On écoute constamment les messages de l'interlocuteur (messages reçus):
    this.chatService.getMessagesOnline();

    // On écoute constamment mes messages  (messages envoyés):
    this.chatService.getMessagesSent();

    // pour récupérer le message reçus ainsi que la date et l'heure :
    //!message reçu par L'AUTRE

    this.chatService
      .getMessagesOnlineObservable()
      .subscribe((messageReceived: any) => {
        console.warn('Message reçu ', messageReceived);
        console.warn(
          "message recu qu'on veut afficher dans le chat ",
          messageReceived
        );
        this.snackBar.open(messageReceived.content, 'ok');
      });

    // pour récupérer le message que j'envoie ainsi que la date et l'heure :
    //!message envoyé par MOI
    this.chatService.getMyMessageObservable().subscribe((messageSend: any) => {
      console.warn('Message envoyé ', messageSend);
      console.warn(
        "message qu'on envoie quon veut afficher dans le chat ",
        this.msgSend
      );
      this.allMessages.push(messageSend);
    });

    // Récupérer l'utilisateur
    this.userService.getUserCurrent().subscribe((user: any) => {
      console.warn('nouvelles données reçu par le service', user);
      this.userCurrent = user;
      // Pour vider les badges
      if (this.userCurrent.nbMessageEnAttente) {
        this.userCurrent.nbMessageEnAttente = null;
      }
      console.log(this.userCurrent);
      //! methode pour get les anciens messages reçus
      this.chatService.getMessagesFromFriend(this.userCurrent.username).subscribe((value: any) => {
          this.allMessages = value;
          console.warn('tableau de message', value);
        });
    });
  }

  onSend() {
    this.msgtext = this.msgInput.get('messageText')?.value;
    console.log(this.msgtext);
    this.msgContainer = [];
    this.msgContainer.push(this.msgtext);
    // console.warn(this.msgContainer);
    this.msgInput.get('messageText')?.reset();
    // this.tableJoke.push(this.MessageJoke);

    //! correction sockeeet

    // * c'est ce que j'envoie , je vais emit
    this.chatService.sendMessage(this.userCurrent, this.msgtext);
  }
}
