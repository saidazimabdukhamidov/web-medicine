import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Users} from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;

  constructor(private http: HttpClient) {

  }

  authenticationService(username: String, password: String) {
    return this.http.get(`http://localhost:8084/api/v1/auth`,
      {headers: {authorization: this.createBasicAuthToken(username, password)}}).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }


  // private url = 'http://localhost:8084/api/v1/auth';
  //
  // private currentUserSubject: BehaviorSubject<Users>;
  // public currentUser: Observable<Users>;
  //
  // constructor(private http: HttpClient) {
  //   this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
  //   this.currentUser = this.currentUserSubject.asObservable();
  // }
  //
  // public get currentUserValue(): Users {
  //   return this.currentUserSubject.value;
  // }
  //
  // // auth(form: Object): Observable<Object> {
  // //   return this.http.post(`${this.url}`, form);
  // // }
  // //
  // // getAuth(): Observable<Object> {
  // //   return this.http.get(`${this.url}`);
  // // }
  //
  // login(username: string, password: string) {
  //   return this.http.post<any>(`${this.url}`, {username, password})
  //     .pipe(map(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user && user.token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //       }
  //
  //       return user;
  //     }));
  // }
  //
  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(null);
  // }
}
