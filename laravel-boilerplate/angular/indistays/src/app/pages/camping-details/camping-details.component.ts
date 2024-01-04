import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions} from "@kolkov/ngx-gallery";
import {ApiService} from "../../services/api.service";
import {SharedService} from "../../services/shared.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-camping-details',
  templateUrl: './camping-details.component.html',
  styleUrls: ['./camping-details.component.scss']
})
export class CampingDetailsComponent implements OnInit{
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  campingId: any = null;
  amenities: any = [];
  campings: any = [];
  campingBanners: any = [];
  campAccommodations: any = [];
  summaryData: any = [];
  totalSum: any = 0;
  showSpinner: any = true;
  isWeekend: any = false;
  campingDetails: any = null;
  customerReview: any = null;
  mapSrc: SafeHtml;
  selectedAcc = [];
  accommodations = [];
  userForm: FormGroup;
  dateRangeForm: FormGroup;
  reviewForm: FormGroup;

  @ViewChild('summaryElem', { static: false }) summaryElem: ElementRef;
  constructor(public storageService: StorageService, public fb: FormBuilder, private sanitizer: DomSanitizer, public sharedService: SharedService,
              public apiService: ApiService, public route: ActivatedRoute) {
  }

  submitReview() {
    if (this.reviewForm.invalid) {
      this.sharedService.showToast('Please fill mandatory fields');
      this.reviewForm.markAllAsTouched();
      return;
    }
    this.apiService.makeReview(this.reviewForm.value).subscribe((res) => {
     this.sharedService.showToast('Review Added');
     this.reviewForm.reset();
     this.reviewForm.get('camping_id').setValue(this.campingId);
    });
  }

  userAction() {
    this.toggleModal('makeBooking');

    if (this.dateRangeForm.invalid) {
      this.apiService.showToast('Please select Date Range');
      this.dateRangeForm.markAllAsTouched();
      this.toggleModal('makeBooking');
      return;
    }

    if (this.userForm.invalid) {
      this.apiService.showToast('Please select User Details');
      this.userForm.markAllAsTouched();
      this.toggleModal('makeBooking');
      return;
    }

    this.sharedService.showSpinner.next(true);
    const dateRangeVal = this.dateRangeForm.value;
    const userDataVal = this.userForm.value;
    const data = [...this.summaryData].map((res) => {
      return {
        beds: res.booking,
        booking_price: +res.discount_price,
        start_date: dateRangeVal.start_date,
        end_date: dateRangeVal.end_date,
        name: userDataVal.name,
        email: userDataVal.email,
        contact_number: userDataVal.contact_number,
        accommodation_id: res.id
      }
    });
    this.apiService.makeBooking(data).subscribe((res) => {
      this.apiService.showToast("Your Camping Booked Successfully");
      this.sharedService.showSpinner.next(false);
      this.toggleModal('makeBooking');
      this.toggleModal('confirmBooking');
    });
  }

