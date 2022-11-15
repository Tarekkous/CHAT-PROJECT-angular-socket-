import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-userlist-modal',
  templateUrl: './userlist-modal.component.html',
  styleUrls: ['./userlist-modal.component.scss']
})
export class UserlistModalComponent implements OnInit {

// Mettre le decorateur inject dans le constructeur et donner a celui ci un nom qui contient les données
  constructor(@Inject(MAT_DIALOG_DATA) public dataUser: any, private _dialogref: MatDialogRef<UserlistModalComponent> ) { }

  ngOnInit(): void {
    console.warn('les données reçus par la Modale', this.dataUser);
  }


  // pour fermer la modale et envoyer le flux de données dataUser
  onValidate(){
    this._dialogref.close(this.dataUser)
  }
  // pour fermer la modale et ne pas accepter de discuter

  onCancel(){
    this._dialogref.close()
  }

}
