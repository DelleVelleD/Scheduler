import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import{CourselistService} from '../courselist.service';

@Component({
  selector: 'app-course-sections',
  templateUrl: './course-sections.component.html',
  styleUrls: ['./course-sections.component.css']
})
export class CourseSectionsComponent implements OnInit {

  courseList;
  public courseNO;
  displaySection= true;
  constructor(
    
    private route: ActivatedRoute,
    private router: Router,
    private courselistService: CourselistService
    
    ) { }

    ngOnInit() {
      let id= parseInt(this.route.snapshot.paramMap.get('CRSENO'));
      this.courseNO= id;
      this.courseList = this.courselistService.getCourseList();

      // this.course$ = this.route.paramMap.pipe(
      //   switchMap((params: ParamMap) =>
      //     this.service.getHero(params.get('id')))
      // );
    }

}
