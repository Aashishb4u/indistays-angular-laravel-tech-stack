import { Component, Input, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-image-tiles',
  templateUrl: './image-tiles.component.html',
  styleUrls: ['./image-tiles.component.scss']
})
export class ImageTilesComponent implements OnInit, OnDestroy {
  @Input() tilesData: any[] = [];
  @Input() view: string = 'column';
  @Input() lazyLoaded: any = true;
  private resizeSubscription: Subscription = new Subscription();

  constructor(public sharedService: SharedService, private renderer: Renderer2, private el: ElementRef) {}

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
      this.addCssClass('image-tiles', 'grid-auto-flow-row');
    } else {
      this.removeCssClass('image-tiles', 'grid-auto-flow-row');
    }
  }

  private addCssClass(className: string, classToAdd: string) {
    this.renderer.addClass(this.el.nativeElement.querySelector(`.${className}`), classToAdd);
  }

  private removeCssClass(className: string, classToRemove: string) {
    this.renderer.removeClass(this.el.nativeElement.querySelector(`.${className}`), classToRemove);
  }
}
