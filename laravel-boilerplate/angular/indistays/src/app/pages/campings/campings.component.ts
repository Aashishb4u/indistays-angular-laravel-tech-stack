import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-campings',
  templateUrl: './campings.component.html',
  styleUrls: ['./campings.component.scss']
})
export class CampingsListingComponent implements OnInit {
  accommodations: any = [];
  showSpinner: any = true;
  constructor(public apiService: ApiService, public sharedService: SharedService) {}
  ngOnInit() {
    this.sharedService.showBackIcon.next(false);
    this.apiService.getDataStream().then((res) => {
      this.apiService.dataStream.subscribe((res) => {
        this.accommodations = [...res.accommodations].map((val) => {
          return {
            ...val,
            url: `/camping-details/${val.id}`,
            img: this.sharedService.generateImageUrl(val.profile_image_url)
          }
        });
        setTimeout((res) => {
          this.showSpinner = false;
        }, 500);
      });
    });
  }
}
