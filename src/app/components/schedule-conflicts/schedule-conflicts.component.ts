import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-schedule-conflicts',
  templateUrl: './schedule-conflicts.component.html',
  styleUrls: ['./schedule-conflicts.component.css']
})
export class ScheduleConflictsComponent implements OnInit {

  courseConflicts = [];
  courses = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    
this.getCourses();
this.getConflicts();

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

  }

  getCourses(): void {
    this.courses = this.courseService.getCurrentSemesterCourses();
  }

  getConflicts(): void {
    for (let course of this.courses) {
      if (course["Professors"].length > 1) {
        this.courseConflicts.push(course);
      }
    }
  }

  refreshConflicts(): void {
    this.courseConflicts = [];
    this.getConflicts();
  }

}


