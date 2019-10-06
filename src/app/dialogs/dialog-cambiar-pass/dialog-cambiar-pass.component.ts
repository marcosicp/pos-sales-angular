import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
// DIALOGOS
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';

@Component({
  selector: 'app-dialog-cambiar-pass',
  templateUrl: './dialog-cambiar-pass.component.html',
  styleUrls: ['./dialog-cambiar-pass.component.scss']
})
export class DialogCambiarPassComponent {
  usuario: Usuarios;
  passObj = {
    anterior: '',
    nueva: '',
    repetirNueva: ''
  };

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogOperacionOkComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data?: Usuarios
  ) {
    this.usuario = data;
  }

  guardarCambios() {
    console.warn(this.usuario, this.passObj);
  }

  cancelarCambios() {
    this.dialogRef.close();
  }
}
