import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {appConstants} from "../../assets/constants/app-constants";

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
  companyLogoAnimation: any = appConstants.creativeHandLogoAnimation;
  businessLogoName: any = '';
  businessLogoImageLink: any = '';
  constructor() { }
}
