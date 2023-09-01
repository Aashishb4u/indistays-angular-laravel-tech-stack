import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthService} from "./services/auth.service";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";

const routes: Routes = [
  { path:  '', component:  LandingComponent, data: { title: 'Home | Indistays' }},
  { path:  'landing', component:  LandingComponent, data: { title: 'Home | Indistays' }},
  { path:  'login', component:  LoginComponent, canActivate: [async () => await inject(AuthService).userBeforeLoggedIn()]},
  { path:  'dashboard', component:  DashboardComponent, canActivate: [async () => await inject(AuthService).isUserLoggedIn()]},
  { path:  'change-password', component:  ChangePasswordComponent, canActivate: [async () => await inject(AuthService).isUserLoggedIn()] },
  { path:  '**', component:  NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
