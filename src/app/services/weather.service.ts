import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  

  urlMeteo = 'https://open-meteo.com/en';
  urlGps = 'https://cors-anywhere.herokuapp.com/https://api-adresse.data.gouv.fr/search/';

  constructor(private _http:HttpClient) { }


/**
   * Cette méthode nous permet de récupérer les lieux via l'url du du gouvernement
   * @param  {string} rue
   * @param  {number} codePostal
   * @param  {string} ville
   * @returns Observable qui nécessite des params (cf la doc). "q is a required param".
   *  On fait donc appelle à HttpParms.
   */
 getCoordinates(rue:string, codePostal:number, ville:string): Observable<any> {
  let paramsData = new HttpParams().append("q", `${rue},${codePostal},${ville}`)

  return this._http.get(this.urlGps,{params: paramsData})
}

/**
 * Cette méthode nous permet de récupérer la latitude et la longitude via l'url de l'API météo
 * @param  {number} longitude
 * @param  {number} latitude
 * @returns Observable qui nécessite au moin le param de la latitude.CF la doc de l'API météo
 * un append = 1 param (le nom du param, la valeur de ce param)
 */

//!httpparams nous permet d'ajouter des parametres a notre requete GET
//! 1 APPEND = 1 paramètre
getWeather(longitude: number, latitude: number): Observable<any> {
  let paramsMeteo = new HttpParams().append('hourly', 'temperature_2m')
  .append('timezone', 'Europe/Berlin')
  .append('longitude', longitude)
  .append('latitude', latitude)
  return this._http.get(this.urlMeteo,{params: paramsMeteo})
}

}
