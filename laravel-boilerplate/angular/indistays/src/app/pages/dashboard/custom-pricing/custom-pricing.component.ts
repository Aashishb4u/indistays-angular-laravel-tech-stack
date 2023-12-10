import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {StorageService} from "../../../services/storage.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-custom-pricing',
  templateUrl: './custom-pricing.component.html',
  styleUrls: ['./custom-pricing.component.scss']
})
export class CustomPricingComponent {
  searchForm: FormGroup;
  pageSize = 20;
  totalLength = 0;
  currentPage = 1;
  users: [];
  dataSource: any = [];
  displayedColumns: string[] = ['accommodation_name', 'start_date', 'end_date', 'actual_price', 'price', 'actual_discount_price', 'discount_price', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public fb: FormBuilder, public sharedService: SharedService, public router: Router, public apiService: ApiService, public storageService: StorageService) {

  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
    this.getCustomPricings();
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getCustomPricings();
  }

  onSearch() {
    console.log(this.searchForm.value);
  }

  onAddCustomPricing() {
    this.router.navigate(['/dashboard/add-custom-pricing']);
  }

  getCustomPricings(nameFilter = '') {
    let params = new HttpParams()
      .set('currentPage', this.currentPage.toString())
      .set('pageSize', this.pageSize.toString());
    if(nameFilter) {
      params = params.set('name', nameFilter);
    }
    this.apiService.getCustomPricings(params).subscribe(
      res => this.getCustomPricingsSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getCustomPricingsSuccess(res) {
    this.totalLength = res.data.total;
    this.dataSource = res.data.data;
    if(this.dataSource && this.dataSource.length) {
      this.dataSource = this.dataSource.map((val) => {
        return {
          actual_price: val.accommodation.price,
          actual_discount_price: val.accommodation.discount_price,
          accommodation_img: this.sharedService.generateImageUrl(val.accommodation.profile_image_url),
          accommodation_name: val.accommodation.name,
          camping_name: `${val.accommodation.camping.name}, ${val.accommodation.camping.destination.name}`,
          price: val.price,
          discount_price: val.discount_price,
          start_date: val.start_date,
          end_date: val.end_date,
          id: val.id
        }
      })
    }
  }

  onEditUser(id) {
    this.router.navigate([`/dashboard/edit-custom-pricing/${id}`])
  }

  onDeleteUser(id) {
    const data = {
      title: 'Delete Custom Pricing',
      confirmLabel: 'Ok',
      message: 'Are you sure you want to delete Custom Pricing',
    }

    this.sharedService.openDialogPrompt(
      data.title,
      data.confirmLabel,
      data.message,
      this.onDeleteUserConfirmation.bind(this),
      id);
  }

  onDeleteUserConfirmation(data) {
    this.deleteDestinationById(data.entityId);
  }

  deleteDestinationById(id) {
    this.apiService.deleteCustomPricing(id).subscribe(
      res => this.deleteCustomPricingByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  deleteCustomPricingByIdSuccess(res) {
    this.getCustomPricings();
  }

  handleDebouncedKeyUp(event) {
    this.getCustomPricings(event.target.value);
  }
}
