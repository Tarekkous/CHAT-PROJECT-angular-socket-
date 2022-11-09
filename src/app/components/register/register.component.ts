import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { UserModalComponent } from 'src/app/modals/user-modal/user-modal.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  // birthDate!: any;
  countries!: any;
  myControl = new FormControl('');
  options!: string[];
  filteredOptions!: Observable<string[]>;
  userForm!: FormGroup;
  userModel = new User();

  constructor(private _dataService: DataService,
    private _userService: UserService,
    private _fb: FormBuilder,
    private _matDialog: MatDialog,
    private _router: Router,
    private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this._dataService.getCountries().subscribe((countries: any) => {
      this.countries = countries;
      this.options = this.sortCountries();
      // @ts-ignore
      this.filteredOptions = this.userForm?.get("pays")?.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
    // .groupe pour grouper dans le formulaire.
    // Les attributs, à l'intérieur, servent à lier au html
    this.userForm = this._fb.group({
      username: [this.userModel.username, Validators.required],
      firstName: [this.userModel.firstName, Validators.required],
      lastName: [this.userModel.lastName, Validators.required],
      email: [this.userModel.email, [Validators.email, Validators.required]],
      phoneNumber: [this.userModel.phoneNumber, Validators.required],
      street: [this.userModel.street, Validators.required],
      city: [this.userModel.city, Validators.required],
      zipCode: [this.userModel.zipCode, Validators.required],
      country: [this.userModel.country, Validators.required],
      skills: new FormArray([]),
      password: [this.userModel.password, [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
    })
    this.userModel.avatar = "https://img.freepik.com/vecteurs-premium/gamer-mascotte-garcon-geek-esports-logo-avatar-personnage-dessin-anime-casque-lunettes_8169-228.jpg"

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  sortCountries(): string[] {
    return this.countries.map((countrieName: any) => countrieName.name.common)
  }

  onSubmit() {


    // pour envoyer les valeurs du formulaire a notre model user :

    this.userModel = Object.assign(this.userModel, this.userForm.value)
    console.log(this.userModel);

    // on récupère les valeures du formulaire const déclarée plus haut ds form
    const password = this.userModel.password
    const confirmPassword = this.userForm.value.confirmPassword
    // this._userService.postRegisterUser(this.userModel).subscribe((response:User)=>{
    //   console.warn(response);
    //  })
    if (password !== confirmPassword) {
      // alert('Mots de passes non identiques')
      this._snackBar.open('Mot de passes non identiques','reessayez')
      return;
    }
    this.userModel.skills = this.userForm.value.skills

    this._userService.register(this.userModel).subscribe((response: any) => {
      console.warn(response.body);
    // pour afficher les data reçues du serveur dans une modale :

      this._matDialog.open(UserModalComponent,
        {
          enterAnimationDuration: '800ms',
          exitAnimationDuration: '800ms',
          data: { date: response.createdAt, infoData: response.data }
        }
      )
    })
  }

  get skills() {
    return this.userForm.get("skills") as FormArray;
  }

  addSkill() {
    const competence = new FormControl('')
    this.skills.push(competence);
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }


}
