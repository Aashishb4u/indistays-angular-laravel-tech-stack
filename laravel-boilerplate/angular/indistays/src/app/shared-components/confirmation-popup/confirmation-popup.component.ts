import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {
  title: string;
  message: string;
  confirmLabel: string;
  entityId: string;
  confirmFunction: (id: string) => void;
  modalData: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      message: string,
      confirmLabel: string,
      entityId: string;
      confirmFunction: (id: string) => void
    }
  ) {
    this.modalData = data;
    this.title = data.title;
    this.message = data.message;
    this.confirmLabel = data.confirmLabel;
    this.confirmFunction = data.confirmFunction;
    this.entityId = data.entityId;
  }

  onConfirmClick(): void {
    this.confirmFunction(this.modalData);
    this.dialogRef.close();
  }
}
