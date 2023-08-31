import {Injectable} from '@angular/core';
import {filter, map, pairwise, take} from "rxjs/operators";
import {Router, RoutesRecognized} from "@angular/router";
import {SharedService} from "./shared.service";
import {StorageService} from "./storage.service";
import {ApiService} from "./api.service";
import {appConstants} from "../../assets/constants/app-constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sharedService: SharedService,
              private storageService: StorageService,
              private apiService: ApiService,
              private router: Router) {
  }

  async isUserLoggedIn() {
    return this.apiService.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1),
    ).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });

  }

  async userBeforeLoggedIn() {
    return this.apiService.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1),
    ).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
        // if(this.apiService.userRole.toLowerCase() === 'customer') {
        //   this.router.navigate(['/customer-dashboard']);
        // } else {
        //   this.router.navigate(['/dashboard']);
        // }
        return false;
      } else {
        return true;
      }
    });
  }
}
