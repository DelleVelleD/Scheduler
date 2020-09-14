import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {

  //Get rid of the "private router : Router" once the other pages are ready for modification
  //constructor() {}
  constructor(private router : Router) { }

  ngOnInit() {

  }
  //Put these routers/navigate into their respective Admin and Faculty Calendar pages when ready
  navigate(){
    this.router.navigate(["courses-offered"])
  }

  navigate2(){
    this.router.navigate(["courses-upcoming"])
  }


}
