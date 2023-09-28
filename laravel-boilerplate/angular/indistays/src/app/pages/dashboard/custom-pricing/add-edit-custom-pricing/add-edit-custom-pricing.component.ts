import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Editor, Toolbar} from "ngx-editor";
import {StorageService} from "../../../../services/storage.service";
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-add-edit-custom-pricing',
  templateUrl: './add-edit-custom-pricing.component.html',
  styleUrls: ['./add-edit-custom-pricing.component.scss']
})
export class AddEditCustomPricingComponent {
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
      accommodation_id: [''],
      start_date: [Date.now(), Validators.required],
      end_date: [Date.now(), Validators.required],
      actual_price: [0],
      actual_discount_price: [0],
      price: [0],
      camping: [{ value: '', disabled: true }],
      discount_price: [0]
    });

    this.componentForm.get('accommodation_id').valueChanges.subscribe((val) => {
       const accommodation = this.accommodations.find(v => v.id === val);
       const camping = accommodation.camping.name;
       const destination = accommodation.camping.destination.name;
      this.componentForm.get('actual_price').setValue(accommodation.price);
      this.componentForm.get('actual_discount_price').setValue(accommodation.discount_price);
      this.componentForm.get('camping').setValue(`${camping}, ${destination}`);
    });

    this.componentForm.get('actual_price').disable();
    this.componentForm.get('actual_discount_price').disable();

    this.customPricingId = this.route.snapshot.paramMap.get('id');
    if (this.customPricingId) {
      this.getCustomPricingById();
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

   getCustomPricingById() {
    const data = {
      customPricingId: this.customPricingId
    }
    this.apiService.getCustomPricingById(data).subscribe(
      res => this.getCustomPricingByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getCustomPricingByIdSuccess(res) {
    const responseData: any = res.data && res.data[0] ? res.data[0] : null;
    if(responseData) {
      this.componentForm.get('accommodation_id').setValue(responseData.accommodation_id);
      this.componentForm.get('start_date').setValue(responseData.start_date);
      this.componentForm.get('end_date').setValue(responseData.end_date);
      this.componentForm.get('price').setValue(responseData.price);
      this.componentForm.get('discount_price').setValue(responseData.discount_price);
      this.componentForm.get('actual_price').setValue(responseData.accommodation.price);
      this.componentForm.get('actual_discount_price').setValue(responseData.accommodation.discount_price);
    }
  }

  userAction() {
    if (this.componentForm.valid) {
      if(this.customPricingId) {
        this.apiService.updateCustomPricingById(this.componentForm.value, this.customPricingId).subscribe(
          res => this.userActionSuccess(res),
          error => {
            this.apiService.commonError(error);
          }
        );
      } else {
        this.apiService.addCustomPricing(this.componentForm.value).subscribe(
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
    this.apiService.showToast(res.message);
    this.router.navigate(['/dashboard/custom-pricing']);
  }

  goGridPage() {
    this.router.navigate(['/dashboard/custom-pricing']);
  }

  onRemoveConfirm(i) {

  }


  changeProfileImage(e) {
    console.log(e);
  }
}
