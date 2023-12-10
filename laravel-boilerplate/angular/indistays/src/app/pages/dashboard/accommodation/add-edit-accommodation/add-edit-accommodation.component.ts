import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Editor, Toolbar} from "ngx-editor";
import {StorageService} from "../../../../services/storage.service";
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-add-edit-accommodation',
  templateUrl: './add-edit-accommodation.component.html',
  styleUrls: ['./add-edit-accommodation.component.scss']
})
export class AddEditAccommodationComponent {
  componentForm: FormGroup;
  roles: any = [];
  camping: any = [];
  amenities: any = [];
  accommodationId: any = null;
  noImageIcon: any = 'assets/images/no-image.jpeg';
  campingFormData: any;
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
    this.campingFormData = new FormData();
    this.getRoles();
    this.getCampings();
    this.getAmenities();
    this.componentForm = this.fb.group({
      name: ['', Validators.required],
      camping: ['', Validators.required],
      beds: [0, Validators.required],
      amenities: [[], Validators.required],
      galleryImages:  this.fb.array([]),
      profileImage: [null],
      accommodation: [null],
      profileImageUrl: [''],
      profileImageBase64: [null],
      price: [0],
      weekend_price: [0],
      discount_price: [0],
      weekend_discount_price: [0]
      // Add more form controls as needed
    });
    this.accommodationId = this.route.snapshot.paramMap.get('id');
    this.profileImageUrlControl.setValue(this.defaultBusinessImage);
    if (this.accommodationId) {
      this.getAccommodationById();
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

  async uploadFile(event) {
    let reader = new FileReader();
    let image = event.target.files[0];
    const campingName: any = this.componentForm.get('name').value;
    if (event.target.files && event.target.files[0]) {
      const fileSizeInMB = image.size / (1024 * 1024);
      if (fileSizeInMB > 35) {
        this.apiService.showToast('File size should not exceed 35 MB');
        return;
      }
      // this.sharedService.showSpinner.next(true);
      reader.readAsDataURL(image);
      reader.onload = (onLoadEvent) => {
        const fileName = `${campingName.toLowerCase()}-profile.png`;
        const localUrl = onLoadEvent.target.result;
        this.sharedService.compressFile(localUrl, fileName).then((compressedImage: any) => {
          const base64: string = compressedImage.base64;
          this.profileImageFile.setValue(compressedImage.imageFile);
          this.profileImageBase64.setValue(base64);
        });
      }
    }
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

  getCampings() {
    this.apiService.getCampings({}).subscribe(
      res => this.getCampingsSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getCampingsSuccess(res) {
    this.camping = res.data.data;
  }

  getAmenities() {
    this.apiService.getAllAmenities({}).subscribe(
      res => this.getAmenitiesSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getAmenitiesSuccess(res) {
    this.amenities = res.data;
  }

  getAccommodationById() {
    this.sharedService.showSpinner.next(true);
    const data = {
      accommodationId: this.accommodationId
    }
    this.apiService.getAccommodationById(data).subscribe(
      res => this.getAccommodationByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getAccommodationByIdSuccess(res) {
    const responseData: any = res.data && res.data[0] ? res.data[0] : null;
    const profileImage: any = responseData.profile_image_url ?
      this.sharedService.generateImageUrl(responseData.profile_image_url) : null;

    const galleryImages: any = responseData.images && responseData.images.length > 0 ?
      responseData.images : [];
    if (profileImage) { this.componentForm.get('profileImageUrl').setValue(profileImage)}
    this.componentForm.get('name').setValue(responseData.name);
    const amenitiesArray = responseData.amenities.map(v => v.id);
    if(amenitiesArray && amenitiesArray.length) {
      this.componentForm.get('amenities').setValue(amenitiesArray);
    }
    this.componentForm.get('camping').setValue(responseData.camping.id);
    this.componentForm.get('price').setValue(responseData.price);
    this.componentForm.get('weekend_price').setValue(responseData.weekend_price);
    this.componentForm.get('beds').setValue(responseData.beds_available);
    this.componentForm.get('discount_price').setValue(responseData.discount_price);
    this.componentForm.get('weekend_discount_price').setValue(responseData.weekend_discount_price);

    this.clearGalleryImages();
    if (galleryImages) {
      galleryImages.forEach((val, index) => {
        this.galleryImages.push(this.fb.group({
          imageId: val.id,
          imageUrl: val.url,
          imageUrlOnUI: this.sharedService.generateImageUrl(val.url),
          imageFile: null,
          imageBase64: ''
        }))
      });
    }
    this.sharedService.showSpinner.next(false);
  }

  clearGalleryImages() {
    while (this.galleryImages.length !== 0) {
      this.galleryImages.removeAt(0)
    }
  }

  userAction() {
    if (this.componentForm.valid) {
      this.sharedService.showSpinner.next(true);
      const galleryImagesArray: any = this.galleryImages.value;
      let galleryImagesStatus: any = [];
      this.campingFormData = new FormData();
      this.campingFormData.append('name', this.componentForm.get('name').value)
      this.campingFormData.append('camping_id', this.componentForm.get('camping').value)
      this.campingFormData.append('amenity_ids', this.componentForm.get('amenities').value)
      this.campingFormData.append('beds_available', this.componentForm.get('beds').value);
      this.campingFormData.append('price', this.componentForm.get('price').value);
      this.campingFormData.append('weekend_price', this.componentForm.get('weekend_price').value);
      this.campingFormData.append('discount_price', this.componentForm.get('discount_price').value)
      this.campingFormData.append('weekend_discount_price', this.componentForm.get('weekend_discount_price').value)
      this.campingFormData.delete("images[]");
      if(this.accommodationId) {

        if(!this.componentForm.get('profileImage').value) {
          this.campingFormData.delete("profile_image");
          this.campingFormData.append('profile_image_url', this.componentForm.get('profileImageUrl').value);
        } else {
          this.campingFormData.delete("profile_image_url");
          this.campingFormData.append('profile_image', this.componentForm.get('profileImage').value);
        }

        galleryImagesArray.forEach((val, index) => {
          if(val.imageFile) {
            this.campingFormData.append('images[]', val.imageFile);
          }
          galleryImagesStatus.push(val.imageUrl ? 'pristine' : 'dirty');
        });
        this.campingFormData.append('image_ids_to_update', JSON.stringify(galleryImagesStatus));
        console.log(this.campingFormData);
        this.apiService.updateAccommodationById(this.campingFormData, this.accommodationId).subscribe(
          res => this.userActionSuccess(res),
          error => {
            this.apiService.commonError(error);
          }
        );
      } else {
        this.campingFormData.append('profile_image', this.componentForm.get('profileImage').value)
        for (let j = 0; j < this.galleryImages.length; j++) {
          this.campingFormData.append('images[]', this.galleryImages.value[j]['imageFile']);
        }
        this.apiService.addAccommodation(this.campingFormData).subscribe(
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
    this.router.navigate(['/dashboard/accommodation']);
  }

  goGridPage() {
    this.router.navigate(['/dashboard/accommodation']);
  }

  get galleryImages() {
    return (this.componentForm.get('galleryImages') as FormArray);
  }

  portfolioImageAction(event, index) {
    let reader = new FileReader();
    let image = event.target.files[0];
    const campingName: any = this.componentForm.get('name').value;
    if (event.target.files && event.target.files[0]) {
      const fileSizeInMB = image.size / (1024 * 1024);
      if (fileSizeInMB > 35) {
        this.apiService.showToast('File size should not exceed 35 MB');
        return;
      }
      if (this.galleryImages.controls.length >= 20) {
        this.apiService.showToast('Image Upload Limit Exceeded');
        return;
      }
      this.sharedService.showSpinner.next(true);
      reader.readAsDataURL(image);
      reader.onload = (onLoadEvent) => {
        this.galleryImages.controls[index].get('imageUrl').setValue('');
        this.galleryImages.controls[index].get('imageUrlOnUI').setValue('');
        const fileName = `${campingName.toLowerCase()}-gallery-image-${index}.png`;
        const localUrl = onLoadEvent.target.result;
        this.sharedService.compressFile(localUrl, fileName).then((compressedImage: any) => {
          const base64: string = compressedImage.base64;
          const imageFile: any = compressedImage.imageFile;
          if (index === this.galleryImages.controls.length) {
            this.galleryImages.push(this.fb.group({
              imageId: '',
              imageUrl: '',
              imageUrlOnUI: '',
              imageBase64: base64,
              imageFile: imageFile,
            })); // Add a new FormControl to the FormArray
          } else {
            this.galleryImages.controls[index].get('imageBase64').setValue(base64);
          }
          this.galleryImages.controls[index].get('imageFile').setValue(imageFile);
        });
      }
    }
  }


  onRemoveConfirm(i) {

  }

  portfolioMultipleImagesAction(event) {
    const MAX_IMAGES = 5;

    if (this.galleryImages.controls.length >= MAX_IMAGES) {
      this.apiService.showToast('Image Upload Limit Exceeded');
      return;
    }
    const selectedFiles = event.target.files;

    if (selectedFiles.length > MAX_IMAGES) {

      this.apiService.showToast('You can upload 5 images at once');
      return;
    }
    const campingName: any = this.componentForm.get('name').value;

    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    let imagesProcessed = 0; // Counter to track the number of processed images
    let uploadImages: any[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const image = selectedFiles[i];
      const reader = new FileReader();

      const fileSizeInMB = image.size / (1024 * 1024);
      if (fileSizeInMB > 35) {
        this.apiService.showToast('File size should not exceed 35 MB');
        return;
      }

      reader.readAsDataURL(image);
      reader.onload = (onLoadEvent) => {
        const imageIndex = this.galleryImages.controls.length + i;
        const fileName = `${campingName.toLowerCase()}-gallery-image-${i}.png`;
        const localUrl = onLoadEvent.target.result;
        this.sharedService.compressFile(localUrl, fileName).then((compressedImage: any) => {
          const base64: string = compressedImage.base64;
          const imageFile: any = compressedImage.imageFile;
          const oldImages = this.galleryImages.controls.map(v => v.get('imageUrl').value).filter( v => v != '');
          this.galleryImages.push(this.fb.group({
            imageUrl: '',
            imageUrlOnUI: '',
            imageBase64: base64,
            imageFile: imageFile,
          }));
          uploadImages.push(imageFile);
          imagesProcessed++;

          // Check if all images have been processed
          if (imagesProcessed === selectedFiles.length) {
            // this.campingFormData.append('oldImages', JSON.stringify(oldImages));
            for (let j = 0; j < uploadImages.length; j++) {
              this.campingFormData.append('files', uploadImages[j]);
            }
          }
        });
      }
    }
  }

  changeProfileImage(e) {
    console.log(e);
  }
}
