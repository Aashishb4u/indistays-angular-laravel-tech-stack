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
  startingAt: any = 0;
  constructor(public restService: ApiService) {}
  ngOnInit() {
    this.getAmenities();
  }

  getAmenities() {
    this.listing = this.listing.map((list) => {
      list.startingAt = this.findAccommodationWithSmallestDiscount(list);
      return list;
    });
    this.restService.getAllAmenities().subscribe((res: any) => {
      this.amenities = res.data.slice(5);
    });
  }

  findAccommodationWithSmallestDiscount(list): any {
    if (list.accommodations.length === 0) {
      return null; // Return null or handle the case when the array is empty
    }

    // Use the reduce function to find the smallest discount_price
    const smallestDiscount = list.accommodations.reduce((minDiscount, currentAccommodation) => {
      const currentDiscount = parseFloat(currentAccommodation.discount_price);
      return minDiscount < currentDiscount ? minDiscount : currentDiscount;
    }, parseFloat(list.accommodations[0].discount_price));

    return smallestDiscount;
  }
}
