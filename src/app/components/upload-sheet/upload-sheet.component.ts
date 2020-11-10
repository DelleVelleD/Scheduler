import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-sheet',
  templateUrl: './upload-sheet.component.html',
  styleUrls: ['./upload-sheet.component.css']
})
export class UploadSheetComponent implements OnInit {

  userIsAdmin = false;

  ngOnInit() {}

  constructor(private http:HttpClient){}

//////////////////
//Upload

  //Returns true if the filename's extension equals the provided extension 
  private validateFileExtension(filename, extension){
      return filename.split('.').pop() == extension ? true : false;
  }

  //Converts the uploaded courses excel file into json and updates the database
  onUploadCourses(ev) {
    let workBook = null;
    let jsonData = null;
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      //only run if the uploaded file has the right extension
      if(!this.validateFileExtension(file.name, "xlsx")){
        document.getElementById('uploadFeedback').innerText = "Failed to upload courses.\nThe file must be an excel document.";
        document.getElementById('uploadFeedback').style.color = "crimson";
        return;
      }

      //read file data into XLSX workbook
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      //convert excel sheets to json objects
      var jsonData = [];
      workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        var semester = {Semester: name.substring(0, name.length-4), 
                        Year: name.substring(name.length-4), 
                        Courses: XLSX.utils.sheet_to_json(sheet)};
        jsonData.push(semester);
      }, {});

      //format professors string into array
      for(var i=0; i<jsonData.length; i++){
        for(let course of jsonData[i].Courses){
          var objArr = [];
          if(course.Professors != "") { //skip if empty
            var strArr:string[] = course.Professors.split(",");
            for(let str of strArr){
              var professor:string[] = str.split(":");
              var obj = {Email: professor[0], Priority: professor[1]};
              objArr.push(obj);
            }
          }
          course.Professors = objArr;
        }
      }

      //TODO upload to db, temp shows the json
      var temp = document.createElement("p");
      temp.classList.add('card-text');
      temp.innerText = JSON.stringify(jsonData);
      document.getElementById('leftColumnCardBody').appendChild(temp);

      //give feedback 
      document.getElementById('uploadFeedback').innerText = "Successfully uploaded courses."; 
      document.getElementById('uploadFeedback').style.color = "green";
    }
    reader.readAsBinaryString(file);
  }

  //Converts the uploaded professors excel file into json and updates the database
  onUploadProfessors(ev) {
    //convert uploaded excel to json
    let workBook = null;
    let jsonData = null;
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      //only run if the uploaded file has the right extension
      if(!this.validateFileExtension(file.name, "xlsx")){
        document.getElementById('uploadFeedback').innerText = "Failed to upload professors.\nThe file must be an excel document.";
        document.getElementById('uploadFeedback').style.color = "crimson";
        return;
      }

      //read file data into XLSX workbook
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      //convert excel sheets to json objects
      var jsonData = [];
      workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        var semester = {Year: name, 
                        Professors: XLSX.utils.sheet_to_json(sheet)};
        jsonData.push(semester);
      }, {});

      //format courses string into array
      for(var i=0; i<jsonData.length; i++){
        for(let professor of jsonData[i].Professors){
          var objArr = [];
          if(professor.Courses != "") { //skip if empty
            var strArr:string[] = professor.Courses.split(",");
            for(let str of strArr){
              var course:string[] = str.split(":");
              var obj = {CRN: course[0], Priority: course[1]};
              objArr.push(obj);
            }
          }
          professor.Courses = objArr;
        }
      }
      console.log(jsonData)

      //TODO upload to database, temporarily shows the json
      var temp = document.createElement("p");
      temp.classList.add('card-text');
      temp.innerText = JSON.stringify(jsonData);
      document.getElementById('leftColumnCardBody').appendChild(temp);

      //give feedback 
      document.getElementById('uploadFeedback').innerText = "Successfully uploaded professors."; 
      document.getElementById('uploadFeedback').style.color = "green";
    }
    reader.readAsBinaryString(file);
  }

//////////////////
//Download

  //Converts the local courses json file to excel and downloads it
  onDownloadCourses() {
    let jsonData = null;
    let workSheet = null;
    var workBook = XLSX.utils.book_new();
    var filename = "";

    this.http.get('../assets/courses.json').subscribe(data => { 
      jsonData = data;

      for(var i in jsonData){ //for each semester
        workSheet = XLSX.utils.json_to_sheet(jsonData[i].Courses);
        for(var j=0; j<jsonData[i].Courses.length; j++){ //for each course
          var professorsStr:string = "";
          for(let professor of jsonData[i].Courses[j].Professors){ //for each professor
            professorsStr += professor.Email + ":" + professor.Priority + ",";
          }
          professorsStr = professorsStr.substring(0, professorsStr.length-1);
          workSheet["S" + (j+2)] = {t: "s", v: professorsStr};
        }
        XLSX.utils.book_append_sheet(workBook, workSheet, jsonData[i]["Semester"] + jsonData[i].Year);
      }

      filename += "Courses.xlsx";
      XLSX.writeFile(workBook, filename);
    });
  }

  //Converts the local professors json file to excel and downloads it
  onDownloadProfessors() {
    let jsonData = null;
    let workSheet:XLSX.WorkSheet = null;
    var workBook:XLSX.WorkBook = XLSX.utils.book_new();
    var filename = "";

    this.http.get('../assets/professors.json').subscribe(data => { 
      jsonData = data;

      for(var i in jsonData){ //for each semester
        workSheet = XLSX.utils.json_to_sheet(jsonData[i].Professors);
        for(var j=0; j<jsonData[i].Professors.length; j++){ //for each professor
          var coursesStr:string = "";
          for(let course of jsonData[i].Professors[j].Courses){ //for each course
            coursesStr += course.CRN + ":" + course.Priority + ",";
          }
          coursesStr = coursesStr.substring(0, coursesStr.length-1);
          workSheet["I" + (j+2)] = {t: "s", v: coursesStr};
        }
        XLSX.utils.book_append_sheet(workBook, workSheet, "" + jsonData[i].Year);
      }

      filename += "Professors.xlsx";
      XLSX.writeFile(workBook, filename);
    });
  }

}
