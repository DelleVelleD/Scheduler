import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-sheet',
  templateUrl: './upload-sheet.component.html',
  styleUrls: ['./upload-sheet.component.css']
})
export class UploadSheetComponent implements OnInit {

  willDownload = false;
  // private httpClient: HttpClient;

  constructor(private http: HttpClient) { 

    // this.httpClient = http;
  }

  ngOnInit() {
  }
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
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'newSemester.json');
    }, 1000)
  }

  // public async uploadFile( file: File ) : Promise<UploadResult> {

	// 	var result = await this.httpClient
	// 		.post<ApiUploadResult>(
	// 			"./api/upload.cfm",
	// 			file, // Send the File Blob as the POST body.
	// 			{
	// 				// NOTE: Because we are posting a Blob (File is a specialized Blob
	// 				// object) as the POST body, we have to include the Content-Type
	// 				// header. If we don't, the server will try to parse the body as
	// 				// plain text.
	// 				headers: {
	// 					"Content-Type": file.type
	// 				},
	// 				params: {
	// 					clientFilename: file.name,
	// 					mimeType: file.type
	// 				}
	// 			}
	// 		)
	// 		.toPromise()
	// 	;
  //     }
}
