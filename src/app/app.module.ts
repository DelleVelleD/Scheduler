import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Router } from '@angular/router';


import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router/';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ScheduleConflictsComponent } from './components/schedule-conflicts/schedule-conflicts.component';
import { FacultyIssuesComponent } from './components/faculty-issues/faculty-issues.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

import { CalendarComponent } from './components/calendar/calendar.component';
import { CoursesOfferedComponent } from './components/courses-offered/courses-offered.component';
import { CoursesUpcomingComponent } from './components/courses-upcoming/courses-upcoming.component';
import { CurrentScheduleComponent } from './components/current-schedule/current-schedule.component';
import { HomepageFacultyComponent } from './components/homepage-faculty/homepage-faculty.component';

import { CourselistService } from './components/full-courselist/courselist.service';

import { CoursesPipe } from './components/full-courselist/courses/courses.pipe';
import { CourseSectionsPipe } from './components/full-courselist/course-sections/course-sections.pipe';

import { CoursesComponent } from './components/full-courselist/courses/courses.component';
import { CourseSectionsComponent } from './components/full-courselist/course-sections/course-sections.component';


import { AppRoutingModule } from './app-routing.module';
import { CoursesModule } from './components/full-courselist/courses.module';



const routes: Routes = [
  {
    path: 'main-page', component: MainPageComponent,
    children: [
      { path: 'schedule-conflicts', component: ScheduleConflictsComponent },
      { path: 'faculty-issues', component: FacultyIssuesComponent },
      { path: 'full-courselist/courses', component: CoursesComponent },
      { path: 'full-courselist/course-sections', component: CourseSectionsComponent },
      { path: 'full-courselist/course-sections/:CRSENO', component: CourseSectionsComponent },
      { path: "calendar", component: CalendarComponent }

    ]
  },
  { path: 'homepage-faculty', component: HomepageFacultyComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: "current-schedule", component: CurrentScheduleComponent },
  { path: "courses-upcoming", component: CoursesUpcomingComponent },
  { path: "courses-offered", component: CoursesOfferedComponent },
  { path: "calendar", component: CalendarComponent },
  { path: '#', redirectTo: 'homepage-faculty', pathMatch: 'full' },
  { path: '', redirectTo: 'login-page', pathMatch: 'full' }
];

@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CoursesModule,
    HttpClientModule,
    RouterModule,    
    RouterModule.forRoot(routes)
    //  AppRoutingModule,
    
  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    ScheduleConflictsComponent,
    FacultyIssuesComponent,
    CoursesComponent,
    CourseSectionsComponent,
    LoginPageComponent,
    CalendarComponent,
    CoursesOfferedComponent,
    CoursesUpcomingComponent,
    CurrentScheduleComponent,
    HomepageFacultyComponent,
    CoursesPipe,
    CourseSectionsPipe

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(router: Router) {}



}
