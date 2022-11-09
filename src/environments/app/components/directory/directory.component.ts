import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DirectoryModalComponent } from 'src/app/modals/directory-modal/directory-modal.component';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  // directoryForm!: FormGroup;
  directories: any[] = [];

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addNewDir() : void {
     let modal = this._dialog.open(DirectoryModalComponent, {
      width: "600px",
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '800ms'
    });
    modal.afterClosed().subscribe((resultFromModal: any) => {
      this.directories = [resultFromModal, ...this.directories]
    })
  }

}
