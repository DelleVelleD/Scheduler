import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/usermodel';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent  {

  public user : User;



  constructor(private loginService: LoginService, private router: Router) {

  	this.user = new User();

  }



  validateLogin() {

  	if(this.user.username && this.user.password) {

  		this.loginService.validateLogin(this.user).subscribe(result => {

        console.log('result is ', result);

        if(result['status'] === 'success') {

          this.router.navigate(['/home']);

        } else {

          alert('Wrong username password');

        }

        

      }, error => {

        console.log('error is ', error);

      });

  	} else {

  		alert('enter user name and password');

  	}

  }

}
