import { Component, OnInit } from '@angular/core';
import { RetiroCaja } from '../../shared/models/retiro-caja.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from '../../../app/core/services/data.service';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dialog-egreso-caja',
  templateUrl: './dialog-egreso-caja.component.html',
  styleUrls: ['./dialog-egreso-caja.component.scss']
})
export class DialogEgresoCajaComponent implements OnInit {
  usuario = '';
  retiroCaja:  RetiroCaja = new RetiroCaja();
  result: RetiroCaja[] = [];

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<DialogEgresoCajaComponent>,
    private comerciosService: DataService,
    private dialog: MatDialog) {
    this.auth.getUser.subscribe((data: any) => {
      this.usuario = data;
    });
   }


  ngOnInit() { }

  guardar() {
    this.retiroCaja.usuario = this.usuario;
    this.retiroCaja.fechaMovimiento = new Date();
    this.retiroCaja.fechaMovimiento.setHours(this.retiroCaja.fechaMovimiento.getHours() - 3);
    this.retiroCaja.tipo = 'RETIRO';
    this.comerciosService.createAsync('administracion/retiroCaja', this.retiroCaja, this.result).subscribe(
      data => {
        this.retiroCaja = data[0];
        const dialogRefOk = this.dialog.open(DialogOperacionOkComponent, { width: '600px' });
        dialogRefOk.afterClosed().subscribe(result => {
        this.dialogRef.close();
        });
      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
        dialogRef.afterClosed().subscribe(result => { });
        console.log(error);
      }
    );
  }
}
