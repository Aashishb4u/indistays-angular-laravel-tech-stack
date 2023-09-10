import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../services/storage.service";
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";
import {Editor, Toolbar} from "ngx-editor";

@Component({
  selector: 'app-add-edit-destination',
  templateUrl: './add-edit-destination.component.html',
  styleUrls: ['./add-edit-destination.component.scss']
})
export class AddEditDestinationComponent {
  componentForm: FormGroup;
  roles: any = [];
  destinationId: any = null;
  noImageIcon: any = 'assets/images/no-image.jpeg';
  destinationFormData: any;
  defaultBusinessImage: any = 'assets/images/destination_thumbnail.png';
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
              public sharedService: SharedService) {

  }

  ngOnInit() {
    this.editor = new Editor();
    this.destinationFormData = new FormData();
    this.getRoles();
    this.componentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      galleryImages:  this.fb.array([]),
      profileImage: [null],
      profileImageUrl: [''],
      profileImageBase64: [null],
      // Add more form controls as needed
    });
    this.destinationId = this.route.snapshot.paramMap.get('id');
    this.profileImageUrlControl.setValue(this.defaultBusinessImage);
    if (this.destinationId) {
      this.getDestinationById();
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
    const destinationName: any = this.componentForm.get('name').value;
    if (event.target.files && event.target.files[0]) {
      const fileSizeInMB = image.size / (1024 * 1024);
      if (fileSizeInMB > 35) {
        this.apiService.showToast('File size should not exceed 35 MB');
        return;
      }
      // this.sharedService.showSpinner.next(true);
      reader.readAsDataURL(image);
      reader.onload = (onLoadEvent) => {
        const fileName = `${destinationName.toLowerCase()}-profile.png`;
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

  getDestinationById() {
    const data = {
      destinationId: this.destinationId
    }
    this.apiService.getDestinationById(data).subscribe(
      res => this.getDestinationByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getDestinationByIdSuccess(res) {
    const responseData: any = res.data && res.data[0] ? res.data[0] : null;
    const profileImage: any = responseData.profile_image_url ?
      this.sharedService.generateImageUrl(responseData.profile_image_url) : null;

    const galleryImages: any = responseData.images && responseData.images.length > 0 ?
      responseData.images : [];
    if (profileImage) { this.componentForm.get('profileImageUrl').setValue(profileImage)}
    this.componentForm.get('name').setValue(responseData.name);
    this.componentForm.get('description').setValue(responseData.description);

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
      const galleryImagesArray: any = this.galleryImages.value;
      this.destinationFormData = new FormData();
      this.destinationFormData.append('name', this.componentForm.get('name').value)
      this.destinationFormData.append('description', this.componentForm.get('description').value)
      let galleryImagesStatus: any = [];
      this.destinationFormData.delete("images[]");

      if(this.destinationId) {

        if(!this.componentForm.get('profileImage').value) {
          this.destinationFormData.delete("profile_image");
          this.destinationFormData.append('profile_image_url', this.componentForm.get('profileImageUrl').value);
        } else {
          this.destinationFormData.delete("profile_image_url");
          this.destinationFormData.append('profile_image', this.componentForm.get('profileImage').value);
        }

        galleryImagesArray.forEach((val, index) => {
          if(val.imageFile) {
            this.destinationFormData.append('images[]', val.imageFile);
          }
          galleryImagesStatus.push(val.imageUrl ? 'pristine' : 'dirty');
        });
        this.destinationFormData.append('image_ids_to_update', JSON.stringify(galleryImagesStatus));

        this.apiService.updateDestinationById(this.destinationFormData, this.destinationId).subscribe(
          res => this.userActionSuccess(res),
          error => {
            this.apiService.commonError(error);
          }
        );
      } else {
        this.destinationFormData.append('profile_image', this.componentForm.get('profileImage').value)
        for (let j = 0; j < this.galleryImages.length; j++) {
          this.destinationFormData.append('images[]', this.galleryImages.value[j]['imageFile']);
        }
        this.apiService.addDestination(this.destinationFormData).subscribe(
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
    this.router.navigate(['/dashboard/destinations']);
  }

  goGridPage() {
    this.router.navigate(['/dashboard/destinations']);
  }

  get galleryImages() {
    return (this.componentForm.get('galleryImages') as FormArray);
  }

  portfolioImageAction(event, index) {
    let reader = new FileReader();
    let image = event.target.files[0];
    const destinationName: any = this.componentForm.get('name').value;
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
        const fileName = `${destinationName.toLowerCase()}-gallery-image-${index}.png`;
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
    const destinationName: any = this.componentForm.get('name').value;

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
        const fileName = `${destinationName.toLowerCase()}-gallery-image-${i}.png`;
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
            // this.destinationFormData.append('oldImages', JSON.stringify(oldImages));
            for (let j = 0; j < uploadImages.length; j++) {
              this.destinationFormData.append('files', uploadImages[j]);
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
