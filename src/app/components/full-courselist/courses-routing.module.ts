import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { CourseSectionsComponent } from './course-sections/course-sections.component';

const coursesRoutes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'course-sections', component: CourseSectionsComponent }
  // { path: 'course/:CRSENO ', component: CourseSectionsComponent },
  // { path: 'course/:DAYS ', component: CourseSectionsComponent }



];

@NgModule({
  imports: [
    RouterModule.forChild(coursesRoutes
    )],
  exports: [
    RouterModule
  ]
})
export class CoursesRoutingModule { }
