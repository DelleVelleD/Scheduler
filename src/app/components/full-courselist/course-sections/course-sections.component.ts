import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{CourselistService} from '../courselist.service';

@Component({
  selector: 'app-course-sections',
  templateUrl: './course-sections.component.html',
  styleUrls: ['./course-sections.component.css']
})
export class CourseSectionsComponent implements OnInit {

  courseList;
  constructor(
    
    private router: Router,
    private courselistService: CourselistService
    
    ) { }

    ngOnInit() {
      this.courseList = this.courselistService.getCourseList();
    }

}
