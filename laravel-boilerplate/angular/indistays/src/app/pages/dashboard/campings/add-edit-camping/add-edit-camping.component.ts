import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Editor, Toolbar} from "ngx-editor";
import {StorageService} from "../../../../services/storage.service";
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-add-edit-camping',
  templateUrl: './add-edit-camping.component.html',
  styleUrls: ['./add-edit-camping.component.scss']
})
export class AddEditCampingComponent {
  componentForm: FormGroup;
  roles: any = [];
  destinations: any = [];
  campingId: any = null;
  noImageIcon: any = 'assets/images/no-image.jpeg';
  campingFormData: any;
  mapSrc: SafeHtml;
  defaultBusinessImage: any = 'assets/images/camping_image_22.png';
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
    this.getDestinations();
    this.componentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      galleryImages:  this.fb.array([]),
      profileImage: [null],
      destination: [null],
      profileImageUrl: [''],
      address: ['', Validators.required],
      mapLink: ['', Validators.required],
      profileImageBase64: [null],
      // Add more form controls as needed
    });
    this.campingId = this.route.snapshot.paramMap.get('id');
    this.profileImageUrlControl.setValue(this.defaultBusinessImage);
    if (this.campingId) {
      this.getCampingById();
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

  getDestinations() {
    this.apiService.getAllDestinations().subscribe(
      res => this.getDestinationsSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getDestinationsSuccess(res) {
    this.destinations = res.data;
  }

  getCampingById() {
    const data = {
      campingId: this.campingId
    }
    this.apiService.getCampingById(data).subscribe(
      res => this.getCampingByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getCampingByIdSuccess(res) {
    const responseData: any = res.data && res.data[0] ? res.data[0] : null;
    const profileImage: any = responseData.profile_image_url ?
      this.sharedService.generateImageUrl(responseData.profile_image_url) : null;

    const galleryImages: any = responseData.images && responseData.images.length > 0 ?
      responseData.images : [];
    if (profileImage) { this.componentForm.get('profileImageUrl').setValue(profileImage)}
    this.componentForm.get('name').setValue(responseData.name);
    this.componentForm.get('description').setValue(responseData.description);
    this.componentForm.get('address').setValue(responseData.address);
    this.componentForm.get('destination').setValue(responseData.destination_id);
    this.mapSrc = this.sanitizer.bypassSecurityTrustHtml(responseData.location_map_link);
    this.componentForm.get('mapLink').setValue(responseData.location_map_link);

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
  }

  clearGalleryImages() {
    while (this.galleryImages.length !== 0) {
      this.galleryImages.removeAt(0)
    }
  }

  userAction() {
    if (this.componentForm.valid) {
      console.log(this.componentForm.value);
      const galleryImagesArray: any = this.galleryImages.value;
      let galleryImagesStatus: any = [];
      this.campingFormData = new FormData();
      this.campingFormData.append('name', this.componentForm.get('name').value)
      this.campingFormData.append('description', this.componentForm.get('description').value)
      this.campingFormData.append('location_map_link', this.componentForm.get('mapLink').value)
      this.campingFormData.append('address', this.componentForm.get('address').value)
      this.campingFormData.append('destination_id', this.componentForm.get('destination').value)
      this.campingFormData.delete("images[]");

      if(this.campingId) {

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

        this.apiService.updateCampingById(this.campingFormData, this.campingId).subscribe(
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
        this.apiService.addCamping(this.campingFormData).subscribe(
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
    this.router.navigate(['/dashboard/camping']);
  }

  goGridPage() {
    this.router.navigate(['/dashboard/camping']);
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
