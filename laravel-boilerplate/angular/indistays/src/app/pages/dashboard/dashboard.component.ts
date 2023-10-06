import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  roles: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public sharedService: SharedService, public router: Router, public apiService: ApiService, public storageService: StorageService) {
  }
  ngOnInit() {}

  logout() {
    this.apiService.logout().subscribe((res) => {
      this.apiService.showToast(res.message);
      this.router.navigate(['/login']);
    });
  }

  onChangePassword() {
    this.router.navigate(['/change-password']);
  }

  onWebsite() {
    this.router.navigate(['']);
  }
}
