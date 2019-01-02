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
  MatTableModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    GuestLoginComponent,
    GuestOverviewComponent,
    GuestRegisterComponent,
    GuestResetPassComponent,
    HeaderComponent,
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
