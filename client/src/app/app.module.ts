import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { GuestOverviewComponent } from './body/guest/guest-overview/guest-overview.component';
import { GuestLoginComponent } from './body/guest/guest-login/guest-login.component';
import { GuestRegisterComponent } from './body/guest/guest-register/guest-register.component';
import { GuestResetPassComponent } from './body/guest/guest-reset-pass/guest-reset-pass.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTableModule,
  MatExpansionModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentCvComponent } from './body/student/student-cv/student-cv.component';
import { StudentOverviewComponent } from './body/student/student-overview/student-overview.component';
import { StudentApplicationsComponent } from './body/student/student-applications/student-applications.component';
import { StudentConcourseComponent } from './body/student/student-concourse/student-concourse.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    GuestLoginComponent,
    GuestOverviewComponent,
    GuestRegisterComponent,
    GuestResetPassComponent,
    HeaderComponent,
    StudentCvComponent,
    StudentOverviewComponent,
    StudentApplicationsComponent,
    StudentConcourseComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
