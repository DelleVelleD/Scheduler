import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private router: Router) { }

  navigate() {
    this.router.navigate(["homepage-faculty"]);
  }

  navigate2() {
    this.router.navigate(["current-schedule"]);
  }

  ngOnInit() {
  }

}
