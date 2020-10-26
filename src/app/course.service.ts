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

  currentSemester : {semester:string, year:number} = {semester:"Fall", year:2020};
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

  //Returns the semester matchig given params, null otherwise
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
    return this.getSemester(this.currentSemester.semester, this.currentSemester.year);
  }

  //Sets the current semester to given params
  setCurrentSemester(_semester:string, _year:number){
    this.currentSemester.semester = _semester;
    this.currentSemester.year = _year;
  }

////COURSES////

  //Adds the provided course to the provided semester
  addCourseToSemester(_course: SemesterCourseSchema, _semester:string, _year:number) {
    this.getSemester(_semester, _year)["Courses"].push(_course);
  }

  //Adds the provided course to the current semester
  addCourseToCurrentSemester(_course: SemesterCourseSchema){
    this.getCurrentSemester()["Courses"].push(_course);
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
  //TODO fix this once mongo is setup
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

  getCoursesEndTime(){
    return this.coursesEndTime;
  }
  setCoursesEndTime(_time:string){
    this.coursesEndTime = _time;
    return this.coursesEndTime;
  }
}