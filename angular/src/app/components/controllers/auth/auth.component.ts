import {Component, OnInit} from '@angular/core';
import {Doctor} from '../../models/doctor';
import {AuthService} from '../../services/auth.service';
import {Users} from '../../models/users';
import {log} from 'util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  users: Users = new Users();
  submitted = false;
  loading = false;
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {   }


  // constructor(private formBuilder: FormBuilder,
  //             private route: ActivatedRoute,
  //             private router: Router,
  //             private authService: AuthService) {
  //   // redirect to home if already logged in
  //   if (this.authService.currentUserValue) {
  //     this.router.navigate(['/']);
  //   }
  // }

  ngOnInit() {

    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
    // // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/hello-world']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

  handleLogout() {
    this.authenticationService.logout();
  }



  // get formField() {
  //   return this.loginForm.controls;
  // }
  //
  // onSubmit() {
  //   this.submitted = true;
  //
  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //
  //   this.loading = true;
  //   this.authService.login(this.formField.username.value, this.formField.password.value)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.router.navigate([this.returnUrl]);
  //       },
  //       error => {
  //         this.error = error;
  //         this.loading = false;
  //       });
  // }
}
