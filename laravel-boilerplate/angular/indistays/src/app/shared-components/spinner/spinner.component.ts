import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(public sharedService: SharedService) {
  }
}
