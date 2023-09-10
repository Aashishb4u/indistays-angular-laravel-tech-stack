import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthService} from "./services/auth.service";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";
import {UsersComponent} from "./pages/dashboard/users/users.component";
import {AddEditUsersComponent} from "./pages/dashboard/users/add-edit-users/add-edit-users.component";
import {DestinationsComponent} from "./pages/dashboard/destinations/destinations.component";
import {AddEditDestinationComponent} from "./pages/dashboard/destinations/add-edit-destination/add-edit-destination.component";

const routes: Routes = [
  { path:  '', component:  LandingComponent, data: { title: 'Home | Indistays' }},
  { path:  'landing', component:  LandingComponent, data: { title: 'Home | Indistays' }},
  { path:  'login', component:  LoginComponent, canActivate: [async () => await inject(AuthService).userBeforeLoggedIn()]},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [async () => await inject(AuthService).isUserLoggedIn()],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' }, // Redirect to 'users' by default
      { path: 'users', component: UsersComponent }, // Users component under dashboard
      { path: 'add-user', component: AddEditUsersComponent },
      { path: 'edit-user/:id', component: AddEditUsersComponent }, // Define a route with an 'id' parameter
      { path: 'destinations', component: DestinationsComponent }, // Users component under dashboard
      { path: 'add-destination', component: AddEditDestinationComponent },
      { path: 'edit-destination/:id', component: AddEditDestinationComponent }, // Define a route with an 'id' parameter
    ],
  },
  { path:  'change-password', component:  ChangePasswordComponent, canActivate: [async () => await inject(AuthService).isUserLoggedIn()] },
  { path:  '**', component:  NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
