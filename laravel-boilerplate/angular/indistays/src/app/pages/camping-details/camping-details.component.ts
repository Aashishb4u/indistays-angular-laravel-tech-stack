import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions} from "@kolkov/ngx-gallery";
import {ApiService} from "../../services/api.service";
import {SharedService} from "../../services/shared.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";

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
  campingDetails: any = null;
  mapSrc: SafeHtml;
  selectedAcc = [];
  accommodations = [];
  userForm: FormGroup;
  dateRangeForm: FormGroup;
  constructor(public fb: FormBuilder, private sanitizer: DomSanitizer, public sharedService: SharedService,
              public apiService: ApiService, public route: ActivatedRoute) {
    this.campingId = this.route.snapshot.paramMap.get('id');
  }

  userAction() {
    if (this.dateRangeForm.invalid) {
      this.apiService.showToast('Please select Date Range');
      this.dateRangeForm.markAllAsTouched();
      this.toggleModal();
      return;
    }

    if (this.userForm.invalid) {
      this.apiService.showToast('Please select User Details');
      this.userForm.markAllAsTouched();
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
      this.toggleModal();
    });
  }

  toggleModal() {
    const modal = document.getElementById('makeBooking');
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
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      contact_number: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[0-9]{10}$/)]],
    });

    this.dateRangeForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
    this.getAmenities();
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
            img: this.sharedService.generateImageUrl(val.profile_image_url)
          }
        });
        this.campingDetails = this.campings.find(v => v.id === +this.campingId);
        // this.accommodationDetails = this.campingDetails.
        this.campAccommodations = this.campingDetails.accommodations ?
          [...this.campingDetails.accommodations].map((camp) => {
            return {
              ...camp,
              booking: 0,
              img: this.sharedService.generateImageUrl(camp.profile_image_url)
            }
          }) : this.campAccommodations;
        this.amenities = this.campAccommodations.reduce((a, b) => {
          a = a.concat(b.amenities);
          return a
        }, []);
        console.log(JSON.stringify(this.accommodations));
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

  getAmenities() {
    this.apiService.getAllAmenities().subscribe((res: any) => {
      this.amenities = res.data.slice(5);
    });
  }

  calculate() {
    this.totalSum = this.summaryData.reduce((sum, item) => sum + (+item.discount_price * item.booking), 0);
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
