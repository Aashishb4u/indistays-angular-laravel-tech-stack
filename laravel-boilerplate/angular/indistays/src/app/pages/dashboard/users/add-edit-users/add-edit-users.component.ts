import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {StorageService} from "../../../../services/storage.service";
import {SharedService} from "../../../../services/shared.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {
  userForm: FormGroup;
  roles: any = [];
  userId: any = null;

  constructor(public fb: FormBuilder,
              public storageService: StorageService,
              public apiService: ApiService,
              public route: ActivatedRoute,
              public router: Router,
              public sharedService: SharedService) {

  }

  ngOnInit() {
    this.getRoles();
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      userRole: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      // Add more form controls as needed
    }, {
      validators: this.sharedService.passwordMatchValidator
    });
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getUserById();
    }
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

  getUserById() {
    const data = {
      userId: this.userId
    }
    this.apiService.getUserById(data).subscribe(
      res => this.getUserByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getUserByIdSuccess(res) {
    this.userForm.get('name').setValue(res.data[0].name);
    this.userForm.get('email').setValue(res.data[0].email);
    this.userForm.get('userRole').setValue(res.data[0].user_role_id);
  }

  userAction() {
    if (!this.userForm.get('password').value) {
      this.apiService.showToast('Please enter valid Password');
      return;
    }

    if (!this.userForm.get('userRole').value) {
      this.apiService.showToast('Please select User Role');
      return;
    }

    if (this.userForm.valid) {
      const data = {
        name: this.userForm.get('name').value,
        email: this.userForm.get('email').value,
        password: this.userForm.get('password').value,
        user_role_id: this.userForm.get('userRole').value,
      }

      if(this.userId) {
        this.apiService.updateUserById(data, this.userId).subscribe(
          res => this.userActionSuccess(res),
          error => {
            this.apiService.commonError(error);
          }
        );
      } else {
        this.apiService.addUser(data).subscribe(
          res => this.userActionSuccess(res),
          error => {
            this.apiService.commonError(error);
          }
        );
      }
    } else {
      this.userForm.markAllAsTouched();
      this.apiService.showToast('Please select mandatory fields');
    }
  }

  userActionSuccess(res) {
    this.apiService.showToast(res.message);
    this.router.navigate(['/dashboard/users']);
  }

  goUsersPage() {
    this.router.navigate(['/dashboard/users']);
  }

}
