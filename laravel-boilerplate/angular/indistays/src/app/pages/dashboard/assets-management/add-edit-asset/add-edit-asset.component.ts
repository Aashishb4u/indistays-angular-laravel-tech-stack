import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../services/storage.service";
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../../services/shared.service";

@Component({
  selector: 'app-add-edit-asset',
  templateUrl: './add-edit-asset.component.html',
  styleUrls: ['./add-edit-asset.component.scss']
})
export class AddEditAssetComponent implements OnInit{
  componentForm: FormGroup;
  assetId: any = null;
  formData: any = null;
  defaultBusinessImage: any = 'assets/images/asset_image.png';
  constructor(public fb: FormBuilder,
              public storageService: StorageService,
              public apiService: ApiService,
              public route: ActivatedRoute,
              public router: Router,
              public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.componentForm = this.fb.group({
      name: ['', Validators.required],
      asset_type: ['', Validators.required],
      image: [null],
      imageUrl: [''],
      imageBase64: [null]
    });

    this.assetId = this.route.snapshot.paramMap.get('id');
    if (this.assetId) {
      this.getAssetById();
    }
    this.imageUrlControl.setValue(this.defaultBusinessImage);
  }

  getAssetById() {
    const data = {
      assetId: this.assetId
    }
    this.sharedService.showSpinner.next(true);
    this.apiService.getAssetById(data).subscribe(
      res => this.getAssetByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getAssetByIdSuccess(res) {
    const responseData: any = res.data && res.data[0] ? res.data[0] : null;
    this.componentForm.get('name').setValue(responseData.name);
    this.componentForm.get('image').setValue(responseData.name);
  }

  async uploadFile(event) {
    let reader = new FileReader();
    let image = event.target.files[0];
    const campingName: any = this.componentForm.get('name').value;
    if (event.target.files && event.target.files[0]) {
      const fileSizeInMB = image.size / (1024 * 1024);
      if (fileSizeInMB > 10) {
        this.apiService.showToast('File size should not exceed 10 MB');
        return;
      }
      // this.sharedService.showSpinner.next(true);
      reader.readAsDataURL(image);
      reader.onload = (onLoadEvent) => {
        // image.name = `${campingName.toLowerCase()}-profile.png`;
        // Create a new File object with the updated name
        const updatedImage = new File([image], `${campingName.toLowerCase()}-${this.sharedService.generateRandomString()}.png`, { type: image.type });

        const base64 = onLoadEvent.target.result;
        this.imageFile.setValue(updatedImage);
        this.imageBase64.setValue(base64);
        // this.sharedService.compressFile(localUrl, fileName).then((compressedImage: any) => {
        //   const base64: string = compressedImage.base64;
        //   this.imageFile.setValue(compressedImage.imageFile);
        //   this.imageBase64.setValue(base64);
        // });
      }
    }
  }

  goGridPage() {
    this.router.navigate(['/dashboard/assets-management']);
  }

  get imageUrlControl() {
    return this.componentForm.get('imageUrl');
  }

  get imageFile() {
    return this.componentForm.get('image');
  }

  get imageBase64() {
    return this.componentForm.get('imageBase64');
  }

  userAction() {
    if (this.componentForm.valid) {
      this.sharedService.showSpinner.next(true);
      this.formData = new FormData();
      this.formData.append('name', this.componentForm.get('name').value);
      this.formData.append('asset_type', this.componentForm.get('asset_type').value);

      if(this.assetId) {
        if(!this.componentForm.get('profileImage').value) {
          this.formData.delete("image");
          this.formData.append('image_url', this.componentForm.get('imageUrl').value);
        } else {
          this.formData.delete("image_url");
          this.formData.append('image', this.componentForm.get('image').value);
        }

        this.apiService.updateAssetById(this.formData, this.assetId).subscribe(
          res => this.userActionSuccess(res),
          error => {
            this.apiService.commonError(error);
          }
        );
      } else {
        this.formData.append('image', this.componentForm.get('image').value)
        this.apiService.addAsset(this.formData).subscribe(
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
    this.router.navigate(['/dashboard/assets-management']);
  }

}
