import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CourseSectionsComponent } from './course-sections/course-sections.component';
// import { CoursesComponent } from './courses/courses.component';

import { CoursesRoutingModule } from './courses-routing.module';
// import { CourselistService } from '../../courselist.service';

@NgModule({
  declarations: [CourseSectionsComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule
    // CourselistService,
    // CoursesComponent
  ]
})
export class CoursesModule { }
