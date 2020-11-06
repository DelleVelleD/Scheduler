import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-view-hours',
  templateUrl: './view-hours.component.html',
  styleUrls: ['./view-hours.component.css']
})
export class ViewHoursComponent implements OnInit {

  bNoMatches = false;
  currentSemester;

  professors = []
  filteredProfessors = []

  search : {name, bHighlightUnder, bHighlightOver} = 
            {name: "", bHighlightUnder: false, bHighlightOver: false};

  professor : {firstName, lastName, email, fallHours, springHours, totalHours, requiredHours, highlight} = 
              {firstName: null, lastName: null, email: null, fallHours: null, springHours: null, 
              totalHours: null, requiredHours: null, highlight: null};

  constructor(private courseService:CourseService){
    this.currentSemester = courseService.getCurrentSemester();

    //load all professors on construction
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = (event) => {
      var jsonData = JSON.parse(xmlhttp.responseText);

      for(let semester of jsonData){
        if(semester.Year != this.currentSemester.Year) continue;
        for(let prof of semester.Professors){
          var newProf = { firstName: prof.FirstName, lastName: prof.LastName, email: prof.Email, fallHours: prof.FallHours,
            springHours: prof.SpringHours, totalHours: prof.FallHours + prof.SpringHours, requiredHours: prof.RequiredHours,
            courses: prof.Courses}
          this.professors.push(newProf);
        }
      }

      this.filteredProfessors = this.professors;
    }
    xmlhttp.open("GET", "../assets/professors.json", true);
    xmlhttp.send();
  }

  ngOnInit(){}

  //Filters the professors for the desired search criteria
  filterProfessors(){
    this.filteredProfessors = []
    let bIsOver = null;
    let bIsUnder = null;

    var filter = new RegExp(this.search.name, "ig");
    for(var i in this.professors){
      var professor = this.professors[i];
      
      if(filter.test(professor["lastName"] + professor["firstName"])){
        bIsOver = professor["totalHours"] > professor["requiredHours"];
        professor["highlight"] = this.search.bHighlightOver && bIsOver ? "over" : "none";
        bIsUnder = professor["totalHours"] < professor["requiredHours"];
        professor["highlight"] = this.search.bHighlightUnder && bIsUnder ? "under" : professor["highlight"];
        this.filteredProfessors.push(professor);
      }
    }
  }

  //On change text, update name filter
  onSearchName(newValue: string){
    this.search.name = newValue;
    this.filterProfessors();
  }

  //On change text, update overtime filter
  onHighlightOver(newValue: boolean){
    this.search.bHighlightOver = newValue;
    this.filterProfessors();
  }

  //On change text, update under required filter
  onHighlightUnder(newValue: boolean){
    this.search.bHighlightUnder = newValue;
    this.filterProfessors();
  }

  //return highlight class if this row should be highlighted
  highlightClass(highlight){
    if(highlight == "over"){
      return "highlight-over";
    }else if(highlight == "under"){
      return "highlight-under";
    }else{
      return "";
    }
  }
    
}