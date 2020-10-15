import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-current-schedule',
  templateUrl: './current-schedule.component.html',
  styleUrls: ['./current-schedule.component.css']
})
export class CurrentScheduleComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  navigate() {
    this.router.navigate(["faculty"]);
  }

  navigate2() {
    this.router.navigate(["calendar"]);
  }
  navigate3() {
    this.router.navigate(["calendar"]);
  }

  ngOnInit() {
  }

  //the search criteria's course information
  course : {crn, department, number, title, days, startTime, endTime, bNewClasses} = 
            {crn: null, department: null, number:null, title: null, days: null,
              startTime: null, endTime: null, bNewClasses: true};

  bShowResults = false; //boolean To show search results card
  bNoResults = false; //boolean To show no valid search results text
  semester = null; //TODO get semester from courses list
  year = null; //TODO get year from courses list
  user = null; //TODO get user from logged in user
  foundCourses = []; //JSON objects of the found courses in searchCourses
  selectedCourses = []; //JSON objects of the selectedCourses from selectCourse

  //Searches the courses in the json file for a list of similar courses
  searchCourses(){
    this.bNoResults = false;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = (event) => {
      var jsonData = JSON.parse(xmlhttp.responseText);

      //loop thru all courses to find matches, TODO update json headers, handle new classes
      for(var i in jsonData){
        var jsonCourse = jsonData[i];
        if(this.course.crn != null && jsonCourse["CRN"] == this.course.crn){
          this.foundCourses.push(jsonCourse);
        }else if(this.course.number != null && jsonCourse["CRSENO"] == this.course.number){
          this.foundCourses.push(jsonCourse);
        }else if(this.course.title != null && new RegExp(this.course.title, "ig").test(jsonCourse["TITLE"])){
          this.foundCourses.push(jsonCourse);
        //}else if(this.course.subject != null && jsonCourse["Department"] == this.course.subject){
        //  this.foundCourses.push(jsonCourse);
        //}else if(this.course.startTime != null && jsonCourse["Start"] == this.course.startTime){
        //  this.foundCourses.push(jsonCourse);
        //}else if(this.course.endTime != null && jsonCourse["End"] == this.course.endTime){
        //  this.foundCourses.push(jsonCourse);
        }
      }
      
      //reset course to default
      this.course = {crn: null, department: null, number:null, title: null, days: null,
         startTime: null, endTime: null, bNewClasses: true};

      //hide search and show found classes
      if(this.foundCourses.length > 0){
        this.bShowResults = true;
      }else{
        this.bNoResults = true;
      }
    }
    xmlhttp.open("GET", "../assets/spring2019.json", true);
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
        //course["Professors"][user["Username"]]["Priority"] = "low";
      }else if(currentDropdownValue == "medium"){
        //course["Professors"][user["Username"]]["Priority"] = "medium";
      }else if(currentDropdownValue == "high"){
        //course["Professors"][user["Username"]]["Priority"] = "high";
      }else if(currentDropdownValue == "remove"){
        this.selectedCourses.splice(courseIndex, 1);
      }
    }
  }

}
