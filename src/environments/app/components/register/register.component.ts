import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { UserModalComponent } from 'src/app/modals/user-modal/user-modal.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  // birthDate!: any;
  countries!:any;
  myControl = new FormControl('');
  options!: string[];
  filteredOptions!: Observable<string[]>;
  userForm!: FormGroup;


constructor(private _dataService: DataService, 
  private _userService: UserService, 
  private _fb: FormBuilder, 
  private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this._dataService.getCountries().subscribe((countries:any) => { 
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
      name:["", Validators.required],
      pseudo:["", Validators.required],
      dateNaissance:["", Validators.required],
      email:["", [Validators.email, Validators.required]],
      telephone: [null, Validators.required],
      adresse:["", Validators.required],
      ville:["", Validators.required],
      codePostal: ["", Validators.required],
      pays:["", Validators.required],
      skills: new FormArray([]),
      password:["", [Validators.required, Validators.minLength(8)]],
      confirmPassword:["", [Validators.required, Validators.minLength(8)]]
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  sortCountries(): string[] {
    return this.countries.map((countrieName:any) => countrieName.name.common)
  }

  onSubmit() {
    const form = this.userForm.value;
    console.log(form);
    // pour afficher les data reçues du serveur dans une modale :
    this._userService.postData(form).subscribe((response:any) => {
      console.log(response);
      this._matDialog.open(UserModalComponent, 
      {enterAnimationDuration:'800ms', 
      exitAnimationDuration:'800ms', 
      data: {date: response.createdAt, infoData: response.data}}
      )})
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