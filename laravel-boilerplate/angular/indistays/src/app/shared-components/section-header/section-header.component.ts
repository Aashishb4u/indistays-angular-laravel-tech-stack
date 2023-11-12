import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
  @Input() showMore: any = false;
  @Input() subTitle: any = '';
  @Input() mainTitle: any = '';
}
