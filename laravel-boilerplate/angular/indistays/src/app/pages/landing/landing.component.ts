import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent  implements OnInit {
  constructor(public apiService: ApiService, public formBuilder: FormBuilder) {

  }
  images: any = [1, 2, 3, 4].map((n) => `assets/images/banner_${n}.png`);
  destinations: any = [];
  campings: any = [];
  beds: any = [1, 2, 3, 4, 5];
  filterForm: FormGroup;
  selectedTab: any = 'destination';
  ngOnInit() {
    this.getAllDestinations();
    this.getAllCamping();
    this.filterForm = this.formBuilder.group({
      destination: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      // password: ['', Validators.required]
    });
  }

  getAllDestinations() {
    this.apiService.getAllDestinationsForWebsite().subscribe((res: any) => {
      this.destinations = res.data;
    })
  }

  getAllCamping() {
    this.apiService.getAllCampingForWebsite().subscribe((res: any) => {
      this.campings = res.data;
    })
  }

  onChangeTab(tab) {
    this.selectedTab = tab;
  }
}
