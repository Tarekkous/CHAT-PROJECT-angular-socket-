import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WeatherModalComponent } from 'src/app/modals/weather-modal/weather-modal.component';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  imageUrl = 'assets/images/weather.png'
  rue: string = 'PaulBert';
  ville: string = 'Annemasse';
  codepostal: number = 74100;
  temperature: number = 19 ;



  constructor( private weatherService: WeatherService, private _matDialog : MatDialog) { }

  ngOnInit(): void {

  }

openNewAdress(){
    this._matDialog.open(WeatherModalComponent,{data: {rue:this.rue, ville:this.ville, codepostal:this.codepostal, temperature:this.temperature}})
  }

}
