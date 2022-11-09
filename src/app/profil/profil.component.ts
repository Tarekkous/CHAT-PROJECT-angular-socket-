import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    // this._userService.loginUserCord().subscribe((response:any)=>{
    //   console.log(response);  
    // })
  }

}
