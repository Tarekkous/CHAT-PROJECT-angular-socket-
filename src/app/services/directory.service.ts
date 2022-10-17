import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  dataUrl = "https://reqres.in/api/users";

  constructor(private _http: HttpClient) { }

  postData (directoryForm: any) : Observable<any> {
    return this._http.post(this.dataUrl,{data: directoryForm})
  }

  // const dialogRef = this._dialog.open(
  //   DirectoryComponent, {
  //     width: "600px",
  //     enterAnimationDuration:'800ms', 
  //     exitAnimationDuration:'800ms', 
  //   });
  // dialogRef.afterclose().subscribe(
  //   responseFromModal => {
  //     let: {name, path,description} = responseFromModal
  //     this._directories.push(new DirectoryComponent(name, path, description))
  //   }
  // )

}
