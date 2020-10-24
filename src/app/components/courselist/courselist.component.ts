import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  courseList = [];
  uniqueCourseNums = [];
  uniqueCourseTitles = [];

  selectedCourseNum = null;
  selectedCourseTitle = null;
  selectedCourseSections = [];

  selectedSection = null;
  courseSearch = null;

  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    this.courseList = this.courseService.getCurrentSemesterCourses();
    for(let course of this.courseList){
      if(!this.uniqueCourseNums.includes(course["CourseNum"])){
        this.uniqueCourseNums.push(course["CourseNum"]);
        this.uniqueCourseTitles.push(course["Title"]);
      }
    }
    //this.selectedCourse = this.courseList[0]
  }

  selectCourse(_courseNum){
    for(let section of this.courseList){
      if(section["CourseNum"] == _courseNum){
        this.selectedCourseSections.push(section);
      }
    }
  }

  clearSelectedCourse(){
    this.selectedCourseSections = [];
  }

  //TODO highlight selected section
  selectSection(_section){
    this.selectedSection = _section;
  }

  clearSelectedSection(){
    this.selectedSection = null;
  }

}