  checkIfWeekend() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    this.isWeekend = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;
  }

  goSummary() {
    this.summaryElem.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  toggleModal(id) {
    const modal = document.getElementById(id);
    const backdrop = document.querySelector('.modal-backdrop');

    if (modal) {
      if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      } else {
        modal.classList.add('show');
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
      }
    }

    if (backdrop) {
      backdrop.remove();
    } else if (modal && modal.classList.contains('show')) {
      const newBackdrop = document.createElement('div');
      newBackdrop.classList.add('modal-backdrop', 'fade', 'show');
      document.body.appendChild(newBackdrop);
    }
  }


  ngOnInit() {
    this.sharedService.showBackIcon.next(true);
    this.checkIfWeekend();
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      contact_number: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[0-9]{10}$/)]],
    });
    this.dateRangeForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
    this.reviewForm = this.fb.group({
      camping_id: ['', Validators.required],
      review: ['', Validators.required],
      ratings: [0, Validators.required],
    });
    this.getAmenities();
    const startDate = this.storageService.getStorageValue('start_date');
    const endDate = this.storageService.getStorageValue('end_date');

    if(startDate) {
      this.dateRangeForm.get('start_date').setValue(new Date(startDate));
    }

    if(endDate) {
      this.dateRangeForm.get('end_date').setValue(new Date(endDate));
    }

    this.galleryOptions = [
      {
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        thumbnailSize: NgxGalleryImageSize.Cover,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right'
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 100,
        thumbnailsPercent: 20,
        thumbnailsMargin: 10,
        thumbnailMargin: 10
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: true
      }
    ];
    this.route.params.subscribe((params: any) => {
      // Get the 'id' parameter from the route
      this.campingId = +params['id'];
      this.reviewForm.get('camping_id').setValue(this.campingId);
      this.fetchData();
    });
  }

  updateRating(e) {
    this.reviewForm.get('ratings').setValue(e);
  }

  fetchData() {
    this.apiService.getDataStream().then((res) => {
      this.apiService.dataStream.subscribe((val) => {
        this.campings = [...val.camping].map((val) => {
          return {
            ...val,
            name: val.name,
            img: this.sharedService.generateImageUrl(val.profile_image_url)
          }
        });
        this.accommodations = [...val.accommodations].map((val) => {
          return {
            ...val,
            loaded: false,
            url: `/camping-details/${val.camping_id}`,
            img: this.sharedService.generateImageUrl(val.profile_image_url)
          }
        }).splice(0, 3);
        this.campingDetails = this.campings.find(v => v.id === +this.campingId);
        if(this.campingDetails.customer_reviews && this.campingDetails.customer_reviews.length > 0) {
          const sum = this.campingDetails.customer_reviews
            .map(v => +v.ratings)
            .reduce((acc, num) => acc + num, 0);
          this.customerReview = sum / this.campingDetails.customer_reviews.length;
        }
        // this.accommodationDetails = this.campingDetails.
        this.campAccommodations = this.campingDetails.accommodations ?
          [...this.campingDetails.accommodations].map((camp: any) => {

            // Handling weekend scenario
            if (this.isWeekend && camp.filter_custom_pricing.length === 0) {
              camp.price = +camp.weekend_price ? camp.weekend_price : camp.price;
              camp.discount_price = +camp.weekend_discount_price ? camp.weekend_discount_price : camp.discount_price;
            } else if (camp.filter_custom_pricing.length > 0) {
              // Handling custom Pricing scenario
              const customPrice = camp.filter_custom_pricing[0];
              camp.price = customPrice.price;
              camp.discount_price = customPrice.discount_price;
            }

            return {
              ...camp,
              booking: 0,
              img: this.sharedService.generateImageUrl(camp.profile_image_url)
            }
          }) : this.campAccommodations;


        const people = this.storageService.getStorageValue('people');
        if(people && this.campAccommodations && this.campAccommodations.length > 0) {
          for(let i=0; i < +people; i++) {
            this.summaryData = [];
            this.totalSum = 0;
            this.onAddition(this.campAccommodations[0]);
          }
          this.campAccommodations[0].booking = +people;
          this.calculate();
        }

        this.amenities = this.campAccommodations.reduce((a, b) => {
          a = a.concat(b.amenities);
          return a
        }, []);

        if(this.amenities && this.amenities.length > 0) {
          this.amenities = this.sharedService.removeDuplicates(this.amenities, 'name');
        }

        this.mapSrc = this.sanitizer.bypassSecurityTrustHtml(this.campingDetails.location_map_link);
        this.galleryImages = this.campingDetails.images.map((img) => {
          const url = this.sharedService.generateImageUrl(img.url);
          return {
            url: url,
            small: url,
            big: url,
            medium: url,
          }
        });
        this.showSpinner = false;
      })
    });
  }

  isTodayInRange(startDate: Date, endDate: Date): boolean {
    const today = new Date();
    return startDate <= today && today <= endDate;
  }

  getAmenities() {
    this.apiService.getAllAmenities().subscribe((res: any) => {
      this.amenities = [...res.data].slice(5);
    });
  }

  calculate() {
    this.totalSum = this.summaryData.reduce((sum, item) => sum + (+item.discount_price * item.booking), 0);
  }

  onSubtraction(acc) {
    acc.booking = acc.booking > 0 ? acc.booking - 1 : acc.booking;
    if(acc.booking === 0) {
      this.summaryData = this.summaryData.filter(v => v.id !== acc.id);
    }
    this.calculate();
  }

  updateCart(booking) {
    this.summaryData = this.summaryData.filter(v => v.id !== booking.id);
  }

  isBookingInCart(acc) {
    return this.summaryData.find(v => v.id === acc.id);
  }

  onAddition(acc) {
    if (this.summaryData.length === 0 || this.summaryData.every((booking) => booking.id !== acc.id)) {
      acc.booking = 1;
      this.summaryData.push(acc);
    } else {
      this.summaryData = this.summaryData.map((sum) => {
        if (sum.id === acc.id) {
          sum.booking += 1;
        }
        return sum;
      });
    }
    this.calculate();
  }
}
