import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CourseSectionsComponent } from './course-sections/course-sections.component';
// import { CoursesComponent } from './courses/courses.component';

import { CoursesRoutingModule } from './courses-routing.module';



@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,
    CoursesRoutingModule
  
    // CoursesComponent
  ]
})
export class CoursesModule { }
