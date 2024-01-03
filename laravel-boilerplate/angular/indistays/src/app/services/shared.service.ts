import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {appConstants} from "../../assets/constants/app-constants";
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {ConfirmationPopupComponent} from "../shared-components/confirmation-popup/confirmation-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxImageCompressService} from "ngx-image-compress";
import {isPlatformBrowser} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  noImageIcon: any = 'assets/no-image.jpeg';
  ownerContact = '8788707579';
  sizeOfOriginalImage: any = '';
  submitFeedbackSuccess = new BehaviorSubject(false);
  submitEnquirySuccess = new BehaviorSubject(false);
  showBackIcon = new BehaviorSubject(false);
  dashboardMenu$ = new BehaviorSubject('dashboard');
  showSpinner = new BehaviorSubject(false);
  showBrandSpinner = new BehaviorSubject(false);
  companyLogo: any = appConstants.creativeHandLogo;
  companyLogoName: any = appConstants.creativeHandLogoName;
  companyLogoTransperant: any = appConstants.creativeHandLogoTransperant;
  companyLogoAnimation: any = appConstants.creativeHandLogoAnimation;
  businessLogoName: any = '';
  businessLogoImageLink: any = '';
  constructor(@Inject(PLATFORM_ID) private platformId: object, public dialog: MatDialog, public imageCompress: NgxImageCompressService, public snackBar: MatSnackBar) { }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  sendMessage(message) {
    const encodedMessage = encodeURI(message);
    // https://api.whatsapp.com/send?phone=919403733265&text=Hello
    const url = `https://api.whatsapp.com/send?phone=91${this.ownerContact}&text=${encodedMessage}`;
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.open(url, '_blank');
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

  compressFile(image, fileName) {
    return new Promise((resolve, reject) => {
      var orientation = -1;
      const sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
      console.log('Image Original Size', sizeOfOriginalImage);
      this.imageCompress.compressFile(image, -1, 30, 50).then(
        result => {
          const imgResultAfterCompress = result;
          const base64 = result;
          const sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
          console.log('Size in bytes after compression:', sizeOFCompressedImage);
          const imageName = fileName;
          const imageBlob = this.dataURItoBlob(imgResultAfterCompress.split(',')[1]);
          const imageFile = new File([imageBlob], imageName, { type: 'image/png' });

          const compressedImageData = {
            imageFile: imageFile,
            base64: base64
          };

          resolve(compressedImageData);
        }
      ).catch(error => {
        reject(error);
      });
    });
  }

  dataURItoBlob(dataURI) {
    let byteString = null;
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      byteString = window.atob(dataURI);
    }
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  generateImageUrl(path) {
    return `${appConstants.baseUrl}${path}?${new Date().getTime()}`
  }

  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

}
