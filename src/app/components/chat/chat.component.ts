import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

user$!:Observable<any>
displayUsers!:any;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
this.activatedRoute.data.subscribe(({userRes})=>{
  this.displayUsers = userRes
})
  }

}
