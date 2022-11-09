import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  backendUrl = environment.API_URL
  constructor(private userService: UserService,
              private snackBar : MatSnackBar) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const userToken = this.userService.getToken();
    let clone = req
    console.log(req.url);

    if (req.url.includes(this.backendUrl+'/api') && userToken) {

      clone = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${userToken}`)
      })
    }
    return next.handle(clone).pipe(
      catchError(error => {
let message = ''
        switch (error.status){
        case 400: message = 'Bad Request'
        break
        case 401: message = 'Unauthorized'
        break
        case 403: message = 'Forbidden'
        break

        }
        this.snackBar.open(message, 'ok', {verticalPosition:'top'})
        return next.handle(clone)
      })
    )
  }
}


export const TokenInterceptorPovider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}



// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HTTP_INTERCEPTORS,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { catchError, Observable } from 'rxjs';
// import { UserService } from '../services/user.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   backendUrl = 'http://localhost:3000/api/users';

//   constructor(private _backend: UserService,
//     private _snackBar: MatSnackBar) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     console.warn('request ', request.url)
//     const token = this._backend.getToken();
//     // Pour éviter les conflits avec les API :
//     // Si la requete inclus notre adresse backend..
//     // la requete est immuable donc on la clone et on y met le token
//     if (request.url.includes(this.backendUrl)) {
//       const dolly = request.clone({
//         headers : request.headers.set('Authorization', `Bearer ${token}`)})
//         // Handle permet de faire la passerelle pour la requete.
//         return next.handle(dolly).pipe(
//           // ! Si y a une erreur :
//           catchError((error: HttpErrorResponse)=>{
//             let message = ''
//             //  On réagit en fonction du statut émis par le serveur ou le client
//             switch (error.status) {
//               case 400:
//                 message = "Bad request";
//                 break;
//               case 401:
//                 message = "Unauthorized";
//                 break;
//             }
//           // et on affiche dans une snackbar le message d'erreur
//           this._snackBar.open('Identifiant ou mot de passe incorrect', 'ok', {verticalPosition:'top'})
//           return next.handle(dolly)
//         }))
//     }
//     return next.handle(request);
//   }


// }
// export const TokenInterceptorPovider = {
//   provide: HTTP_INTERCEPTORS,
//   useClass: TokenInterceptor,
//   multi: true
// }
