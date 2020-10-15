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
import { LoginPageComponent } from './components/login-page/login-page.component';

import { CoursesOfferedComponent } from './components/courses-offered/courses-offered.component';
import { CoursesUpcomingComponent } from './components/courses-upcoming/courses-upcoming.component';
import { CurrentScheduleComponent } from './components/current-schedule/current-schedule.component';
import { HomepageAdminComponent } from './components/admin/homepage-admin.component';
import { FacultyComponent } from './components/faculty/faculty.component';

import { CourselistService } from './components/full-courselist/courselist.service';
import { CoursesPipe } from './components/full-courselist/courses/courses.pipe';
import { CourseSectionsPipe } from './components/full-courselist/course-sections/course-sections.pipe';

import { CoursesComponent } from './components/full-courselist/courses/courses.component';
import { CourseSectionsComponent } from './components/full-courselist/course-sections/course-sections.component';


import { AppRoutingModule } from './app-routing.module';
import { CoursesModule } from './components/full-courselist/courses.module';
import { UploadSheetComponent } from './components/upload-sheet/upload-sheet.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewHoursComponent } from './components/view-hours/view-hours.component';
import { AvailableHoursComponent } from './components/available-hours/available-hours.component';

import { CoursesOfferedAdminComponent } from './components/courses-offered-admin/courses-offered-admin.component';
import { CoursesUpcomingAdminComponent } from './components/courses-upcoming-admin/courses-upcoming-admin.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {
    path: 'main-page', component: MainPageComponent,
    children: [
      { path: 'full-courselist/course-sections/:CRSENO', component: CourseSectionsComponent },
      { path: 'full-courselist/course-sections/:DAYS', component: CourseSectionsComponent },
    ]
  },
  { path: 'schedule-conflicts', component: ScheduleConflictsComponent },
  { path: "upload-sheet", component: UploadSheetComponent },
  { path: 'full-courselist/course-sections', component: CourseSectionsComponent },
  { path: 'full-courselist/courses', component: CoursesComponent },
  { path: 'admin', component: HomepageAdminComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: "current-schedule", component: CurrentScheduleComponent },
  { path: "courses-upcoming", component: CoursesUpcomingComponent },
  { path: "courses-offered", component: CoursesOfferedComponent },
  { path: "view-hours", component: ViewHoursComponent },
  { path: "available-hours", component: AvailableHoursComponent },
  { path: "courses-upcoming-admin", component: CoursesUpcomingAdminComponent },
  { path: "courses-offered-admin", component: CoursesOfferedAdminComponent },
  { path: '', redirectTo: 'login-page', pathMatch: 'full' },
  //{ path: '#', redirectTo: 'homepage-faculty', pathMatch: 'full' },
  { path: "**", component: PageNotFoundComponent }
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

  ],
  declarations: [
    AppComponent,
    MainPageComponent,
    ScheduleConflictsComponent,
    CoursesComponent,
    CourseSectionsComponent,
    LoginPageComponent,
    CoursesOfferedComponent,
    CoursesUpcomingComponent,
    CurrentScheduleComponent,
    HomepageAdminComponent,
    FacultyComponent,
    CoursesPipe,
    CourseSectionsPipe,
    ViewHoursComponent,
    AvailableHoursComponent,
    CoursesOfferedAdminComponent,
    CoursesUpcomingAdminComponent,
    UploadSheetComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent

  ],

  providers: [CourselistService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(router: Router) {}

}
