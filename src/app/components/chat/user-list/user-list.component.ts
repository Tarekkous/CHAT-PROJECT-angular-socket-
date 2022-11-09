import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserlistModalComponent } from 'src/app/modals/userlist-modal/userlist-modal.component';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  newUser!: any;
  filterArray!: any[];
  userInfo!: any[];
  data!: any;
  searchBar!: FormGroup;
  profil!: any;
  friends!: any;
  friendsList: any[] = [];
  allUsers: any;
  //! Pour utiliser le form control pour la searchBar :
  // searchCtrl: FormControl = new FormControl();

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private _dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Search bar form control *************
    this.searchBar = this.fb.group({
      Search: [''],
    });

    this.userService.getProfile().subscribe((value: any) => {
      console.log(value.body);
      this.profil = value.body;
    });

    this.userService.getUsersList().subscribe((value: any) => {
      this.userInfo = value.body;
      this.allUsers = value.body;
      console.warn('userInfo', this.userInfo);
      this.chatService.getOnlineUsersObservable().subscribe((data: any) => {
        console.warn('liste des users en ligne :', data);
        this.userInfo.forEach((ami: any) => {
          if (data.includes(ami.username)) {
            ami.online = true;
            // console.warn(ami);
          } else {
            ami.online = false;
          }
        });
        // this.friendsList.push(this.userInfo);
        this.userInfo = this.userInfo.sort((a, b) => {
          return b.online - a.online;
        });
      });
    });

    // @ts-ignore ,, on get le search si on utilise le formgroup dans le ng on init
    this.searchBar.get('Search').valueChanges.subscribe((val: any) => {
      console.log(val);
      if (val) {
        this.userInfo = this.userInfo.filter((user: any) =>
          user.firstName.toLowerCase().includes(val.toLowerCase())
        );
      } else {
        this.userInfo = this.allUsers;
      }
    });
    //! Pour utiliser le form control :
    // this.searchCtrl.valueChanges.subscribe((val: any) => console.log(val));
    this.getNewUser();

    // on écoute les users en ligne
    this.chatService.getOnlineUsers();
    // on affiche les users en ligne
    //! POUR afficher les BADGES
      this.chatService.getMessagesOnlineObservable().subscribe((messageRecu: any)=>{
        this.userInfo.forEach((user:any)=>{
          if(user.username == messageRecu.userID.username) {
            if(user.nbMessageEnAttente) {
             user.nbMessageEnAttente = user.nbMessageEnAttente + 1
            } else {user.nbMessageEnAttente = 1}
          }
        })
      })
  }

  onAddFriend(user: any) {
    this.chatService.addFriend(user).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.friends.push(user.username);
      }
    });
  }

  //si je veux transférer des données à ma Modale j'utilise la propriété data dans le deuxieme parametre de ma méthode open
  onOpenModal(user: any): void {
    let modal = this._dialog.open(UserlistModalComponent, {
      width: '400px',
      height: '200px',
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '800ms',
      data: user,
    });

    // si j'ai une reponse du modale c'est a dire que l'utilisateur a répondu oui , on envoie l'information a notre Chatroom
    modal.afterClosed().subscribe((resultFromModal: any) => {
      if (resultFromModal) {
        this.userService.setUserCurrent(user);
      }
    });
  }

  getNewUser() {
    this.userService.getNewUserCord().subscribe((value: any) => {
      this.newUser = value;
      console.log(this.newUser);
    });
  }
}
