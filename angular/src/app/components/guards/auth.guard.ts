// import {Injectable} from '@angular/core';
// import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// import {AuthService} from '../services/auth.service';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//
//   constructor(private router: Router,
//               private authService: AuthService) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const currentUser = this.authService.currentUserValue;
//     if (currentUser) {
//       // check if route is restricted by role
//       if (route.data.roles && route.data.roles.indexOf(currentUser.user_role) === -1) {
//         // role not authorised so redirect to home page
//         this.router.navigate(['/']);
//         return false;
//       }
//
//       // authorised so return true
//       return true;
//     }
//
//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
//     return false;
//   }
// }
