import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Auth/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  model: any = {};
  Data: any;
  constructor(
    private http: HttpClient,
    private loginserv: LoginService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    console.log('LoginPageComponent initialized');
  }

  username: string = '';
  password: string = '';
  
  login() {
    let user = this.model.username;
    let pass = this.model.password;

    this.loginserv.getUser(user, pass).subscribe({
      next: (data) => {
        console.log('first token :', data )
        this.loginserv.loadProfile(data);
        // console.log('Token' , data)

        this.router.navigateByUrl('/dash');
        console.log('Token Auth', this.authService.getAccessToken());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

// login() {
//   var email = this.model.email;
//   var password = this.model.password;

//   this.loginserv.getUser(email, password).subscribe((res) => {
//     this.Data = res;

//     if (this.Data === 1) {
//       this.authService.setAuthenticationStatus(true);
//       console.log('Login sent !');
//       /*const redirectUrl = this.authService.redirectUrl || '/dash';*/
//       this.router.navigate(['/dash']);
//       console.log('Login successful!');
//     } else {
//       console.log('Login failed. Please check your credentials.');
//     }
//   });
//   console.log('Login button clicked');
// }
