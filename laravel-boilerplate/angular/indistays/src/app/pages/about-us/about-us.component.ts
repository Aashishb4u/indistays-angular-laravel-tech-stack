import { Component } from '@angular/core';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  constructor(public sharedService: SharedService) {
    this.sharedService.showBackIcon.next(false);
  }
}
