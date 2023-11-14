import {Component, OnInit} from '@angular/core';
import {appConstants} from "../assets/constants/app-constants";
import {StorageService} from "./services/storage.service";
import {ApiService} from "./services/api.service";
import {filter, forkJoin} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'indistays';
  roles: any = [];
  constructor(public router: Router, private storageService: StorageService, public apiService: ApiService) {

  }


  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    });
    this.storageService.getStoredValue(appConstants.ACCESS_TOKEN_KEY).then((token) => {
      this.apiService.onLoadToken.next(token);
    });
    // this.getRoles();
  }

  getRoles() {
    this.apiService.getRoles().subscribe(
      res => this.getRolesSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getRolesSuccess(res) {
    this.roles = res;
    this.storageService.storeValue('roles', JSON.stringify(this.roles));
  }
}
