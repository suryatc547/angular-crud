import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ValidationDirective } from './validation.directive';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
// import { ToastrModule,ToastNoAnimation,ToastNoAnimationModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotComponent } from './forgot/forgot.component';
import { CommonService } from './common.service';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ValidationDirective,
    SigninComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    LogoutComponent,
    ForgotComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ToastrModule.forRoot({
    //   timeOut:4000,
    //   positionClass:'toastr-top-right',
    //   preventDuplicates:true,
    // })
  ],
  providers: [
  {provide:HTTP_INTERCEPTORS,useClass:CommonService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
