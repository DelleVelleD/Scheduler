import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  constructor(private router: Router) { }

  navigate1() {
    this.router.navigate([""])
  }

  navigate2() {
    this.router.navigate(["available-hours"])
  }

  navigate3() {
    this.router.navigate(["courses-offered"])
  }

  ngOnInit() {
  }

}
