import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-tiles',
  templateUrl: './image-tiles.component.html',
  styleUrls: ['./image-tiles.component.scss']
})
export class ImageTilesComponent {
  @Input() tilesData: any = [];
  someEvent(image) {
    image.loaded = true;
  }
}
