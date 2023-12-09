import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared.service";
import {Router} from "@angular/router";
import * as moment from "moment";
import {StorageService} from "../../services/storage.service";
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent  implements OnInit {
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event);
    this.screenWidth = window.innerWidth;
  }
  constructor(
    public sharedService: SharedService,
    public apiService: ApiService,
    public router: Router,
    public formBuilder: FormBuilder,
    public storageService: StorageService
  ) {
    this.screenWidth = window.innerWidth;
  }
  images: any = [1,2,3].map((n) => `assets/images/banner_${n}.png`);
  mobileBannerImages: any = [1,2,3].map((n) => `assets/images/mobile_banner_${n}.png`);
  destinations: any = [];
  campings: any = [];
  beds: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  filterForm: FormGroup;
  selectedTab: any = 'destination';
  categories: any = [];
  accommodations: any = [];
  tilesData: any = [];
  twoDaysBefore: any;
  twoDaysAfter: any;
  showSpinner: any = true;
  ngOnInit() {
    const currentDate = moment(); // You can replace this with your actual date=
    this.twoDaysBefore = currentDate.clone().subtract(2, 'days');
    this.twoDaysAfter = currentDate.clone().add(2, 'days');
    console.log(typeof this.twoDaysAfter);
    this.apiService.getDataStream();
    this.filterForm = this.formBuilder.group({
      destination: ['', Validators.required],
      camping: ['', Validators.required],
      people: [1, Validators.required],
      start_date: [this.twoDaysBefore.format('YYYY-MM-DD'), Validators.required],
      end_date: [this.twoDaysAfter.format('YYYY-MM-DD'), Validators.required],
      // password: ['', Validators.required]
    });
    this.apiService.dataStream.subscribe((res) => {
      this.destinations = res.destinations;
      this.tilesData = [...res.destinations].map((val) => {
        return {
          name: val.name,
          url: `/destination-details/${val.id}`,
          img: this.sharedService.generateImageUrl(val.profile_image_url)
        }
      }).splice(0, 8);
      this.campings = res.camping;
      this.accommodations = [...res.accommodations].map((val) => {
        return {
          ...val,
          url: `/camping-details/${val.id}`,
          img: this.sharedService.generateImageUrl(val.profile_image_url)
        }
      }).splice(0, 3);
      this.showSpinner = false;
    });
  }

  onSelectAccommodation(event) {
    console.log(event);
  }

  onSearch() {
    const dest = this.filterForm.get('destination').value;
    const camp = this.filterForm.get('camping').value;
    if(dest === '' && camp === '') {
      this.filterForm.markAllAsTouched();
      this.apiService.showToast('Please select Destination/Camping')
      return;
    }

    this.storageService.storeValue('start_date', this.filterForm.get('start_date').value);
    this.storageService.storeValue('end_date', this.filterForm.get('end_date').value);

    if(this.selectedTab === 'destination') {
      const id =  this.filterForm.get('destination').value;
      this.router.navigate([`/destination-details/${id}`]);
    } else if (this.selectedTab === 'camping') {
      const id = this.filterForm.get('camping').value;
      this.router.navigate([`/camping-details/${id}`]);
    }
  }

  onChangeTab(tab) {
    this.selectedTab = tab;
  }
}
