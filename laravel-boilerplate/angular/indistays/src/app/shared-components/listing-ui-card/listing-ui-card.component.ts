import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-listing-ui-card',
  templateUrl: './listing-ui-card.component.html',
  styleUrls: ['./listing-ui-card.component.scss']
})
export class ListingUiCardComponent implements OnInit {
  @Input() listing: any = [];
  amenities: any = [];
  constructor(public restService: ApiService) {
  }
  ngOnInit() {
    this.getAmenities();
  }

  getAmenities() {
    this.restService.getAllAmenities().subscribe((res: any) => {
      this.amenities = res.data.slice(5);
    });
  }
}
