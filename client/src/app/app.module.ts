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
  MatExpansionModule,
  MatSliderModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentCvComponent } from './body/student/student-cv/student-cv.component';
import { StudentOverviewComponent } from './body/student/student-overview/student-overview.component';
import { StudentApplicationsComponent } from './body/student/student-applications/student-applications.component';
import { StudentConcourseComponent } from './body/student/student-concourse/student-concourse.component';
import { LogoutComponent } from './logout/logout.component';
import { CompanyNewConcourseComponent } from './body/company/company-new-concourse/company-new-concourse.component';
import { InvalidPathComponent } from './invalid-path/invalid-path.component';
import { CompanyConcludeComponent } from './body/company/company-conclude/company-conclude.component';
import {
  CompanyFiarApplicationComponent,
  DialogComponent
} from './body/company/company-fiar-application/company-fiar-application.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
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
    LogoutComponent,
    CompanyNewConcourseComponent,
    InvalidPathComponent,
    CompanyConcludeComponent,
    CompanyFiarApplicationComponent,
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
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
