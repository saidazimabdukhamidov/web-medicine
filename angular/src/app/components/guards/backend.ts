// import {Injectable} from '@angular/core';
// import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
// import {Observable, of, throwError} from 'rxjs';
// import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
// import {Role} from '../models/role';
// import {Users} from '../models/users';
//
// let users: Users[];
//
// @Injectable({
//   providedIn: 'root'
// })
// export class BackendInterceptor implements HttpInterceptor {
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const {url, method, headers, body} = request;
//
//     // wrap in delayed observable to simulate server api call
//     return of(null)
//       .pipe(mergeMap(handleRoute))
//       .pipe(materialize())
//       .pipe(delay(500))
//       .pipe(dematerialize());
//
//     function handleRoute() {
//       switch (true) {
//         case url.endsWith('/auth') && method === 'POST':
//           return authenticate();
//         case url.endsWith('/admin') && method === 'GET':
//           return getUsers();
//         case url.match(/\/doctors\/\d+$/) && method === 'GET':
//           return getUserById();
//         default:
//           // pass through any requests not handled above
//           return next.handle(request);
//       }
//     }
//
//     // route functions
//
//     function authenticate() {
//       const {username, password} = body;
//       const user = users.find(x => x.login === username && x.password === password);
//       if (!user) {
//         return error('Username or password is incorrect');
//       }
//       return ok({
//         id: user.user_id,
//         username: user.login,
//         firstName: user.first_name,
//         lastName: user.last_name,
//         role: user.user_role,
//         token: `fake-jwt-token.${user.user_id}`
//       });
//     }
//
//     function getUsers() {
//       if (!isAdmin()) {
//         return unauthorized();
//       }
//       return ok(users);
//     }
//
//     function getUserById() {
//       if (!isLoggedIn()) {
//         return unauthorized();
//       }
//
//       // only admins can access other user records
//       if (!isAdmin() && currentUser().user_id !== idFromUrl()) {
//         return unauthorized();
//       }
//
//       const user = users.find(x => x.user_id === idFromUrl());
//       return ok(user);
//     }
//
//     // helper functions
//
//     function ok(body) {
//       return of(new HttpResponse({status: 200, body}));
//     }
//
//     function unauthorized() {
//       return throwError({status: 401, error: {message: 'unauthorized'}});
//     }
//
//     function error(message) {
//       return throwError({status: 400, error: {message}});
//     }
//
//     function isLoggedIn() {
//       const authHeader = headers.get('Authorization') || '';
//       return authHeader.startsWith('Bearer fake-jwt-token');
//     }
//
//     function isAdmin() {
//       return isLoggedIn() && currentUser().user_role === Role.Admin;
//     }
//
//     function currentUser() {
//       if (!isLoggedIn()) {
//         return;
//       }
//       const id = parseInt(headers.get('Authorization').split('.')[1]);
//       return users.find(x => x.user_id === id);
//     }
//
//     function idFromUrl() {
//       const urlParts = url.split('/');
//       return parseInt(urlParts[urlParts.length - 1]);
//     }
//   }
// }
//
// export const fakeBackendProvider = {
//   // use fake backend in place of Http service for backend-less development
//   provide: HTTP_INTERCEPTORS,
//   useClass: BackendInterceptor,
//   multi: true
// };
