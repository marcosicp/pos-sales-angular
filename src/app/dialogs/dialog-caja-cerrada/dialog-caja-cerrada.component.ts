import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-caja-cerrada',
  templateUrl: './dialog-caja-cerrada.component.html',
  styleUrls: ['./dialog-caja-cerrada.component.scss']
})
export class DialogCajaCerradaComponent {

  constructor(public dialogRef: MatDialogRef<DialogCajaCerradaComponent>) {}

  show = false;
  claveSocios = 9632147;
  claveInput;

  cerrarChecke() {
    this.dialogRef.close(true);
  }

  cerrarEfectivo() {
    this.dialogRef.close(false);
  }

  clave() {
    this.show = true;
  }

  // cerrarSocios() {
  //   if (this.claveSocios === this.claveInput) {
  //     this.dialogRef.close('socios');
  //   }
  // }

  /** Whether the number of selected elements matches the total number of rows. */
  selectRow(row) {
    this.dialogRef.close(row);
  }

  cancelar() {
    this.dialogRef.close(null);
  }

}
