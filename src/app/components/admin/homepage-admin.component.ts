import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './homepage-admin.component.html',
  styleUrls: ['./homepage-admin.component.css']
})
export class HomepageAdminComponent implements OnInit {

  constructor(private router: Router) { }

  navigate1() {
    this.router.navigate(["courselist"])
  }

  navigate2() {
    this.router.navigate(["schedule-conflicts"])
  }

  navigate3() {
    this.router.navigate(['upload-sheet'])
  }

  navigate4() {
    this.router.navigate(['view-hours'])
  }

  ngOnInit() {
  }

}
