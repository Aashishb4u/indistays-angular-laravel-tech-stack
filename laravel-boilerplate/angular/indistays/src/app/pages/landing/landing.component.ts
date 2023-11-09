import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent  implements OnInit {

  constructor(public apiService: ApiService, public formBuilder: FormBuilder) {

  }
  images: any = [1,2,3].map((n) => `assets/images/banner_${n}.png`);
  destinations: any = [];
  campings: any = [];
  beds: any = [1, 2, 3, 4, 5];
  filterForm: FormGroup;
  selectedTab: any = 'destination';
  destinationList: any = ['Himachal', 'Pune', 'Mumbai', 'Hydrabad', 'Mumbai', 'Hydrabad']
  imageTiles: any = [1,2,3,4].map((tile: any, index) => {
    return {
      name: this.destinationList[index],
      img: 'assets/images/tile_' + tile + '.png'
    }
  });

  categories: any = [];
  accommodations: any = [];

  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig = {
    // centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  };

  ngOnInit() {
    this.accommodations = [
        {
          name: 'Hotel Ranwara',
          ratings: 4,
          destination: 'Pune',
          actualPrice: '$2000',
          discountPrice: '$1800',
          daysCount: 10,
          img: 'assets/images/banner_4.png'
        },
      {
          name: 'Hotel Bhandardara',
          ratings: 3,
          destination: 'Rajasthan',
          actualPrice: '$2500',
          discountPrice: '$2000',
          daysCount: 10,
          img: 'assets/images/tile_1.png'
        },
      {
          name: 'Hotel Nile',
          ratings: 3,
          destination: 'Karjat',
          actualPrice: '$2500',
          discountPrice: '$2000',
          daysCount: 10,
          img: 'assets/images/tile_2.png'
        },
    ]
    this.categories =  [{
      name: 'Galmping',
      description: 'Glamorous camping that combines the comforts of home with the outdoor experience',
      img: 'assets/images/galmping.png'
    },
      {
      name: 'Camping Resorts',
      description: 'Campgrounds with extensive amenities and recreational facilities.',
      img: 'assets/images/camping.png'
    },
      {
      name: 'Backcountry Camping',
      description: 'Camping in remote wilderness areas away from established campgrounds',
      img: 'assets/images/tent.png'
    },
      {
      name: 'Group Camping',
      description: 'Campgrounds or sites designed for large groups, such as scout troops or family reunions',
      img: 'assets/images/tent_people.png'
    }];
    this.getAllDestinations();
    this.getAllCamping();
    this.filterForm = this.formBuilder.group({
      destination: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      // password: ['', Validators.required]
    });
  }

  getAllDestinations() {
    this.apiService.getAllDestinationsForWebsite().subscribe((res: any) => {
      this.destinations = res.data;
    })
  }

  getAllCamping() {
    this.apiService.getAllCampingForWebsite().subscribe((res: any) => {
      this.campings = res.data;
    })
  }

  onChangeTab(tab) {
    this.selectedTab = tab;
  }

  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}
