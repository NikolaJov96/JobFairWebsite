import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestOverviewComponent } from './body/guest/guest-overview/guest-overview.component';
import { GuestLoginComponent } from './body/guest/guest-login/guest-login.component';
import { GuestRegisterComponent } from './body/guest/guest-register/guest-register.component';
import { GuestResetPassComponent } from './body/guest/guest-reset-pass/guest-reset-pass.component';
import { StudentCvComponent } from './body/student/student-cv/student-cv.component';
import { StudentOverviewComponent } from './body/student/student-overview/student-overview.component';
import { StudentConcourseComponent } from './body/student/student-concourse/student-concourse.component';
import { StudentApplicationsComponent } from './body/student/student-applications/student-applications.component';
import { LogoutComponent } from './logout/logout.component';
import { CompanyNewConcourseComponent } from './body/company/company-new-concourse/company-new-concourse.component';
import { InvalidPathComponent } from './invalid-path/invalid-path.component';
import { CompanyConcludeComponent } from './body/company/company-conclude/company-conclude.component';

const routes: Routes = [
  {
    path: 'guest/overview',
    component: GuestOverviewComponent,
  },
  {
    path: 'guest/login',
    component: GuestLoginComponent,
  },
  {
    path: 'guest/register',
    component: GuestRegisterComponent,
  },
  {
    path: 'guest/reset-pass',
    component: GuestResetPassComponent,
  },
  {
    path: 'student/cv',
    component: StudentCvComponent,
  },
  {
    path: 'student/overview-coms',
    component: StudentOverviewComponent,
  },
  {
    path: 'student/concourse',
    component: StudentConcourseComponent,
  },
  {
    path: 'student/applications',
    component: StudentApplicationsComponent,
  },
  {
    path: 'company/new-concourse',
    component: CompanyNewConcourseComponent,
  },
  {
    path: 'company/conclude',
    component: CompanyConcludeComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '**',
    component: InvalidPathComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
