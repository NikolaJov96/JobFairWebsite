import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestOverviewComponent } from './body/guest/guest-overview/guest-overview.component';
import { GuestLoginComponent } from './body/guest/guest-login/guest-login.component';
import { GuestRegisterComponent } from './body/guest/guest-register/guest-register.component';
import { GuestResetPassComponent } from './body/guest/guest-reset-pass/guest-reset-pass.component';
import { StudentCvComponent } from './body/student/student-cv/student-cv.component';
import { StudentOverviewComponent } from './body/student/student-overview/student-overview.component';
import { StudentCompanyOverviewComponent } from './body/student/student-company-overview/student-company-overview.component';
import { StudentConcourseComponent } from './body/student/student-concourse/student-concourse.component';
import { StudentApplicationsComponent } from './body/student/student-applications/student-applications.component';

const routes: Routes = [
  {
    path: 'guest/overview',
    component: GuestOverviewComponent
  },
  {
    path: 'guest/login',
    component: GuestLoginComponent
  },
  {
    path: 'guest/register',
    component: GuestRegisterComponent
  },
  {
    path: 'guest/reset-pass',
    component: GuestResetPassComponent
  },
  {
    path: 'student/cv',
    component: StudentCvComponent
  },
  {
    path: 'student/overview-coms',
    component: StudentOverviewComponent
  },
  {
    path: 'student/overview-com',
    component: StudentCompanyOverviewComponent,
  },
  {
    path: 'student/overview-offer',
    component: StudentConcourseComponent,
  },
  {
    path: 'student/applications',
    component: StudentApplicationsComponent
  },
  {
    path: '**',
    redirectTo: '/guest/login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
