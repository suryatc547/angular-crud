import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LogoutComponent } from './logout/logout.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'login',component:SigninComponent},
{path:'register',component:SignupComponent},
{path:'dashboard',component:DashboardComponent},
{path:'dashboard/:id',component:DashboardComponent},
{path:'forgot-password',component:ForgotComponent},
{path:'logout',component:LogoutComponent},
{path:'contact',component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
