import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  title: string;
  confirmText: string;

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.confirmText = data.confirmText;
  }

  onButtonClick(confirm: boolean) {
    this.dialogRef.close({confirm: confirm});
  }
}
