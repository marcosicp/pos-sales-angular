import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from '../../../app/core/services/data.service';;
import { CierreCaja } from '../../models/cierre-caja.model';
import { AperturaCaja } from '../../models/apertura-caja.model';
import { AuthService } from '../../core/auth.service';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';


@Component({
  selector: 'app-dialog-cerrar-caja',
  templateUrl: './dialog-cerrar-caja.component.html',
  styleUrls: ['./dialog-cerrar-caja.component.scss']
})
export class DialogCerrarCajaComponent {
  result: CierreCaja[] = [];
  aperturaArr: AperturaCaja[] = [];
  apertura: AperturaCaja = new AperturaCaja();
  cierreCaja: CierreCaja = new CierreCaja();
  usuario = '';

  constructor(private auth: AuthService, public dialogRef: MatDialogRef<DialogCerrarCajaComponent>,
    private dialog: MatDialog, private comerciosService: DataService) {
    this.auth.getUser.subscribe((data: any) => {
      this.usuario = data;
    });

    this.comerciosService.getAsync('administracion/ultimaApertura', this.aperturaArr).subscribe(
      data1 => {
        this.apertura = data1[0];
        this.apertura.montoApertura = data1[0].monto;
        this.comerciosService.getAsync('administracion/cerrarCaja', this.result).subscribe(
          data2 => {
            debugger;
            this.cierreCaja = data2[0];
            this.cierreCaja.totalCierreCaja = this.apertura.montoApertura + this.cierreCaja.totalPrecioVenta;
          },
          error => {
            const dialogRef2 = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
            dialogRef2.afterClosed().subscribe(result => {
            });
            console.log(error);
          }
        );
      },
      error => {
        const dialogRef3 = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
        dialogRef3.afterClosed().subscribe(result => {
        });
        console.log(error);
      }
    );

  }

  cerrarCaja() {
    this.cierreCaja.fechaMovimiento = new Date();
    this.cierreCaja.fechaMovimiento.setHours(this.cierreCaja.fechaMovimiento.getHours() - 3);
    this.cierreCaja.usuario = this.usuario;

    this.comerciosService.createAsync('administracion/cerrarCajaMovimientos', this.cierreCaja, this.result).subscribe(
      data => {
        const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' });
        dialogRef.afterClosed().subscribe(result => {

        });

        this.dialogRef.close();
      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
          dialogRef.afterClosed().subscribe(result => {
        });
        console.log(error);
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
