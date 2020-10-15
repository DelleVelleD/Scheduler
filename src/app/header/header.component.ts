import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleLogout() {
    var logout = document.getElementById("topNavbar");
    if(logout.style.display == "none"){
      logout.style.display = "block";
    }else{
      logout.style.display = "none";
    }
  }

}
