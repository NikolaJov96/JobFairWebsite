import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestOverviewComponent } from './body/guest/guest-overview/guest-overview.component';
import { GuestLoginComponent } from './body/guest/guest-login/guest-login.component';
import { GuestRegisterComponent } from './body/guest/guest-register/guest-register.component';
import { GuestResetPassComponent } from './body/guest/guest-reset-pass/guest-reset-pass.component';

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
    path: '**',
    redirectTo: '/guest/overview'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
