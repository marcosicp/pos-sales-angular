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
    // this.dataService.createAsync(
    //   URL_USER.ADD_USER,
    //   this.usuario,
    //   this.result
    // ).subscribe(
    //   data => {
    //     const dialogRef = this.dialog.open(
    //       DialogOperacionOkComponent, {
    //         width: '600px'
    //       }
    //     );

    //     dialogRef.afterClosed().subscribe(
    //       result => { }
    //     );

    //     this.dialogRef.close(data[0]);
    //   },
    //   error => {
    //     const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
    //       dialogRef.afterClosed().subscribe(result => {
    //     });
    //     console.log(error);
    //   }
    // );
    console.warn(this.usuario);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
