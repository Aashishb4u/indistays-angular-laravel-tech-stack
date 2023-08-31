import {Component, OnInit} from '@angular/core';
import {appConstants} from "../assets/constants/app-constants";
import {StorageService} from "./services/storage.service";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'indistays';
  roles: any = [];
  constructor(private storageService: StorageService, public apiService: ApiService) {

  }

  ngOnInit(): void {
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
