import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

@Pipe({
  name: 'courseSections',
  pure: false
})
export class CourseSectionsPipe implements PipeTransform {

  
 
  
  transform(courseList: any, courseNO: any): any {
    if(courseList!== undefined && courseList!== null){
    
      return courseList.filter(function(course){
      return course.CRSENO.includes(courseNO);
    })
  }
  
  // console.log('Course Section is', courseNO);
  return courseList;
  }


}
