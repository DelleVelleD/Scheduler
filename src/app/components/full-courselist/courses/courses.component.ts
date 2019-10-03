import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{CourselistService} from '../../../courselist.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courseList;
  constructor(
    
    private router: Router,
    private courselistService: CourselistService
    
    ) { }

    ngOnInit() {
      this.courseList = this.courselistService.getCourseList();
    }

    addToCourselist(course) {
      window.alert('Your course has been added to the list');
      this.courselistService.addToCourseList(course);
    }

  navigate() {
    this.router.navigate([""]);
  }
  navigateCalendar() {
    this.router.navigate(["../../main-page/calendar"]);
  }


}
