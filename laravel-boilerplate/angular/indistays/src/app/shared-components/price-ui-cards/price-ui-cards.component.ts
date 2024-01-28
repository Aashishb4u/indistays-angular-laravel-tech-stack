import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {SharedService} from "../../services/shared.service";
@Component({
  selector: 'app-price-ui-cards',
  templateUrl: './price-ui-cards.component.html',
  styleUrls: ['./price-ui-cards.component.scss']
})
export class PriceUiCardsComponent implements OnInit, OnChanges {
  accommodations: any = [];
  @Input() cardData: any = [];
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() view: string = 'column';
  @Input() lazyLoaded: any = true;
  private resizeSubscription: Subscription = new Subscription();

  constructor(public sharedService: SharedService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.checkScreenSize();
    // Subscribe to window resize events
    this.resizeSubscription.add(this.listenToResize());
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'cardData': {
            // this.doSomething(change.currentValue)
            console.log(this.cardData, '12233444');
            if(this.cardData && this.cardData.length > 0) {
              this.cardData = this.cardData.map((card) => {
                card.customerReview = 'NA';
                if(card.camping.customer_reviews && (card.camping.customer_reviews.length > 0)) {
                  const sum = card.camping.customer_reviews
                    .map(v => +v.ratings)
                    .reduce((acc, num) => acc + num, 0);
                  card.customerReview = sum / card.camping.customer_reviews.length;
                  card.customerReview = card.customerReview.toFixed(1);
                }
                return card;
              });
            }
          }
        }
      }
    }
  }

  private listenToResize() {
    return this.renderer.listen('window', 'resize', () => {
      this.checkScreenSize();
    });
  }

  ngOnDestroy() {
    // Unsubscribe from window resize events to avoid memory leaks
    this.resizeSubscription.unsubscribe();
  }

  someEvent(image) {
    image.loaded = true;
  }

  private checkScreenSize() {
    if (window.innerWidth < 600 && this.view === 'row') {
      this.addCssClass('image-price-card-container', 'grid-auto-flow-row');
    } else {
      this.removeCssClass('image-price-card-container', 'grid-auto-flow-row');
    }
  }

  private addCssClass(className: string, classToAdd: string) {
    this.renderer.addClass(this.el.nativeElement.querySelector(`.${className}`), classToAdd);
  }

  private removeCssClass(className: string, classToRemove: string) {
    this.renderer.removeClass(this.el.nativeElement.querySelector(`.${className}`), classToRemove);
  }

  onSelectPriceCard(acc) {
    this.onSelect.emit(acc);
  }
}
