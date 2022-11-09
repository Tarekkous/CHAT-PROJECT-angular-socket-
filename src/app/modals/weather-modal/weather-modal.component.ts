import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherService } from 'src/app/services/weather.service';
import { map, switchMap, take } from "rxjs/operators";

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss']
})
export class WeatherModalComponent implements OnInit {

  weatherForm!: FormGroup;
  dataGps = { longitude: Number, latitude: Number }


  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public infos: any, private weatherService: WeatherService, private _dialogRef: MatDialogRef<WeatherModalComponent>) { }

  ngOnInit(): void {

    this.weatherForm = this.fb.group({
      rue: [this.infos.rue, Validators.required],
      ville: [this.infos.ville, Validators.required],
      codepostal: [this.infos.codepostal, Validators.required],
      temperature: [this.infos.temperature, Validators.required]
    })


  }





  // onSubmit(): void {
  //   const form = this.weatherForm.value;
  //   this.weatherService.getCoordinates(form.rue, form.codePostal, form.ville)
  //   .pipe(switchMap((responseFromServerGps: any) => {
  //   return this.weatherService.getWeather(
  //     responseFromServerGps.features[0].geometry.coordinates[0],
  //     responseFromServerGps.features[0].geometry.coordinates[1]
  //   )}
  //   )).subscribe((val: any) => 
  //   console.log(val.hourly.tempertature_2m[15], val.hourly.time[15]))

  // }




  onSubmit(): void {
    // on stocke les valeurs du formulaire dans une constante
    const form = this.weatherForm.value;
    // On déclare les attribut pour le close:
    let now = new Date();
    let heure = now.getHours();
    // On récupère la méthode du service pour les données correspondantes de la rue, du CP et de la ville
    this.weatherService.getCoordinates(form.rue, form.codePostal, form.ville)
    // on met notre opérateur (pipe) pour trier/filtrer avec notre switchMap
    .pipe(switchMap((responseFromServerGps: any) => {
      const dataGps = {
        longitude: responseFromServerGps.features[0].geometry.coordinates[0],
        latitude: responseFromServerGps.features[0].geometry.coordinates[1]
      } 
      // switchMap retourne toujours une observable.
      // Ici, on a notre deuxième méthode de notre service lié à notre API méteo qui à pour params, la longitude et la latitude
      return this.weatherService.getWeather(
      dataGps.longitude, 
      dataGps.latitude
    )}
    ))
    // Puis on souscrit à la réponse du service du 2eme obsevable (météo)
    .subscribe((responseFromWeatherServer: any) => {
      console.log(responseFromWeatherServer);
      // On close lorsqu'on reçoit les datas
      this._dialogRef.close({ 
        temperature: responseFromWeatherServer.hourly.temperature_2m[heure], 
        rue : form.rue, 
        codePostal : form.codePostal, 
        ville: form.ville })
        // alternative de solution mais plus longue :
        // let today = new Date();
        // const d = (today.getDate().toString()).padStart(2, '0')
        // const str = `${today.getFullYear()}-${today.getMonth() + 1 }-${d}T${today.getHours()}:00`;
        // const index = responseFromWeatherServer.hourly.time.findIndex((elem:string) => elem===str)
        // console.log(responseFromWeatherServer.hourly.temperature_2m[index]);
        // console.log(str);
    })
  }


}