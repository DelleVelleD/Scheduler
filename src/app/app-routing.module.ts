import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ScheduleConflictsComponent } from './components/schedule-conflicts/schedule-conflicts.component';
import { FacultyIssuesComponent } from './components/faculty-issues/faculty-issues.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoursesComponent }   from './components/full-courselist/courses/courses.component';

const routes: Routes = [
  { path: 'app-root', component: AppComponent },
  { path: 'courses', component: CoursesComponent },
  {path: '', redirectTo: 'app-root', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes ,
      { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
