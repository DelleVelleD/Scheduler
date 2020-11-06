import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

export interface SemesterSchema {"Semester":string; "Year":number; "Courses": [];}
export interface SemesterCourseSchema {"CRN":number; "Subject":string; "CourseNum":number; "Title":string; 
"SectionNum":string; "OnlineCode":string; "Days":string; "Start":number; "End":number; "Room":string; 
"Per":number; "LabDays":string; "LabStart":number; "LabEnd":number; "LabRoom":string; "Credits":number; 
"MaxStudents":number; "FullTime":string; "Professors": [];}
export interface SemesterCourseProfessorSchema {"Email":string; "Priority":string;}


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  coursesStartTime = "08:00";
  coursesEndTime = "22:00"

  currentSemester : {Semester:string, Year:number} = {Semester:"Fall", Year:2020};
  semesters = [];

  //non-asynchronous data grab from assets/courses.json
  //i don't know how to make is async and load before everything -chris
  //TODO make async, get it to work with other pages while async
  constructor(private http: HttpClient) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = (event) => {
      var jsonData = JSON.parse(xmlhttp.responseText);
      
      for(var i in jsonData){
        this.semesters.push(jsonData[i]);
      }
    }
    xmlhttp.open("GET", "../assets/courses.json", false);
    xmlhttp.send();
  }

  ngOnInit(){}

  //Updates the courses.json file with the local semesters array
  //TODO you cant write/update files, only change database data
  updateCoursesMongo(){
    console.log(JSON.stringify(this.semesters));
  }

////SEMESTERS////

  //Returns the semester matching given params, null otherwise
  getSemester(_semester:string, _year:number){
    for(let semester of this.semesters){
      if(semester["Semester"].toUpperCase() === _semester.toUpperCase() && semester["Year"] == _year){
        return semester;
      }
    }
    console.error("[COURSE-SERVICE-ERROR] Tried to get semester that is not present in files: " + _semester + ", " + _year);
    return null;
  }

  //Returns the current semester
  getCurrentSemester(){
    return this.getSemester(this.currentSemester.Semester, this.currentSemester.Year);
  }

  //Sets the current semester to given params
  setCurrentSemester(_semester:string, _year:number){
    this.currentSemester.Semester = _semester;
    this.currentSemester.Year = _year;
  }

////COURSES////
//TODO update to use database for all methods

  //Adds the provided course to the provided semester
  addCourseToSemester(_course: SemesterCourseSchema, _semester:string, _year:number) {
    this.getSemester(_semester, _year)["Courses"].push(_course);
  }
  //Adds the provided course to the current semester
  addCourseToCurrentSemester(_course: SemesterCourseSchema){
    this.getCurrentSemester()["Courses"].push(_course);
  }

  //Removes a course from the provided semester that matches the provided crn
  removeCourseFromSemester(_courseCRN:number, _semester:string, _year:number){
    for(var i in this.getSemester(_semester, _year)["Courses"]){
      if(this.getSemester(_semester, _year)["Courses"][i]["CRN"] == _courseCRN){
        this.getSemester(_semester, _year)["Courses"].splice(i, 1);
      }
    }
  }
  //Removes a course from the current semester that matches the provided crn
  removeCourseFromCurrentSemester(_courseCRN:number){
    for(var i in this.getCurrentSemester()["Courses"]){
      if(this.getCurrentSemester()["Courses"][i]["CRN"] == _courseCRN){
        this.getCurrentSemester()["Courses"].splice(i, 1);
      }
    }
  }

  //Returns an array of courses from the semester that matches the provided params
  getSemesterCourses(_semester:string, _year:number) {
    return this.getSemester(_semester, _year)["Courses"];
  }
  //Returns an array of courses from the current semester
  getCurrentSemesterCourses(){
    return this.getCurrentSemester()["Courses"];
  }

  //Clears the courses from the semester that matches the provided params
  clearSemesterCourses(_semester:string, _year:number) {
    this.getSemester(_semester, _year)["Courses"] = [];
  }
  //Clears the courses from the current semester
  clearCurrentSemesterCourses(_semester:string, _year:number) {
    this.getCurrentSemester()["Courses"] = [];
  }

  //Returns an array of courses from the current semester from the MongoDB database
  // fix this once mongo is setup
  getCurrentSemesterCoursesMongo() {
    return this.http.get('http://localhost:4200/api/getUser/').map((response: Response) => response.json());
  }

////OTHERS////

  getCoursesStartTime(){
    return this.coursesStartTime;
  }
  setCoursesStartTime(_time:string){
    this.coursesStartTime = _time;
    return this.coursesStartTime;
  }

  //Loops thru all the courses and finds the highest crn and returns one higher than it
  generateNextCRN(){
    var maxCRN = -1;
    for(let course of this.getCurrentSemester()["Courses"]){
      if(course["CRN"] > maxCRN){
        maxCRN = course["CRN"];
      }
    }
    return maxCRN + 1;
  }

  getCoursesEndTime(){
    return this.coursesEndTime;
  }
  setCoursesEndTime(_time:string){
    this.coursesEndTime = _time;
    return this.coursesEndTime;
  }
}