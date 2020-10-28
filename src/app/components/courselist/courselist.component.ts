import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { CourseService } from '../../course.service';
import { SemesterCourseSchema } from '../../course.service';
import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  courseList = [];
  courseSearch = "";
  filteredCourses = [];

  selectedCourseNum = null;
  selectedCourseTitle = null;
  selectedCourseSections = [];

  selectedSection = null;
  selectedSectionElement : HTMLElement = null;

  coursesStartTime;
  coursesEndTime;
  coursesTimes;
  newSection : {"Room":string, "Days": [], "Start":string, "End":string, "Credits":number, "MaxStudents":number}

  constructor(private courseService:CourseService, private calendarService:CalendarService) { }

  ngOnInit(): void {
    this.courseList = this.courseService.getCurrentSemesterCourses();
    this.coursesStartTime = this.courseService.getCoursesStartTime();
    this.coursesStartTime = this.courseService.getCoursesEndTime();
    this.coursesTimes = this.calendarService.courseTimes;

    this.filterCourses();
  }

  //Filters the courses for the desired search criteria, Also removes duplicate courses
  filterCourses(){
    this.filteredCourses = [];
    var filter = new RegExp(this.courseSearch, "ig");

    for(let course of this.courseList){
      if(filter.test(course["CourseNum"]) || filter.test(course["Title"])){
        var push = true;
        for(let fCourse of this.filteredCourses){
          if(fCourse["CourseNum"] == course["CourseNum"]){
            push = false;
          }
        }
        if(push){
          var temp = new Object;
            temp["CourseNum"] = course["CourseNum"];
            temp["Title"] = course["Title"];
            this.filteredCourses.push(temp)
        }
      }
    }
  }

  //Selects the clicked course and adds its sections to the selectedCourseSections
  selectCourse(_course){
    for(let section of this.courseList){
      if(section["CourseNum"] == _course["CourseNum"]){
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
    if(this.selectedSectionElement != null){
      this.selectedSectionElement.classList.remove("selected");
      this.selectedSectionElement = null;
    }
  }

  onSearchCourse(newValue: string){
    this.courseSearch = newValue;
    this.filterCourses();
  }

  //TODO get data from form and create the new section
  createSection(){

  }

  copySelectedSection(){

  }

  removeSelectedSection(){

  }

}
