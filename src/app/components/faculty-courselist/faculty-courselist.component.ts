import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { CourseService } from '../../course.service';
import { SemesterCourseSchema } from '../../course.service';
import { CalendarService } from '../../calendar.service';
import { start } from 'repl';

@Component({
  selector: 'app-courselist',
  templateUrl: './faculty-courselist.component.html',
  styleUrls: ['./faculty-courselist.component.css']
})
export class FacultyCourselistComponent implements OnInit {

  //course lists and filtering 
  courseSearch = "";
  filteredCourses = [];

  //selected course infos
  selectedCourseNum = null;
  selectedCourseSections = [];
  selectedEventSections = [];

  //display times for calendar and max/min for time inputs
  coursesStartTime;
  coursesEndTime;
  coursesTimes;

  constructor(private courseService:CourseService, private calendarService:CalendarService) { }

  ngOnInit(): void {
    this.coursesStartTime = this.courseService.getCoursesStartTime();
    this.coursesStartTime = this.courseService.getCoursesEndTime();
    this.coursesTimes = this.calendarService.courseTimes;

    this.filterCourses();
  }

  //Filters the courses for the desired search criteria, Also removes duplicate courses
  filterCourses(){
    this.filteredCourses = [];
    var filter = new RegExp(this.courseSearch, "ig");

    for(let course of this.courseService.getCurrentSemesterCourses()){
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
    this.selectedCourseNum = _course["CourseNum"];
    for(let section of this.courseService.getCurrentSemesterCourses()){
      if(section["CourseNum"] == _course["CourseNum"]){
        this.selectedCourseSections.push(section);
      }
    }
    this.calendarService.handleCalendarEvents(document, this.selectedCourseSections, this.selectedEventSections);
  }

  //Clears the selected course and section
  clearSelectedCourse(){
    this.selectedCourseSections = [];
    this.selectedEventSections = [];
    this.calendarService.clearCalendarEvents(document);
  }

  //On typing into the course searchbox, filter the courses to that query
  onSearchCourse(newValue: string){
    this.courseSearch = newValue;
    this.filterCourses();
  }

}
