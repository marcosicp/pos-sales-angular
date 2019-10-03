import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AuthService } from '../../core/services/auth.service';
import { DialogCerrarCajaComponent } from '../dialog-cerrar-caja/dialog-cerrar-caja.component';
import { DataService } from '../../core/services/data.service';
import { Clientes } from '../../shared/models/clientes.model';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';

@Component({
  selector: 'app-dialog-cliente-add-edit',
  templateUrl: './dialog-cliente-add-edit.component.html',
  styleUrls: ['./dialog-cliente-add-edit.component.scss']
})
export class DialogClienteAddEditComponent {

  cliente: Clientes = new Clientes();
  result: Clientes[] = [];


  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogClienteAddEditComponent>,
    private comerciosService: DataService
  ) { }

  onNoClick() {
    this.dialogRef.close();
  }

  guardarCliente() {
    this.comerciosService.createAsync('clientes/AddCliente', this.cliente, this.result).subscribe(
      data => {
        const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' });

        this.dialogRef.close(this.cliente);
      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
          dialogRef.afterClosed().subscribe(result => {
        });
        console.log(error);
      }
    );
  }
}
