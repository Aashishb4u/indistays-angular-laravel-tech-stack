import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {StorageService} from "../../../services/storage.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent {
  searchForm: FormGroup;
  pageSize = 20;
  totalLength = 0;
  currentPage = 1;
  users: [];
  dataSource: any = [];
  displayedColumns: string[] = ['name', 'description', 'gallery', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public fb: FormBuilder, public sharedService: SharedService, public router: Router, public apiService: ApiService, public storageService: StorageService) {

  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
    this.getAccommodations();
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getAccommodations();
  }

  onSearch() {
    console.log(this.searchForm.value);
  }

  onAddAccommodation() {
    this.router.navigate(['/dashboard/add-accommodation']);
  }

  getAccommodations(nameFilter = '') {
    let params = new HttpParams()
      .set('currentPage', this.currentPage.toString())
      .set('pageSize', this.pageSize.toString());
    if(nameFilter) {
      params = params.set('name', nameFilter);
    }
    this.apiService.getAccommodations(params).subscribe(
      res => this.getAccommodationsSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getAccommodationsSuccess(res) {
    const total = res.data.total;
    this.dataSource = res && res.data && res.data.data && res.data.data.length > 0 ?
      res.data.data.map((val) => {
        val.profile_image_url = this.sharedService.generateImageUrl(val.profile_image_url);
        val.images = val.images.map((img) => {
          img.url = this.sharedService.generateImageUrl(img.url);
          return img;
        })
        return val;
      }) : [];
    this.totalLength = total;
  }

  onEditUser(id) {
    this.router.navigate([`/dashboard/edit-accommodation/${id}`])
  }

  onDeleteUser(id) {
    const data = {
      title: 'Delete Destination',
      confirmLabel: 'Ok',
      message: 'Are you sure you want to delete Destination',

    }
    this.sharedService.openDialogPrompt(
      data.title,
      data.confirmLabel,
      data.message,
      this.onDeleteUserConfirmation.bind(this),
      id)
  }

  onDeleteUserConfirmation(data) {
    this.deleteDestinationById(data.entityId);
  }

  deleteDestinationById(id) {
    this.apiService.deleteDestination(id).subscribe(
      res => this.deleteDestinationByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  deleteDestinationByIdSuccess(res) {
    this.getAccommodations();
  }

  handleDebouncedKeyUp(event) {
    this.getAccommodations(event.target.value);
  }
}
