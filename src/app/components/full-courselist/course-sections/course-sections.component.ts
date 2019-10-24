import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CourselistService } from '../courselist.service';

@Component({
  selector: 'app-course-sections',
  templateUrl: './course-sections.component.html',
  styleUrls: ['./course-sections.component.css']
})
export class CourseSectionsComponent implements OnInit {

  courseList;
  courseNO: number;
days: string;
  displaySection = true;
  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private courselistService: CourselistService

  ) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('CRSENO'));
    let day = this.route.snapshot.paramMap.get('DAYS');
    this.days = day;
    this.courseNO = id;
    this.courseList = this.courselistService.getCourseList();

    

    // this.course$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getHero(params.get('id')))
    // );
  }

  verifyMonday(course) {

    if(course.DAYS=="M" || course.DAYS=="MW" || course.DAYS=="MWF")   
        return true;

    return false;
}
verifyTuesday(course) {

  if(course.DAYS=="T" || course.DAYS=="TR")   
      return true;
      
  return false;
}
verifyWednesday(course) {

  if(course.DAYS=="W" || course.DAYS=="MW" || course.DAYS=="MWF")      
      return true;
      
  return false;
}
verifyThursday(course) {

  if(course.DAYS=="R" || course.DAYS=="TR" )      
      return true;
      
  return false;
}
verifyFriday(course) {

  if(course.DAYS=="F" || course.DAYS=="MWF" )      
      return true;
      
  return false;
}
verifySaturday(course) {

  if(course.DAYS=="S")      
      return true;
      
  return false;
}
  verifyTime(course){
    if(course.START==800 || course.START==830)
      return true;
  
}

}
