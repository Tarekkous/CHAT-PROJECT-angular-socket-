import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {

  urlImg = 'https://picsum.photos/200/300';
  searchCtrl: FormControl = new FormControl();



  constructor() { }

  ngOnInit(): void {
  }

}
