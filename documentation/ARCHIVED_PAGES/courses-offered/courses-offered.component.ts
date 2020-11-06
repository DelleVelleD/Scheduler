import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Courses } from '../../../CourseClass';

@Component({
  selector: 'app-courses-offered',
  templateUrl: './courses-offered.component.html',
  styleUrls: ['./courses-offered.component.css']
})
export class CoursesOfferedComponent implements OnInit {

  constructor(private router: Router) { 
    //load all professors on construction
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = (event) => {
      var jsonData = JSON.parse(xmlhttp.responseText);
      for(var i in jsonData){
        var jsonCourse = jsonData[i];
        for(var j in jsonCourse["Courses"]){
          var newCourse = new Courses();
          newCourse.semester = jsonCourse["Semester"] + " " + jsonCourse["Year"];
          var jsonCourseData = jsonCourse["Courses"][j];
          newCourse.courses["crn"] = jsonCourseData["CRN"];
          newCourse.courses["subject"] = jsonCourseData["Subject"];
          newCourse.courses["courseNum"] = jsonCourseData["CourseNum"];
          newCourse.courses["title"] = jsonCourseData["Title"];
          newCourse.courses["sectionNum"] = jsonCourseData["SectionNum"];
          newCourse.courses["onlineCode"] = jsonCourseData["OnlineCode"];
          newCourse.courses["days"] = jsonCourseData["Days"];
          newCourse.courses["start"] = jsonCourseData["Start"];
          newCourse.courses["end"] = jsonCourseData["End"];
          newCourse.courses["room"] = jsonCourseData["Room"];
          newCourse.courses["per"] = jsonCourseData["Per"];
          newCourse.courses["labDays"] = jsonCourseData["LabDays"];
          newCourse.courses["labStart"] = jsonCourseData["LabStart"];
          newCourse.courses["labEnd"] = jsonCourseData["LabEnd"];
          newCourse.courses["labRoom"] = jsonCourseData["LabRoom"];
          newCourse.courses["credits"] = jsonCourseData["Credits"];
          newCourse.courses["maxStudents"] = jsonCourseData["MaxStudents"];
          newCourse.courses["fullTime"] = jsonCourseData["FullTime"];
          var professors = [];
          for(var k in jsonCourseData["Professors"]){
            var jsonProfessorData = jsonCourseData["Professors"][k];
            if (parseInt(k) == 0){
              professors.push(jsonProfessorData["Email"] + ": " + jsonProfessorData["Priority"]);
            }
            else {
              professors.push(" " + jsonProfessorData["Email"] + ": " + jsonProfessorData["Priority"]);
            }
          }
          newCourse.courses["professors"]["info"] = professors;
          if(newCourse.semester == "Fall 2020") {
            this.fallSemester.push(newCourse);
          }
          else {
            this.springSemester.push(newCourse);
          }
        }
      }
      this.courses.push(this.fallSemester);
      this.courses.push(this.springSemester);
    }
    xmlhttp.open("GET", "../assets/courses.json", true);
    xmlhttp.send();
  }

  navigate() {
    this.router.navigate(["homepage-faculty"]);
  }

  ngOnInit() {  }

  fallSemester: Array<Courses> = []
  springSemester: Array<Courses> = []
  courses: Array<Array<Courses>> = []
  selectedSemester = []

  course : {semester, crn, subject, courseNum, title, sectionNum, days, start, end, room, credits, maxStudents, profInfo} = 
           {semester: null, crn: null, subject: null, courseNum: null, title: null, sectionNum: null, days: null, start: null, end: null, room: null, credits: null, maxStudents: null, profInfo: null};

  selectSemester()
  {
    this.selectedSemester = [];
    for(var i in this.courses){
      var jsonSemester = this.courses[i];
      for(var j in jsonSemester)
      {
        var jsonCourse = jsonSemester[j];
        if(this.course.semester != null && jsonCourse["semester"] == this.course.semester)
        {
          this.selectedSemester.push(jsonCourse);
        }
      }
    } 
  }
}