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
verifyEightAM(course){
  if(course.START==800 || course.START==830)
    return true;

}
verifyNineAM(course){
  if(course.START==900 || course.START==930)
    return true;

}
verifyTenAM(course){
  if(course.START==1000 || course.START==1030)
    return true;

}
verifyElevenAM(course){
  if(course.START==1100 || course.START==1130)
    return true;

}
verifyTwelveAM(course){
  if(course.START==1200 || course.START==1230)
    return true;

}
verifyOnePM(course){
  if(course.START==1300 || course.START==1330)
    return true;

}
verifyTwoPM(course){
  if(course.START==1400 || course.START==1430)
    return true;

}
verifyThreePM(course){
  if(course.START==1500 || course.START==1530)
    return true;

}
verifyFourPM(course){
  if(course.START==1600 || course.START==1630)
    return true;

}
verifyFivePM(course){
  if(course.START==1700 || course.START==1730)
    return true;

}
verifySixPM(course){
  if(course.START==1800 || course.START==1830)
    return true;

}
verifySevenPM(course){
  if(course.START==1900 || course.START==1930)
    return true;

}
verifyEightPM(course){
  if(course.START==2000 || course.START==2030)
    return true;

}
verifyNinePM(course){
  if(course.START==2100 || course.START==2130)
    return true;

}
verifyTenPM(course){
  if(course.START==2200 || course.START==2230)
    return true;

}

//conflict() currently doesn't properly look for existing courses with conflicts, it only uses the lastname of the example code for the UI.
//Change conflict() so it can handle conflicts properly
//Line 62 - 76's <div> had the block load on the page at the incorrect location because Line 62 - 76 was placed after Line 78's <div>
conflict(course){
  //if(course.FIRSTNAME=="Doe") {
    if(course.CRN==10100){
    return true;
    }
  return false;
  }
}
