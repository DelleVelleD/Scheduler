import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bindNodeCallback } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  //Get rid of the "private router : Router" once the other pages are ready for modification
  //constructor() {}
  constructor(private router : Router) {
   }

  bInvalidLogin = false;

  ngOnInit() {
    this.toggleNavbar()
  }
  //Put these routers/navigate into their respective Admin and Faculty Calendar pages when ready
  navigate(){
    this.router.navigate(["courses-offered"])
  }

  navigate2(){
    this.router.navigate(["courses-upcoming"])
  }

  onLogin(){
    this.bInvalidLogin = true;
  }

  toggleNavbar() {
    var logout = document.getElementById("topNavbar");
    if(logout.style.display == "none"){
      logout.style.display = "block";
    }else{
      logout.style.display = "none";
    }
  }

}
