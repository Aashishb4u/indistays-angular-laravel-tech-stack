import {Component, OnInit} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions} from "@kolkov/ngx-gallery";
import {ApiService} from "../../services/api.service";
import {SharedService} from "../../services/shared.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
  campingDetails: any = null;
  mapSrc: SafeHtml;
  selectedAcc = [];
  accommodations = [];
  constructor(private sanitizer: DomSanitizer, public sharedService: SharedService, public apiService: ApiService, public route: ActivatedRoute) {
    this.campingId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
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
        console.log(this.accommodations);
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
