import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Editor, Toolbar} from "ngx-editor";
import {StorageService} from "../../../../services/storage.service";
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-add-edit-custom-booking',
  templateUrl: './add-edit-custom-booking.component.html',
  styleUrls: ['./add-edit-custom-booking.component.scss']
})
export class AddEditCustomBookingComponent {
  componentForm: FormGroup;
  roles: any = [];
  camping: any = [];
  accommodations: any = [];
  customPricingId: any = null;
  noImageIcon: any = 'assets/images/no-image.jpeg';
  mapSrc: SafeHtml;
  defaultBusinessImage: any = 'assets/images/accommodation_thumbnail.png';
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(public fb: FormBuilder,
              public storageService: StorageService,
              public apiService: ApiService,
              public route: ActivatedRoute,
              public router: Router,
              private sanitizer: DomSanitizer,
              public sharedService: SharedService) {

  }

  ngOnInit() {
    this.editor = new Editor();
    this.getRoles();
    this.getAccommodations();
    // this.getCampings();
    // this.getDestinations();
    this.componentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contact_number: ['', Validators.required],
      accommodation_id: ['', Validators.required],
      start_date: [Date.now(), Validators.required],
      end_date: [Date.now(), Validators.required],
      booking_price: [0],
      beds_available: [0],
      beds: [0],
      camping: [{ value: '', disabled: true }],
    });

    this.componentForm.get('accommodation_id').valueChanges.subscribe((val) => {
      const accommodation = this.accommodations.find(v => v.id === val);
      const camping = accommodation.camping.name;
      const destination = accommodation.camping.destination.name;
      this.componentForm.get('booking_price').setValue(accommodation.discount_price);
      this.componentForm.get('camping').setValue(`${camping}, ${destination}`);
      this.componentForm.get('beds_available').setValue(+accommodation.beds_available);
    });

    this.componentForm.get('beds').valueChanges.subscribe((val) => {
      if (!this.componentForm.get('accommodation_id').value) {
        this.componentForm.get('accommodation_id').markAsDirty();
        return;
      }

      const bookingBeds = this.componentForm.get('beds').value;
      const availableBeds = this.componentForm.get('beds_available').value;

      if (availableBeds < bookingBeds) {
        this.componentForm.get('beds').setErrors({ 'invalid': true });
      } else {
        this.componentForm.get('beds').setErrors(null);
      }
    });

    this.customPricingId = this.route.snapshot.paramMap.get('id');
    if (this.customPricingId) {
      this.getCustomBookingById();
    }
  }

  get profileImageUrlControl() {
    return this.componentForm.get('profileImageUrl');
  }

  get profileImageFile() {
    return this.componentForm.get('profileImage');
  }

  get profileImageBase64() {
    return this.componentForm.get('profileImageBase64');
  }

  getRoles() {
    this.apiService.getRoles().subscribe(
      res => this.getRolesSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getRolesSuccess(res) {
    this.roles = res;
    this.storageService.storeValue('roles', JSON.stringify(this.roles));
  }

  getAccommodations() {
    this.apiService.getAllAccommodation().subscribe(
      res => this.getAccommodationsSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getAccommodationsSuccess(res) {
    this.accommodations = res.data;
  }

  getCustomBookingById() {
    this.sharedService.showSpinner.next(true);
    const data = {
      customPricingId: this.customPricingId
    }
    this.apiService.getCustomBookingById(data).subscribe(
      res => this.getCustomBookingByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getCustomBookingByIdSuccess(res) {
    const responseData: any = res.data && res.data[0] ? res.data[0] : null;
    if(responseData) {
      this.componentForm.get('accommodation_id').setValue(responseData.accommodation_id);
      this.componentForm.get('start_date').setValue(responseData.start_date);
      this.componentForm.get('end_date').setValue(responseData.end_date);
      this.componentForm.get('booking_price').setValue(+responseData.booking_price);
      this.componentForm.get('beds').setValue(+responseData.beds);
      this.componentForm.get('beds_available').setValue(responseData.beds_available);
      this.componentForm.get('name').setValue(responseData.name);
      this.componentForm.get('email').setValue(responseData.email);
      this.componentForm.get('contact_number').setValue(responseData.contact_number);
    }
    this.sharedService.showSpinner.next(false);
  }

  userAction() {
    if (this.componentForm.valid) {
      this.sharedService.showSpinner.next(true);
      if(this.customPricingId) {
        this.apiService.updateCustomBookingById(this.componentForm.value, this.customPricingId).subscribe(
          res => this.userActionSuccess(res),
          error => {
            this.apiService.commonError(error);
          }
        );
      } else {
        this.apiService.addCustomBooking(this.componentForm.value).subscribe(
          res => this.userActionSuccess(res),
          error => {
            this.apiService.commonError(error);
          }
        );
      }
    } else {
      this.componentForm.markAllAsTouched();
      this.apiService.showToast('Please select mandatory fields');
    }
  }

  userActionSuccess(res) {
    this.sharedService.showSpinner.next(false);
    this.apiService.showToast(res.message);
    this.router.navigate(['/dashboard/custom-booking']);
  }

  goGridPage() {
    this.router.navigate(['/dashboard/custom-booking']);
  }

  onRemoveConfirm(i) {

  }


  changeProfileImage(e) {
    console.log(e);
  }
}
