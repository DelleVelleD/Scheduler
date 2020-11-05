import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-current-schedule',
  templateUrl: './current-schedule.component.html',
  styleUrls: ['./current-schedule.component.css']
})
export class CurrentScheduleComponent implements OnInit {

  constructor(private router: Router) { }

  navigate() {
    this.router.navigate(["homepage-faculty"]);
  }

  navigate2() {
    this.router.navigate(["calendar"]);
  }
  navigate3() {
    this.router.navigate(["calendar"]);
  }

  ngOnInit() {
  }

}
