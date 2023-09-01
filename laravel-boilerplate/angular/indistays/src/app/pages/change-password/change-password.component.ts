import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {SharedService} from "../../services/shared.service";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  roles: any;
  constructor(public storageService: StorageService,
              public sharedService: SharedService,
              private formBuilder: FormBuilder,
              public apiService: ApiService,
              public router: Router) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  onSubmit() {
    const confirmPassword = this.changePasswordForm.get('confirmPassword').value;
    const password = this.changePasswordForm.get('password').value;

    if(confirmPassword !== password) {
      this.apiService.showToast('Password & Confirm Password should match');
      return;
    }

    if (this.changePasswordForm.valid) {
      const data: any = {
        current_password: this.changePasswordForm.get('currentPassword').value,
        password: this.changePasswordForm.get('password').value,
      };
      this.apiService.changePassword(data).subscribe(
        res => this.changePasswordSuccess(res),
        error => {
          this.apiService.commonError(error);
        }
      );
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  changePasswordSuccess(res) {
    console.log(res);
    this.apiService.showToast('Password changed Successfully.');
    this.router.navigate(['login']);
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
