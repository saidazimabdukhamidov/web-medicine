// import { Injectable } from '@angular/core';
// import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import {AuthService} from '../services/auth.service';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ErrorInterceptor implements HttpInterceptor {
//
//   constructor(private authenticationService: AuthService) { }
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('auth') === -1) {
//       const authReq = req.clone({
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
//         })
//       });
//       return next.handle(authReq);
//     } else {
//       return next.handle(req);
//     }
//   }
//
//
//     // constructor(private authService: AuthService) { }
//     //
//     // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     //     return next.handle(request).pipe(catchError(err => {
//     //         if ([401, 403].indexOf(err.status) !== -1) {
//     //             // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//     //             this.authService.logout();
//     //             location.reload(true);
//     //         }
//     //
//     //         const error = err.error.message || err.statusText;
//     //         return throwError(error);
//     //     }))
//     // }
// }
