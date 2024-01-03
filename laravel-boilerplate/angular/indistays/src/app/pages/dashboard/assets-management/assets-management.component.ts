import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {DomSanitizer} from "@angular/platform-browser";
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {StorageService} from "../../../services/storage.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-assets-management',
  templateUrl: './assets-management.component.html',
  styleUrls: ['./assets-management.component.scss']
})
export class AssetsManagementComponent {
  searchForm: FormGroup;
  pageSize = 20;
  totalLength = 0;
  currentPage = 1;
  users: [];
  dataSource: any = [];
  mapSrc: any = '';
  imageFile: any = null;
  displayedColumns: string[] = ['name', 'mapLink', 'address', 'gallery', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sanitizer: DomSanitizer,
    public fb: FormBuilder, public sharedService: SharedService, public router: Router, public apiService: ApiService, public storageService: StorageService) {

  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
    this.getAssets();
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getAssets();
  }

  onSearch() {
    console.log(this.searchForm.value);
  }

  onAddAsset() {
    this.router.navigate(['/dashboard/add-asset']);
  }

  getAssets(nameFilter = '') {
    this.sharedService.showSpinner.next(true);
    let params = new HttpParams()
      .set('currentPage', this.currentPage.toString())
      .set('pageSize', this.pageSize.toString());
    if(nameFilter) {
      params = params.set('name', nameFilter);
    }
    this.apiService.getAssets(params).subscribe(
      res => this.getAssetsSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getAssetsSuccess(res) {
    const total = res.data.total;
    this.dataSource = res && res.data && res.data.data && res.data.data.length > 0 ?
      res.data.data.map((val) => {
        val.image_url = this.sharedService.generateImageUrl(val.image_url);
        return val;
      }) : [];
    console.log(this.dataSource, 'this.dataSource');
    this.totalLength = total;
    this.sharedService.showSpinner.next(false);
  }

  onEditUser(id) {
    this.router.navigate([`/dashboard/edit-camping/${id}`])
  }

  onDeleteUser(id) {
    const data = {
      title: 'Delete Asset',
      confirmLabel: 'Ok',
      message: 'Are you sure you want to delete Asset',

    }
    this.sharedService.openDialogPrompt(
      data.title,
      data.confirmLabel,
      data.message,
      this.onDeleteUserConfirmation.bind(this),
      id)
  }

  onDeleteUserConfirmation(data) {
    console.log(data);
    this.deleteAssetById(data.entityId);
  }

  deleteAssetById(id) {
    this.apiService.deleteAsset(id).subscribe(
      res => this.deleteAssetByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  deleteAssetByIdSuccess(res) {
    this.getAssets();
  }

  handleDebouncedKeyUp(event) {
    this.getAssets(event.target.value);
  }

  onChangeImage(event, singleImage) {
    let reader = new FileReader();
    let image = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const fileSizeInMB = image.size / (1024 * 1024);
      if (fileSizeInMB > 10) {
        this.apiService.showToast('File size should not exceed 10 MB');
        return;
      }
      reader.readAsDataURL(image);
      reader.onload = (onLoadEvent) => {
        this.imageFile = new File([image], `${singleImage.name.toLowerCase()}-${this.sharedService.generateRandomString()}.png`, { type: image.type });
        singleImage.image_url = onLoadEvent.target.result;
        let formData = new FormData();
        formData.append('name', singleImage.name);
        formData.append('asset_type', singleImage.asset_type);
        formData.append('image', this.imageFile);
        this.apiService.updateAssetById(formData, singleImage.id).subscribe(
          res => this.userActionSuccess(res),
          error => {
            this.apiService.commonError(error);
          }
        );
      }
    }
  }

  userActionSuccess(res) {
    this.currentPage = 1;
    this.dataSource = [];
    this.getAssets();
  }

  onRemoveConfirm(index) {

  }
}
