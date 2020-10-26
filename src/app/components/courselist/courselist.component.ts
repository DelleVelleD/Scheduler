import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { CourseService } from '../../course.service';
import { SemesterCourseSchema } from '../../course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  courseSearch = null;
  courseList = [];
  uniqueCourseNums = [];
  uniqueCourseTitles = [];

  selectedCourseNum = null;
  selectedCourseTitle = null;
  selectedCourseSections = [];

  selectedSection = null;
  selectedSectionElement : HTMLElement = null;

  coursesStartTime;
  coursesEndTime;
  newSection : {"Room":string, "Days": [], "Start":string, "End":string, "Credits":number, "MaxStudents":number}

  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    this.courseList = this.courseService.getCurrentSemesterCourses();
    for(let course of this.courseList){
      if(!this.uniqueCourseNums.includes(course["CourseNum"])){
        this.uniqueCourseNums.push(course["CourseNum"]);
        this.uniqueCourseTitles.push(course["Title"]);
      }
    }
    this.coursesStartTime = this.courseService.getCoursesStartTime();
    this.coursesStartTime = this.courseService.getCoursesEndTime();
  }

  //Selects the clicked course and adds its sections to the selectedCourseSections
  selectCourse(_courseNum){
    for(let section of this.courseList){
      if(section["CourseNum"] == _courseNum){
        this.selectedCourseSections.push(section);
      }
    }
  }

  //Clears the selected course and section
  clearSelectedCourse(){
    this.selectedCourseSections = [];
    this.clearSelectedSection();
  }

  //Selects the clicked section and adds the 'selected' class to its shipping-item
  selectSection(_section, el){
    this.selectedSection = _section;
    if(this.selectedSectionElement == null){
      this.selectedSectionElement = (el.target as HTMLElement).parentElement;
      this.selectedSectionElement.classList.add("selected");
    }else{
      this.selectedSectionElement.classList.remove("selected");
      this.selectedSectionElement = (el.target as HTMLElement).parentElement;
      this.selectedSectionElement.classList.add("selected");
    }
  }

  //Clears the selected section and removes the 'selected' class from its shipping-item
  clearSelectedSection(){
    this.selectedSection = null;
    this.selectedSectionElement.classList.remove("selected");
    this.selectedSectionElement = null;
  }

  //TODO get data from form and create the new section
  createSection(){

  }

  copySelectedSection(){

  }

  removeSelectedSection(){

  }

}
