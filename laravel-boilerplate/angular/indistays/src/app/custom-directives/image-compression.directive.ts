import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appImageCompression]'
})
export class ImageCompressionDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
      console.log('Loading attribute added!', nativeElement.loading);
    } else {
      console.log('Adding loading attribute is not supported!');
    }
  }
}
