import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

@Pipe({
  name: 'courseSections',
  pure: false
})
export class CourseSectionsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value!== undefined && value!== null){
      return _.uniqBy(value, 'CRSENO');
  }
  return value;
  }


}
