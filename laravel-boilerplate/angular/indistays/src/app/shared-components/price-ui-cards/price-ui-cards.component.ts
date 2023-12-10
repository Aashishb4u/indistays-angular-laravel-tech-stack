import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Subscription} from "rxjs";
@Component({
  selector: 'app-price-ui-cards',
  templateUrl: './price-ui-cards.component.html',
  styleUrls: ['./price-ui-cards.component.scss']
})
export class PriceUiCardsComponent implements OnInit {
  accommodations: any = [];
  @Input() cardData: any = [];
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() view: string = 'column';
  private resizeSubscription: Subscription = new Subscription();

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.checkScreenSize();
    // Subscribe to window resize events
    this.resizeSubscription.add(this.listenToResize());
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
