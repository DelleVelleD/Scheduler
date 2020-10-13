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

/* Original code
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial[name];
      }, {});

      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      //this.setDownload("", dataString);
    }
    reader.readAsBinaryString(file);
  }
  */

//////////////////
//Upload

  //Returns true if the filename's extension equals the provided extension 
  private validateFileExtension(filename, extension){
      return filename.split('.').pop() == extension ? true : false;
  }

  //Converts the uploaded excel file into json and updates the database
  onUploadCourses(ev) {
    let workBook = null;
    let jsonData = null;
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      //only run if the uploaded file has the right extension
      if(!this.validateFileExtension(file.name, "xlsx")){
        document.getElementById('uploadFeedback').innerText = "Failed to upload courses.\nThe file must be an excel document.";
        document.getElementById('uploadFeedback').style.color = "red";
        return;
      }

      //read file data into XLSX workbook
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      //convert excel sheets to json objects
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial[name];
      }, {});

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

  //TODO uploading professors
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
        document.getElementById('uploadFeedback').style.color = "red";
        return;
      }

      //read file data into XLSX workbook
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      //convert excel sheets to json objects
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial[name];
      }, {});

      //TODO upload to db, temp shows the json
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

    //TODO update this to the right json file
    this.http.get('../assets/spring2019.json').subscribe(data => { 
      jsonData = data;

      workSheet = XLSX.utils.json_to_sheet(jsonData);
      XLSX.utils.book_append_sheet(workBook, workSheet, "Courses");

      //filename += semester;
      //filename += year;
      filename += "Courses.xlsx";
      XLSX.writeFile(workBook, filename);
    });

    //TODO add download feedback
  }

  //Converts the local professors json file to excel and downloads it
  onDownloadProfessors() {
    let jsonData = null;
    let workSheet = null;
    var workBook = XLSX.utils.book_new();
    var filename = "";

    //TODO update this to the right json file
    this.http.get('../assets/spring2019.json').subscribe(data => { 
      jsonData = data;

      workSheet = XLSX.utils.json_to_sheet(jsonData);
      XLSX.utils.book_append_sheet(workBook, workSheet, "Professors");

      //filename += semester;
      //filename += year;
      filename += "Professors.xlsx";
      XLSX.writeFile(workBook, filename);
    });

    //TODO add download feedback
  }

}
