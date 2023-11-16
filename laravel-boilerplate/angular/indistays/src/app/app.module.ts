import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingComponent } from './pages/landing/landing.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDialogModule} from "@angular/material/dialog";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpTokenInterceptorsService} from "./authentication/http-token-interceptors.service";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppHeaderComponent } from './shared-components/app-header/app-header.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { AddEditUsersComponent } from './pages/dashboard/users/add-edit-users/add-edit-users.component';
import { ConfirmationPopupComponent } from './shared-components/confirmation-popup/confirmation-popup.component';
import { DebounceKeyUpDirective } from './custom-directives/debounce-key-up.directive';
import { AbstractDebounceDirective } from './custom-directives/abstract-debounce.directive';
import { DestinationsComponent } from './pages/dashboard/destinations/destinations.component';
import { AddEditDestinationComponent } from './pages/dashboard/destinations/add-edit-destination/add-edit-destination.component';
import {NgxImageCompressService} from "ngx-image-compress";
import {NgxEditorModule} from "ngx-editor";
import {CampingsComponent} from "./pages/dashboard/campings/campings.component";
import {AddEditCampingComponent} from "./pages/dashboard/campings/add-edit-camping/add-edit-camping.component";
import { AccommodationComponent } from './pages/dashboard/accommodation/accommodation.component';
import {AddEditAccommodationComponent} from "./pages/dashboard/accommodation/add-edit-accommodation/add-edit-accommodation.component";
import {GoogleMapsModule} from "@angular/google-maps";
import { CustomPricingComponent } from './pages/dashboard/custom-pricing/custom-pricing.component';
import { AddEditCustomPricingComponent } from './pages/dashboard/custom-pricing/add-edit-custom-pricing/add-edit-custom-pricing.component';
import { CustomBookingsComponent } from './pages/dashboard/custom-bookings/custom-bookings.component';
import { AddEditCustomBookingComponent } from './pages/dashboard/custom-bookings/add-edit-custom-booking/add-edit-custom-booking.component';
// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from './shared-components/footer/footer.component';
import { SectionHeaderComponent } from './shared-components/section-header/section-header.component';
import { StickerContentCardsComponent } from './shared-components/sticker-content-cards/sticker-content-cards.component';
import { ImageTilesComponent } from './shared-components/image-tiles/image-tiles.component';
import { PriceUiCardsComponent } from './shared-components/price-ui-cards/price-ui-cards.component';
import { TestimonialCardsComponent } from './shared-components/testimonial-cards/testimonial-cards.component';
import { DestinationDetailsComponent } from './pages/destination-details/destination-details.component';
import { ListingUiCardComponent } from './shared-components/listing-ui-card/listing-ui-card.component';
import { CampingDetailsComponent } from './pages/camping-details/camping-details.component';
import {NgxGalleryModule} from "@kolkov/ngx-gallery";
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import {DestinationsListingComponent} from "./pages/destinations/destinations.component";
import {CampingsListingComponent} from "./pages/campings/campings.component";
import { AboutUsComponent } from './pages/about-us/about-us.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LandingComponent,
    NotFoundComponent,
    AppHeaderComponent,
    ChangePasswordComponent,
    UsersComponent,
    AddEditUsersComponent,
    ConfirmationPopupComponent,
    DebounceKeyUpDirective,
    DestinationsComponent,
    DestinationsListingComponent,
    AddEditDestinationComponent,
    CampingsComponent,
    AddEditCampingComponent,
    AccommodationComponent,
    AddEditAccommodationComponent,
    CustomPricingComponent,
    AddEditCustomPricingComponent,
    CustomBookingsComponent,
    AddEditCustomBookingComponent,
    FooterComponent,
    SectionHeaderComponent,
    StickerContentCardsComponent,
    ImageTilesComponent,
    PriceUiCardsComponent,
    TestimonialCardsComponent,
    DestinationDetailsComponent,
    ListingUiCardComponent,
    CampingDetailsComponent,
    ContactUsComponent,
    CampingsListingComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxEditorModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    MatMenuModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTabsModule, // SwiperModule
    ReactiveFormsModule,
    NgbModule,
    GoogleMapsModule,
    NgbCarouselModule,
    SlickCarouselModule,
    NgxGalleryModule,
    NgxSkeletonLoaderModule.forRoot()
  ],
  providers: [
    NgxImageCompressService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptorsService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
