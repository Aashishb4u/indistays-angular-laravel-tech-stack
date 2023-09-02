import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {StorageService} from "../../../services/storage.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {HttpParams} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  searchForm: FormGroup;
  pageSize = 20;
  totalLength = 0;
  currentPage = 1;
  users: [];
  dataSource: any = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public fb: FormBuilder, public sharedService: SharedService, public router: Router, public apiService: ApiService, public storageService: StorageService) {

  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
    this.getUsers();
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getUsers();
  }

  onSearch() {
    console.log(this.searchForm.value);
  }

  onAddUser() {
    this.router.navigate(['/dashboard/add-user']);
  }

  getUsers(nameFilter = '') {
    let params = new HttpParams()
      .set('currentPage', this.currentPage.toString())
      .set('pageSize', this.pageSize.toString());
    if(nameFilter) {
      params = params.set('name', nameFilter);
    }
    this.apiService.getUsers(params).subscribe(
      res => this.getUsersSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getUsersSuccess(res) {
    const total = res.data.total;
    this.dataSource = res && res.data && res.data.data && res.data.data.length > 0 ?
    res.data.data.map((val) => {
      val.role = val.user_role.name;
      return val;
    }) : [];
    this.totalLength = total;
  }

  onEditUser(id) {
    this.router.navigate([`/dashboard/edit-user/${id}`])
  }

  onDeleteUser(id) {
    const data = {
      title: 'Delete User',
      confirmLabel: 'Ok',
      message: 'Are you sure you want to delete User',

    }
    this.sharedService.openDialogPrompt(
      data.title,
      data.confirmLabel,
      data.message,
      this.onDeleteUserConfirmation.bind(this),
      id)
  }

  onDeleteUserConfirmation(data) {
    this.deleteUserById(data.entityId);
  }

  deleteUserById(id) {
    this.apiService.deleteUser(id).subscribe(
      res => this.deleteUserByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  deleteUserByIdSuccess(res) {
   this.getUsers();
  }

  handleDebouncedKeyUp(event) {
    this.getUsers(event.target.value);
  }

}
