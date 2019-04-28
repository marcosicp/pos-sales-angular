import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './dialog-confirmar.component.html',
  styleUrls: ['./dialog-confirmar.component.scss']
})
export class DialogConfirmarComponent {
  title: string;
  confirmText: string;

  constructor(public dialogRef: MatDialogRef<DialogConfirmarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.confirmText = data.confirmText;
  }

  onButtonClick(confirm: boolean) {
    this.dialogRef.close({confirm: confirm});
  }
}
