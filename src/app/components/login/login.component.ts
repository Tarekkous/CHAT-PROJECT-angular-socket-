import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormConnexion!: FormGroup;
  usersCord!: any;
  modelUser = new User();
  tkn!: any;
  constructor(private _userService: UserService,
    private _fb: FormBuilder,
    private _matDialog: MatDialog,
    private Route: Router) { }

  ngOnInit(): void {

    this.userFormConnexion = this._fb.group({
      email: [this.modelUser.email, Validators.required],
      password: [this.modelUser.password, Validators.required]
    })
    // this.getApiUsers();
    // console.log(this.userFormConnexion.value);

  }


  getApiUsers() {
    this._userService.getUsersList().subscribe((value: any) => {
      this.usersCord = value
    })
  }


  onSubmit() {
    const formConnexion = this.userFormConnexion.value;
    console.log(formConnexion);
    this.modelUser = Object.assign(this.modelUser, formConnexion)
    // Mail et avatar  a récupérer
    const rand = Math.floor(Math.random() * 6)
    const mail = this.modelUser.email
    // const avatar = this.usersCord[rand].avatar

    // const dataNewUser = JSON.stringify(newData)
    //! On stocke les données (mail + avatar) dans le localstorage
    // localStorage.setItem('digilab-user', dataNewUser)

    // pour afficher les data reçues du serveur dans une modale :
    //   this._userService.postData(formConnexion).subscribe((response:any) => {
    //     console.log(response);
    //!methode post pour envoyer les données du form a l'API base de données
    this._userService.login(this.modelUser).subscribe((response: any) => {

      console.warn(response.body);
      this.tkn = response.body.token

      // const dataNewUser = JSON.stringify(newData)
      // localStorage.setItem('digilab-user', dataNewUser)


      localStorage.setItem('digichat-token', this.tkn)
      this.Route.navigate(['/overview'])

    })
    //! stocker la réponse dans local storage pour l'envoyer au profil (on a utilisé un service pour nexter)


  }

  clickToRegister() {
    this.Route.navigate(['/register'])
  }


}
