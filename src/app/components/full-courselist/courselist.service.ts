import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//  import {Http, Response, Headers, RequestOptions} from '@angular/common/http';


// import{ Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/do  ';



@Injectable({
  providedIn: 'root'
})
export class CourselistService {
  constructor(
    private http: HttpClient

  ) { }

  items = [];


  addToCourseList(course) {
    this.items.push(course);
  }

  getItems() {
    return this.items;
  }

  clearCourseList() {
    this.items = [];
    return this.items;
  }

  getCourseList() {

    return this.http.get('../assets/spring2019.json');

  }

  getCourseListMongo() {

    return this.http.get('http://localhost:4200/api/getUser/').map((response: Response) => response.json());

  }

}
