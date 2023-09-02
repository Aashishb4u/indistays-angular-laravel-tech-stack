import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {appConstants} from "../../assets/constants/app-constants";
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {ConfirmationPopupComponent} from "../shared-components/confirmation-popup/confirmation-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  noImageIcon: any = 'assets/no-image.jpeg';
  sizeOfOriginalImage: any = '';
  submitFeedbackSuccess = new BehaviorSubject(false);
  submitEnquirySuccess = new BehaviorSubject(false);
  dashboardMenu$ = new BehaviorSubject('dashboard');
  showSpinner = new BehaviorSubject(false);
  showBrandSpinner = new BehaviorSubject(false);
  companyLogo: any = appConstants.creativeHandLogo;
  companyLogoName: any = appConstants.creativeHandLogoName;
  companyLogoTransperant: any = appConstants.creativeHandLogoTransperant;
  companyLogoAnimation: any = appConstants.creativeHandLogoAnimation;
  businessLogoName: any = '';
  businessLogoImageLink: any = '';
  constructor(public dialog: MatDialog) { }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  openDialogPrompt(title: string, confirmLabel: any, message: string, confirmFunction: (id: string) => void, id: string): void {
    const enterAnimationDuration = '0ms';
    const exitAnimationDuration = '0ms';
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: title,
        message: message,
        confirmLabel: confirmLabel,
        entityId: id,
        confirmFunction: confirmFunction
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result data here
      console.log('Dialog closed with result:', result);
    });
  }
}
