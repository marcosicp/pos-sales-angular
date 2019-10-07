import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
// DIALOGOS
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
// URLS DE CONFIGURACION
import { URL_USER } from '../../shared/configs/urls.config';

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
  errorPass = false;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogOperacionOkComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data?: Usuarios
  ) {
    this.usuario = data;
  }

  guardarCambios() {
    if (this.checkearPass()) {
      this.errorPass = true;
      return;
    } else {
      this.errorPass = false;
    }

    const postObj = {
      usuario: this.usuario,
      pass: this.passObj.nueva
    };

    this.dataService.postAsync(
      URL_USER.MODIFY_PASS,
      postObj
    ).subscribe(
      result => {
        const DialogResult = result ?
          DialogOperacionOkComponent :
          DialogSinConexionComponent;
        const response = result ?
          result[0] : false;

        const _dialogRef = this.dialog.open(
          DialogResult,
          { width: '600px' }
        );

        _dialogRef.afterOpened().subscribe(
          () => {
            this.dialogRef.close(response);
          }
        );
      }
    );
  }

  cancelarCambios() {
    this.dialogRef.close();
  }

  checkearPass(): boolean {
    const { anterior, nueva, repetirNueva } = this.passObj;

    return anterior.length === 0 ||
      nueva.length === 0 ||
      repetirNueva.length === 0 ||
      anterior === nueva ||
      nueva !== repetirNueva;
  }
}
