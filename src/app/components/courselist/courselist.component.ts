import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { CourseService } from '../../course.service';
import { SemesterCourseSchema } from '../../course.service';
import { CalendarService } from '../../calendar.service';
import { start } from 'repl';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  //course lists and filtering 
  courseSearch = "";
  filteredCourses = [];

  //selected course infos
  selectedCourseNum = null;
  selectedCourseSections = [];

  //selected section infos
  selectedSection = null;
  selectedSectionElement : HTMLElement = null;
  selectedEventSections = [];

  //display times for calendar and max/min for time inputs
  coursesStartTime;
  coursesEndTime;
  coursesTimes;

  //new section template
  newSection : {Room:string, Days:string, DayM: boolean, DayT: boolean, DayW: boolean, DayR: boolean,
                DayF: boolean, DayS: boolean, Start:string, End:string, Credits:number, MaxStudents:number, 
                SectionNum:string, OnlineCode:string, Per:number, LabDays:string, DayML: boolean, 
                DayTL: boolean,DayWL: boolean,DayRL: boolean, DayFL: boolean,DaySL: boolean, LabStart:string,
                LabEnd:string, LabRoom:string, FullTime:boolean} =
                {Room:null, Days:"", DayM:false, DayT:false, DayW:false, DayR:false, DayF:false, DayS:false, Start:null,
                End:null, Credits:null, MaxStudents:null, SectionNum:null, OnlineCode:null, Per:null, LabDays:"", 
                DayML:false, DayTL:false, DayWL:false, DayRL:false, DayFL:false, DaySL:false, LabStart:null, LabEnd:null,
                LabRoom:null, FullTime:true};

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
    this.clearSelectedSection();
    this.calendarService.clearCalendarEvents(document);
  }

  //Selects the clicked section and adds the 'selected' class to its shipping-item
  selectSection(_section, _el){
    this.selectedSection = _section;
    if(this.selectedSectionElement == null){
      this.selectedSectionElement = (_el.target as HTMLElement).parentElement;
      this.selectedSectionElement.classList.add("selected");
    }else{
      this.selectedSectionElement.classList.remove("selected");
      this.selectedSectionElement = (_el.target as HTMLElement).parentElement;
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

  //On typing into the course searchbox, filter the courses to that query
  onSearchCourse(newValue: string){
    this.courseSearch = newValue;
    this.filterCourses();
  }

  //Creates a section based on the inputs form the create section modal form
  //TODO check against existing variables to avoid duplicates
  createSection(){
    //process the day buttons into a string for the database
    this.newSection.Days += this.newSection.DayM ? "M" : "";
    this.newSection.Days += this.newSection.DayT ? "T" : "";
    this.newSection.Days += this.newSection.DayW ? "W" : "";
    this.newSection.Days += this.newSection.DayR ? "R" : "";
    this.newSection.Days += this.newSection.DayF ? "F" : "";
    this.newSection.Days += this.newSection.DayS ? "S" : "";
    this.newSection.LabDays += this.newSection.DayML ? "M" : "";
    this.newSection.LabDays += this.newSection.DayTL ? "T" : "";
    this.newSection.LabDays += this.newSection.DayWL ? "W" : "";
    this.newSection.LabDays += this.newSection.DayRL ? "R" : "";
    this.newSection.LabDays += this.newSection.DayFL ? "F" : "";
    this.newSection.LabDays += this.newSection.DaySL ? "S" : "";

    //create and add the course to the semester
    const newCourse: SemesterCourseSchema = {
      CRN: this.courseService.generateNextCRN(), 
      Subject: this.selectedCourseSections[0]["Subject"], 
      CourseNum: this.selectedCourseSections[0]["CourseNum"],
      Title: this.selectedCourseSections[0]["Title"],
      SectionNum: this.newSection.SectionNum,
      OnlineCode: this.newSection.OnlineCode,
      Days: this.newSection.Days,
      Start: this.newSection.Start != null ? parseInt(this.newSection.Start.replace(":", "")) : null,
      End: this.newSection.End != null ? parseInt(this.newSection.End.replace(":", "")) : null,
      Room: this.newSection.Room,
      Per: this.newSection.Per,
      LabDays: this.newSection.LabDays,
      LabStart: this.newSection.LabStart != null ? parseInt(this.newSection.LabStart.replace(":", "")) : null,
      LabEnd: this.newSection.LabEnd != null ? parseInt(this.newSection.LabEnd.replace(":", "")) : null,
      LabRoom: this.newSection.LabRoom,
      Credits: this.newSection.Credits,
      MaxStudents: this.newSection.MaxStudents,
      FullTime: this.newSection.FullTime ? "FT" : "PT",
      Professors: []
    };
    this.courseService.addCourseToCurrentSemester(newCourse);

    //refresh the sections list, TODO calendar is not getting refreshed
    this.clearSelectedCourse();
    var temp = new Object();
    temp["CourseNum"] = this.selectedCourseNum;
    this.selectCourse(temp);

    //reset new section
    this.newSection = {Room:null, Days:"", DayM:false, DayT:false, DayW:false, DayR:false, DayF:false, DayS:false, Start:null,
                      End:null, Credits:null, MaxStudents:null, SectionNum:null, OnlineCode:null, Per:null, LabDays:"", 
                      DayML:false, DayTL:false, DayWL:false, DayRL:false, DayFL:false, DaySL:false, LabStart:null, LabEnd:null,
                      LabRoom:null, FullTime:true};
  }

  //Toggles the day booleans for a new section
  toggleDay(_day:string, _lab:boolean){
    if(!_lab){
      switch(_day){
        case 'M':
          this.newSection.DayM = this.newSection.DayM ? false: true;
          break;
        case 'T':
          this.newSection.DayT = this.newSection.DayT ? false: true;
          break;
        case 'W':
          this.newSection.DayW = this.newSection.DayW ? false: true;
          break;
        case 'R':
          this.newSection.DayR = this.newSection.DayR ? false: true;
          break;
        case 'F':
          this.newSection.DayF = this.newSection.DayF ? false: true;
          break;
        case 'S':
          this.newSection.DayS = this.newSection.DayS ? false: true;
          break;
      }
    }else{
      switch(_day){
        case 'M':
          this.newSection.DayML = this.newSection.DayML ? false: true;
          break;
        case 'T':
          this.newSection.DayTL = this.newSection.DayTL ? false: true;
          break;
        case 'W':
          this.newSection.DayWL = this.newSection.DayWL ? false: true;
          break;
        case 'R':
          this.newSection.DayRL = this.newSection.DayRL ? false: true;
          break;
        case 'F':
          this.newSection.DayFL = this.newSection.DayFL ? false: true;
          break;
        case 'S':
          this.newSection.DaySL = this.newSection.DaySL ? false: true;
          break;
      }
    }
  }

  //Toggles the full time boolean for a new section
  toggleFullTime(){
    this.newSection.FullTime = this.newSection.FullTime ? false: true;
  }

  //Copies the selected section's data into the create section modal
  //TODO this
  copySelectedSection(){

  }

  //Calls the course service to remove the selected section
  removeSelectedSection(){
    this.courseService.removeCourseFromCurrentSemester(this.selectedSection["CRN"]);

    //refresh the sections list
    this.clearSelectedCourse();
    var temp = new Object();
    temp["CourseNum"] = this.selectedCourseNum;
    this.selectCourse(temp);
  }

}
