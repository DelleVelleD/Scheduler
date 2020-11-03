import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  courseTimes = ["12am", "", "1am", "", "2am", "", "3am", "", "4am", "", "5am", 
  "", "6am", "", "7am", "", "8am", "", "9am", "", "10am", "", "11am", "", "12pm", 
  "", "1pm", "", "2pm", "", "3pm", "", "4pm", "", "5pm", "", "6pm", "", "7pm", 
  "", "8pm", "", "9pm", "", "10pm", "", "11pm", ""]

  constructor() { 
  }

  ngOnInit(){}

  //On clicking a calendar event, display the sections of that time in the modal
  clickCalendarEvent(_section){
    
  }

  //Clears the calendar events from given document
  clearCalendarEvents(_document:Document){
    var calEventsDiv = _document.getElementById("calendarEvents");
    while(calEventsDiv.firstChild){
      calEventsDiv.removeChild(calEventsDiv.firstChild);
    }
  }


  //Clears current calendar events, creates new calendar events from given list, and places the calendar events into given document
  handleCalendarEvents(_document:Document, _sectionList:any[]){ //TODO replace time json gets with nums
    this.clearCalendarEvents(_document);
    var calEventsDiv = _document.getElementById("calendarEvents");
    for(let section of _sectionList){
      //create a calender event for each day
      for(var i=0; i<section.Days.length; i++){
        var calEvent = _document.createElement("div");

        var calEventText:HTMLParagraphElement = _document.createElement("p");
        calEventText.innerText = section["Subject"] + " " + section["CourseNum"] + ", " + section["SectionNum"];
        calEventText.style.textAlign = "center";
        calEvent.appendChild(calEventText);

        //adding the calendarEvent class doesnt do anything, so i manually change the styles, TODO fix this
        calEvent.classList.add("calendarEvent", "text-centered");
        calEvent.setAttribute("name", "calendarEvent");
        calEvent.style.position = "absolute";
        calEvent.style.borderRadius = "2px";
        calEvent.style.color = "white";
        calEvent.style.fontSize = "1vw";
        calEvent.style.backgroundColor = section.Professors.length>1 ? "crimson" : "#00B4FC";
        calEvent.style.cursor = "pointer";

        calEvent.addEventListener('click', (e) =>{
          //clickCalendarEvent(section);
          this.clickCalendarEvent(section);
        });
        calEvent.setAttribute("data-toggle", "modal");
        calEvent.setAttribute("data-target", "#calendarEventModal");
        
        //calculate event offsets/sizes in calendar
        var theadHeight:number = _document.getElementById("calendarTHead").getBoundingClientRect().height;
        var bodyRowHeight:number = _document.getElementById("calendarBodyRow").getBoundingClientRect().height;
        var startHour:number = parseInt(section.Start.replace(':', '').substring(0, section.Start.length-3));
        var startMinute:number = parseInt(section.Start.replace(':', '').substring(section.Start.length-1, section.Start.length-3));
        console.log(theadHeight, bodyRowHeight, startHour, startMinute)
        calEvent.style.top = (theadHeight + (bodyRowHeight*2 * startHour) + (bodyRowHeight * startMinute/30)).toString() + "px";

        var endHour:number = parseInt(section.End.replace(':', '').substring(0, section.End.length-3));
        var endMinute:number = parseInt(section.End.replace(':', '').substring(section.End.length-1, section.End.length-3));
        calEvent.style.height = ((endHour - startHour)*bodyRowHeight*2 + (endMinute - startMinute)/30 * bodyRowHeight).toString() + "px";

        var timeColWidth:number = _document.getElementById("calendarTimeCol").getBoundingClientRect().width;
        var sunColWidth:number = _document.getElementById("calendarSundayCol").getBoundingClientRect().width;
        var monColWidth:number = _document.getElementById("calendarMondayCol").getBoundingClientRect().width;
        var tueColWidth:number = _document.getElementById("calendarTuesdayCol").getBoundingClientRect().width;
        var wedColWidth:number = _document.getElementById("calendarWednesdayCol").getBoundingClientRect().width;
        var thuColWidth:number = _document.getElementById("calendarThursdayCol").getBoundingClientRect().width;
        var friColWidth:number = _document.getElementById("calendarFridayCol").getBoundingClientRect().width;
        var satColWidth:number = _document.getElementById("calendarSaturdayCol").getBoundingClientRect().width;

        switch(section.Days.charAt(i)){
          case "M":
            calEvent.style.width = monColWidth.toString() + "px";
            calEvent.style.left = (timeColWidth+sunColWidth).toString() + "px";
            break;
          case "T":
            calEvent.style.width = tueColWidth.toString() + "px";
            calEvent.style.left = (timeColWidth+sunColWidth+monColWidth).toString() + "px";
            break;
          case "W":
            calEvent.style.width = wedColWidth.toString() + "px";
            calEvent.style.left = (timeColWidth+sunColWidth+monColWidth+tueColWidth).toString() + "px";
            break;
          case "R":
            calEvent.style.width = thuColWidth.toString() + "px";
            calEvent.style.left = (timeColWidth+sunColWidth+monColWidth+tueColWidth+wedColWidth).toString() + "px";
            break;
          case "F":
            calEvent.style.width = friColWidth.toString() + "px";
            calEvent.style.left = (timeColWidth+sunColWidth+monColWidth+tueColWidth+wedColWidth+thuColWidth).toString() + "px";
            break;
          case "S":
            calEvent.style.width = satColWidth.toString() + "px";
            calEvent.style.left = (timeColWidth+sunColWidth+monColWidth+tueColWidth+wedColWidth+thuColWidth+friColWidth).toString() + "px";
            break;
        }
        console.log(calEvent.style.top, calEvent.style.height, calEvent.style.left, calEvent.style.width);
        calEventsDiv.appendChild(calEvent);
      }
    }
  }

}
