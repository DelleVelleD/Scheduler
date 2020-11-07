import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../course.service';
import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-current-schedule',
  templateUrl: './current-schedule.component.html',
  styleUrls: ['./current-schedule.component.css']
})
export class CurrentScheduleComponent implements OnInit {

  //the search criteria's course information
  course : {crn, subject, number, title, days, startTime, endTime, bNewClasses} = 
            {crn: null, subject: null, number:null, title: null, days: null,
              startTime: null, endTime: null, bNewClasses: true};

  bShowResults = false; //boolean To show search results card
  bNoResults = false; //boolean To show no valid search results text
  currentSemester; //current semester from course service
  user = null; //TODO get user from logged in user
  foundCourses = []; //JSON objects of the found courses in searchCourses
  selectedCourses = []; //JSON objects of the selectedCourses from selectCourse

  //calendar variables
  coursesTimes;
  selectedEventSections = [];

  constructor(private http: HttpClient, private courseService:CourseService, private calendarService:CalendarService) { }

  ngOnInit() {
    this.currentSemester = this.courseService.getCurrentSemester();
    this.coursesTimes = this.calendarService.courseTimes;
  }

  //Searches the courses in the json file for a list of similar courses
  searchCourses(){
    this.bNoResults = false;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = (event) => {
      var jsonData = JSON.parse(xmlhttp.responseText);

      //loop thru all courses to find matches, TODO handle new classes that might not have all info
      for(let semester of jsonData){
        if(semester.Semester != this.currentSemester.Semester || semester.Year != this.currentSemester.Year) continue;
        for(let jsonCourse of semester.Courses){
          if(this.course.startTime != null && jsonCourse.Start < this.course.startTime.replace(":", "")) continue;
          if(this.course.endTime != null && jsonCourse.End > this.course.endTime.replace(":", "")) continue;
          if(this.course.crn != null && jsonCourse.CRN== this.course.crn){
            this.foundCourses.push(jsonCourse);
          }else if(this.course.number != null && jsonCourse.CourseNum == this.course.number){
            this.foundCourses.push(jsonCourse);
          }else if(this.course.title != null && new RegExp(this.course.title, "ig").test(jsonCourse.Title)){
            this.foundCourses.push(jsonCourse);
          }else if(this.course.subject != null && jsonCourse.Subject.toUpperCase() == this.course.subject.toUpperCase()){
            this.foundCourses.push(jsonCourse);
          }
        }
      }
      
      //reset course to default
      this.course = {crn: null, subject: null, number:null, title: null, days: null,
         startTime: null, endTime: null, bNewClasses: true};

      //hide search and show found classes
      if(this.foundCourses.length > 0){
        this.bShowResults = true;
      }else{
        this.bNoResults = true;
      }
    }
    xmlhttp.open("GET", "../assets/courses.json", true);
    xmlhttp.send();
  }

  clearSearch(){
    this.foundCourses = [];
    this.bShowResults = false;
  }

  selectCourse(inCourse){
    for(var i in this.selectedCourses){
      if(this.selectedCourses[i]["CRN"] == inCourse["CRN"]){
        return;
      }
    }
    //TODO add professors to course, add course to professors
    //add new professor to the course's professors
    // var newProf = new Object();
    // newProf["Username"] = user["Username"];
    // newProf["Priority"] = "low";
    // inCourse["Professors"].put(newProf);
    // //add new course to professor's courses
    // var newCourse = new Object();
    // newCourse["CRN"] = inCourse["CRN"];
    // newCourse["Priority"] = "low";
    //add course to current list displayed, TODO list from professors courses rather than local list
    
    this.selectedCourses.push(inCourse);
    this.calendarService.handleCalendarEvents(document, this.selectedCourses, this.selectedEventSections);
  }

  //Updates any changes made in the priority dropdowns, TODO update the json files rather than selectedCourse
  updateChanges(courseIndex: number){
    let course = null;
    let currentDropdown: HTMLSelectElement = null;
    let currentDropdownValue = null;
    var priorityDropdowns = document.getElementsByName("priorityDropdown");
    for(var i=0; i<priorityDropdowns.length; i++){
      currentDropdown = priorityDropdowns[i] as HTMLSelectElement;
      course = this.selectedCourses[courseIndex];
      currentDropdownValue = currentDropdown.options[currentDropdown.selectedIndex].value;
      if(currentDropdownValue == "low"){
        //course["Professors"][user["Email"]]["Priority"] = "low";
      }else if(currentDropdownValue == "medium"){
        //course["Professors"][user["Email"]]["Priority"] = "medium";
      }else if(currentDropdownValue == "high"){
        //course["Professors"][user["Username"]]["Priority"] = "high";
      }else if(currentDropdownValue == "remove"){
        this.selectedCourses.splice(courseIndex, 1);
        this.calendarService.clearCalendarEvents(document);
        this.calendarService.handleCalendarEvents(document, this.selectedCourses, this.selectedEventSections);
      }
    }
  }

}
