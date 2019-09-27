import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
      return this.http.get('/assets/spring2019.json');
    }

}
