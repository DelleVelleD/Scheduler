import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ScheduleConflictsComponent } from './components/schedule-conflicts/schedule-conflicts.component';
import { SystemErrorsComponent } from './components/system-errors/system-errors.component';
import { FacultyIssuesComponent } from './components/faculty-issues/faculty-issues.component';

const routes: Routes = [
  { path: 'app-root', component: AppComponent },
  { path: 'search-results', component:SearchResultsComponent },
  {path: '', redirectTo: 'app-root', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
