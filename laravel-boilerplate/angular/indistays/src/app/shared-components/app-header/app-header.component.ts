import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NavigationEnd, Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  currentPage: any = null;
  showHeader: any = true;
  isAuthenticated: any = false;
  excludedPages: any = ['/login', '/change-password'];
  constructor(public apiService: ApiService, public router: Router, public sharedService: SharedService) {

  }

  ngOnInit() {
    // Subscribe to router events to track page changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update the currentPage based on the route
        this.currentPage = event.url;
        this.showHeader = !this.excludedPages.includes(this.currentPage);
      }
    });
    this.apiService.isAuthenticated.subscribe(res => this.isAuthenticated = res);
  }

  logout() {
    this.apiService.logout().subscribe((res) => {
      this.apiService.showToast(res.message);
      this.router.navigate(['/login']);
    });
  }

  onChangePassword() {
    this.router.navigate(['/change-password']);
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onAdminPanel() {
    this.router.navigate(['/dashboard']);
  }
}
