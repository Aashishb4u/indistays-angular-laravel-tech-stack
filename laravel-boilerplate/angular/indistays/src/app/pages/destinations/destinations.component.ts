import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsListingComponent implements OnInit {
  destinations: any = [];
  constructor(public apiService: ApiService, public sharedService: SharedService) {}
  ngOnInit() {
    this.apiService.getDataStream().then((res) => {
      this.apiService.dataStream.subscribe((val) => {
        this.destinations = [...val.destinations].map((val) => {
          return {
            ...val,
            name: val.name,
            img: this.sharedService.generateImageUrl(val.profile_image_url)
          }
        });
      })
    })
  }
}
