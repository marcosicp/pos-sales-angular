import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-advertencia',
  templateUrl: './dialog-advertencia.component.html',
  styleUrls: ['./dialog-advertencia.component.scss']
})
export class DialogAdvertenciaComponent {
  title: string;
  confirmText: string;

  constructor(public dialogRef: MatDialogRef<DialogAdvertenciaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.confirmText = data.confirmText;
  }

  cerrar() {
    this.dialogRef.close(false);
  }
}
