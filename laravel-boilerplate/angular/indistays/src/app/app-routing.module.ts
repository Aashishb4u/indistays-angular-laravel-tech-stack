import {inject, NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
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
import {CampingsComponent} from "./pages/dashboard/campings/campings.component";
import {AddEditCampingComponent} from "./pages/dashboard/campings/add-edit-camping/add-edit-camping.component";
import {AccommodationComponent} from "./pages/dashboard/accommodation/accommodation.component";
import {AddEditAccommodationComponent} from "./pages/dashboard/accommodation/add-edit-accommodation/add-edit-accommodation.component";
import {CustomPricingComponent} from "./pages/dashboard/custom-pricing/custom-pricing.component";
import {AddEditCustomPricingComponent} from "./pages/dashboard/custom-pricing/add-edit-custom-pricing/add-edit-custom-pricing.component";
import {CustomBookingsComponent} from "./pages/dashboard/custom-bookings/custom-bookings.component";
import {AddEditCustomBookingComponent} from "./pages/dashboard/custom-bookings/add-edit-custom-booking/add-edit-custom-booking.component";
import {DestinationDetailsComponent} from "./pages/destination-details/destination-details.component";
import {CampingDetailsComponent} from "./pages/camping-details/camping-details.component";
import {ContactUsComponent} from "./pages/contact-us/contact-us.component";
import {DestinationsListingComponent} from "./pages/destinations/destinations.component";
import {CampingsListingComponent} from "./pages/campings/campings.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {EnquiriesComponent} from "./pages/dashboard/enquiries/enquiries.component";
import {AssetsManagementComponent} from "./pages/dashboard/assets-management/assets-management.component";
import {AddEditAssetComponent} from "./pages/dashboard/assets-management/add-edit-asset/add-edit-asset.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to 'users' by default
  // { path:  '', component:  LandingComponent, data: { title: 'Home | Indistays' }},
  { path:  'home', component:  LandingComponent, data: { title: 'Home | Indistays' }},
  { path:  'login', component:  LoginComponent, canActivate: [async () => await inject(AuthService).userBeforeLoggedIn()]},
  { path: 'destination-details/:id', component: DestinationDetailsComponent },
  { path: 'camping-details/:id', component: CampingDetailsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'destinations', component: DestinationsListingComponent },
  { path: 'campings', component: CampingsListingComponent },
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
      { path: 'camping', component: CampingsComponent }, // Users component under dashboard
      { path: 'add-camping', component: AddEditCampingComponent },
      { path: 'edit-camping/:id', component: AddEditCampingComponent }, // Define a route with an 'id' parameter
      { path: 'accommodation', component: AccommodationComponent }, // Users component under dashboard
      { path: 'add-accommodation', component: AddEditAccommodationComponent },
      { path: 'edit-accommodation/:id', component: AddEditAccommodationComponent },
      { path: 'custom-pricing', component: CustomPricingComponent }, // Users component under dashboard
      { path: 'add-custom-pricing', component: AddEditCustomPricingComponent },
      { path: 'edit-custom-pricing/:id', component: AddEditCustomPricingComponent },
      { path: 'custom-booking', component: CustomBookingsComponent }, // Users component under dashboard
      { path: 'add-custom-booking', component: AddEditCustomBookingComponent },
      { path: 'edit-custom-booking/:id', component: AddEditCustomBookingComponent },
      { path: 'enquiries', component: EnquiriesComponent }, // Users component under dashboard
      { path: 'assets-management', component: AssetsManagementComponent }, // Users component under dashboard
      { path: 'add-asset', component: AddEditAssetComponent },
      { path: 'edit-asset/:id', component: AddEditAssetComponent },
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
