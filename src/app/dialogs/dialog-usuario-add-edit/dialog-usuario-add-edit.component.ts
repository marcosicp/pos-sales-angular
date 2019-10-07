import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
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
  selector: 'app-dialog-usuario-add-edit',
  templateUrl: './dialog-usuario-add-edit.component.html',
  styleUrls: ['./dialog-usuario-add-edit.component.scss']
})
export class DialogUsuarioAddEditComponent {
  usuario: Usuarios;
  result: Usuarios[] = [];

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogOperacionOkComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data?: Usuarios
  ) {
    this.usuario = data ? data : new Usuarios();
  }

  guardarUsuario() {
    const URL = this.data ?
      URL_USER.MODIFY_USER :
      URL_USER.ADD_USER;

    this.dataService.createAsync(
      URL,
      this.usuario,
      this.result
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

  onNoClick() {
    this.dialogRef.close(false);
  }
}
