import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-price-ui-cards',
  templateUrl: './price-ui-cards.component.html',
  styleUrls: ['./price-ui-cards.component.scss']
})
export class PriceUiCardsComponent implements OnInit {
  accommodations: any = [];
  @Input() cardData: any = [];
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    console.log(this.cardData);
  }

  someEvent(image) {
    image.loaded = true;
  }

  onSelectPriceCard(acc) {
    this.onSelect.emit(acc);
  }
}
