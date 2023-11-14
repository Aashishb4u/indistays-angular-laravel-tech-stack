import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {SharedService} from "../../services/shared.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.scss']
})
export class DestinationDetailsComponent implements OnInit {
  destinationId: any = null;
  destinationDetails: any = null;
  destinationBanner: any = null;
  destinations: any = [];
  featuredImages: any = [];
  camping: any = [];
  constructor(public router: Router, public sharedService: SharedService, public apiService: ApiService, public route: ActivatedRoute) {
    this.destinationId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    // Assuming currentDate is the date for which you want to calculate
    this.apiService.getDataStream().then((res) => {
      this.apiService.dataStream.subscribe((val) => {
        this.destinations = [...val.destinations].map((val) => {
          return {
            ...val,
            url: `/destination-details/${val.id}`,
            name: val.name,
            img: this.sharedService.generateImageUrl(val.profile_image_url)
          }
        });
        this.destinationDetails = this.destinations.find(v => v.id === +this.destinationId);
        this.camping = [...this.destinationDetails.campings].map((res) => {
          return {
            ...res,
            url: `/camping-details/${res.id}`,
            img: this.sharedService.generateImageUrl(res.profile_image_url)
          }
        });
        console.log(this.camping);
        this.featuredImages = this.destinationDetails.images.map((img) => {
          return {
            ...img,
            img: this.sharedService.generateImageUrl(img.url)
          }
        });
        this.destinationBanner = this.sharedService.generateImageUrl(this.destinationDetails.profile_image_url)
      });
    });
  }

  galleryImages: any = [
    {url: '/assets/images/tile_1.png'},
    {url: '/assets/images/banner_2.png'},
    {url: '/assets/images/banner_1.png'},
    {url: '/assets/images/banner_3.png'},
    {url: '/assets/images/tile_3.png'},
  ];
}
