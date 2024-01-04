import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'star-ratings',
  templateUrl: './star-ratings.component.html',
  styleUrls: ['./star-ratings.component.scss']
})
export class StarRatingsComponent {
  @Input('rating') public rating: any = 3;
  @Input('starCount') public starCount: number = 5;
  @Input('mode') public mode: string = 'edit';
  @Input('color') public color: string = 'accent';
  @Output() ratingUpdated = new EventEmitter<any>();
  ratingArr = [];
  constructor() {
  }


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    // this.sharedService.showToast('Thanks for Ratings')
    this.ratingUpdated.emit(rating);
    return false;
  }


  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
