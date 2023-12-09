import { Component } from '@angular/core';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public shared: SharedService) {

  }

  sendMessage() {
    this.shared.sendMessage('Hello, I need your service for camping.');
  }
}
