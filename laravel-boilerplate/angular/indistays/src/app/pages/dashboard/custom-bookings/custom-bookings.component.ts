import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {StorageService} from "../../../services/storage.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-custom-bookings',
  templateUrl: './custom-bookings.component.html',
  styleUrls: ['./custom-bookings.component.scss']
})
export class CustomBookingsComponent {
  searchForm: FormGroup;
  pageSize = 20;
  totalLength = 0;
  currentPage = 1;
  users: [];
  dataSource: any = [];
  displayedColumns: string[] = ['accommodation_name', 'camping_name', 'beds', 'actual_price', 'booking_price', 'start_date', 'end_date', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public fb: FormBuilder, public sharedService: SharedService, public router: Router, public apiService: ApiService, public storageService: StorageService) {

  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
    this.getCustomBookings();
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getCustomBookings();
  }

  onSearch() {
    console.log(this.searchForm.value);
  }

  onAddCustomBooking() {
    this.router.navigate(['/dashboard/add-custom-booking']);
  }

  getCustomBookings(nameFilter = '') {
    let params = new HttpParams()
      .set('currentPage', this.currentPage.toString())
      .set('pageSize', this.pageSize.toString());
    if(nameFilter) {
      params = params.set('name', nameFilter);
    }
    this.apiService.getCustomBookings(params).subscribe(
      res => this.getCustomBookingsSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getCustomBookingsSuccess(res) {
    this.totalLength = res.data.total;
    this.dataSource = res.data.data;
    if(this.dataSource && this.dataSource.length) {
      this.dataSource = this.dataSource.map((val) => {
        return {
          booking_price: val.booking_price,
          actual_price: val.accommodation.discount_price,
          beds: val.beds,
          accommodation_img: this.sharedService.generateImageUrl(val.accommodation.profile_image_url),
          accommodation_name: val.accommodation.name,
          camping_name: `${val.accommodation.camping.name}, ${val.accommodation.camping.destination.name}`,
          start_date: val.start_date,
          end_date: val.end_date,
          id: val.id
        }
      })
    }
  }

  onEditUser(id) {
    this.router.navigate([`/dashboard/edit-custom-booking/${id}`])
  }

  onDeleteUser(id) {
    const data = {
      title: 'Delete Custom Booking',
      confirmLabel: 'Ok',
      message: 'Are you sure you want to delete Custom Booking',
    }

    this.sharedService.openDialogPrompt(
      data.title,
      data.confirmLabel,
      data.message,
      this.onDeleteUserConfirmation.bind(this),
      id);
  }

  onDeleteUserConfirmation(data) {
    this.deleteById(data.entityId);
  }

  deleteById(id) {
    this.apiService.deleteCustomBooking(id).subscribe(
      res => this.deleteCustomBookingByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  deleteCustomBookingByIdSuccess(res) {
    this.getCustomBookings();
  }

  handleDebouncedKeyUp(event) {
    this.getCustomBookings(event.target.value);
  }
}
