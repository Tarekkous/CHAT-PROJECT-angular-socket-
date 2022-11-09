import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Directory } from 'src/app/directory.model';
import { DirectoryService } from 'src/app/services/directory.service';

@Component({
  selector: 'app-directory-modal',
  templateUrl: './directory-modal.component.html',
  styleUrls: ['./directory-modal.component.scss']
})
export class DirectoryModalComponent implements OnInit {

  directoryForm!: FormGroup;
  dirSubjet = new Subject();
  pathPattern = "[a-zA-Z0-9&?-_.]{1,}@+"

  constructor(private _directoryServive: DirectoryService, 
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<any>
    ) { }

  ngOnInit(): void {
    this.directoryForm = this._fb.group({
      name: ["", Validators.required],
      path:["", [Validators.required, Validators.pattern(this.pathPattern)]],
      description:["", [Validators.required, Validators.minLength(10)]],
    })
    // this._directoryService.dirSubject.subscribe( (data:any) => {
    //   switch (data.action) {
    //     case "create":
    //       this._directories = [data, ...this._directories]
    //   }
    // })
  }

  onSubmit() {     
    this._directoryServive.postData(this.directoryForm.value)
    .subscribe((responseFromServer:any) =>
    this._dialogRef.close(responseFromServer))
  }

}
