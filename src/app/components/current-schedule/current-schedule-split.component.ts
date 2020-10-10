import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-current-schedule',
  templateUrl: './current-schedule-split.component.html',
  styleUrls: ['./current-schedule-split.component.css']
})
export class CurrentScheduleSplitComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  navigate() {
    this.router.navigate(["homepage-faculty"]);
  }

  ngOnInit() {
  }

  //the course object
  course : {crn, department, number, title, days, startTime, endTime, bNewClasses} = 
            {crn: null, department: null, number:null, title: null, days: null,
              startTime: null, endTime: null, bNewClasses: true};

  bShowResults = false;
  bNoResults = false;
  semester = null;
  year = null;
  user = null;
  foundCourses = [];
  selectedCourses = [];

  //Searches the courses in the json file for a list of similar courses
  searchCourses(){
    this.bNoResults = false;
    //log course info
    console.log(this.course)

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = (event) => {
      var jsonData = JSON.parse(xmlhttp.responseText);
      console.log(jsonData);

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
    this.selectedCourses.push(inCourse);
  }

  updateChanges(){
    var priorityDropdown = document.getElementById("selectPriority"); //TODO remove courses with dropdown set to remove
  }

}
