import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-homepage-faculty',
  templateUrl: './homepage-faculty.component.html',
  styleUrls: ['./homepage-faculty.component.css']
})
export class HomepageFacultyComponent implements OnInit {

  constructor(private router: Router) { }

  navigate() {
    this.router.navigate(["current-schedule"])
  }

  navigate2() {
    this.router.navigate(["courses-upcoming"])
  }

  navigate3() {
    this.router.navigate(["courses-offered"])
  }

  ngOnInit() {
  }

}
