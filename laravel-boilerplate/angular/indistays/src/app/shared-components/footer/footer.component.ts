import { Component } from '@angular/core';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  todayYear: any = '';
  constructor(public shared: SharedService) {
    this.todayYear = (new Date()).getFullYear();
  }

  sendMessage() {
    this.shared.sendMessage('Hello, I need your service for camping.');
  }

  goTo(loc) {
    switch(loc) {
      case 'facebook':
        window.open('https://www.facebook.com/profile.php?id=61555347935346', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/indistays', '_blank');
        break;
    }
  }
}
