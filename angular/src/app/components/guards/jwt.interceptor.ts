// import {Injectable} from '@angular/core';
// import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
// import {Observable} from 'rxjs';
//
// import {AuthService} from '../services/auth.service';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {
//   }
//
//   private url = 'http://localhost:8084';
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // add auth header with jwt if user is logged in and request is to api url
//     const currentUser = this.authService.currentUserValue;
//     const isLoggedIn = currentUser && currentUser.token;
//     const isApiUrl = request.url.startsWith(this.url);
//     if (isLoggedIn && isApiUrl) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${currentUser.token}`
//         }
//       });
//     }
//
//     return next.handle(request);
//   }
// }
