import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-confirmar-cambio-fecha',
  templateUrl: './dialog-confirmar-cambio-fecha.component.html',
  styleUrls: ['./dialog-confirmar-cambio-fecha.component.scss']
})
export class DialogConfirmarCambioFechaComponent implements OnInit {
  evento: any;

  constructor(public dialogRef: MatDialogRef<DialogConfirmarCambioFechaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.evento = data;
  }

  ngOnInit() {
  }

  guardarFecha() {
    this.dialogRef.close({ evento: this.evento });
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

}
