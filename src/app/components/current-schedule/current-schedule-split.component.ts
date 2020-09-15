import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-current-schedule',
  templateUrl: './current-schedule-split.component.html',
  styleUrls: ['./current-schedule-split.component.css']
})
export class CurrentScheduleSplitComponent implements OnInit {

  constructor(private router: Router) { }

  navigate() {
    this.router.navigate(["homepage-faculty"]);
  }

  ngOnInit() {
  }

}
