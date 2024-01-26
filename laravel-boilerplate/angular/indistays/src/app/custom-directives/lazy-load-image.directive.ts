import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appLazyLoadImage]'
})
export class LazyLoadImageDirective {
  private loaded = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log("scroll");
    this.lazyLoad();
  }

  private lazyLoad(): void {

    if (this.loaded) {
      return; // Image is already loaded, no need to load it again
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      this.loadImage();
    }
  }

  private loadImage(): void {
    const imageSrc = this.el.nativeElement.getAttribute('data-src');
    if (imageSrc) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', imageSrc);
      // this.renderer.removeAttribute(this.el.nativeElement, 'data-src');
      this.loaded = true; // Mark the image as loaded
    }
  }
}
