import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from '../../../app/core/services/data.service';
import { CierreCaja } from '../../shared/models/cierre-caja.model';
import { AperturaCaja } from '../../shared/models/apertura-caja.model';
import { AuthService } from '../../core/services/auth.service';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dialog-cerrar-caja',
  templateUrl: './dialog-cerrar-caja.component.html',
  styleUrls: ['./dialog-cerrar-caja.component.scss']
})
export class DialogCerrarCajaComponent implements OnInit{
  result: CierreCaja[] = [];
  aperturas: AperturaCaja[] = [];
  apertura: AperturaCaja = new AperturaCaja();
  cierreCaja: CierreCaja = new CierreCaja();
  usuario;
  cerrarCajaForm: FormGroup;
  errorString = (prop: string) => {
    return 'TEST';
  }

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<DialogCerrarCajaComponent>,
    private dialog: MatDialog,
    private comerciosService: DataService
  ) {
    this.auth.getUser.subscribe((data: any) => {
      this.usuario = data;
    });
  }

  ngOnInit() {
    this.comerciosService.getAsync(
      URL_MOVIMIENTOS.GET_ULTIMA_APERTURA,
      []
    ).subscribe(
      data1 => {
        console.warn('errer');
        // this.apertura = data1[0];
        this.apertura.monto = data1[0];
        this.comerciosService.getAsync(URL_MOVIMIENTOS.CERRAR_CAJA, this.result).subscribe(
          data2 => {
            console.warn('errer');
            this.cierreCaja = data2[0];
            this.cierreCaja.totalCierreCaja = this.apertura.monto + this.cierreCaja.totalPrecioPedido;
          },
          error => {
            const dialogRef2 = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
            dialogRef2.afterClosed().subscribe(result => {
            });
            console.log(error);
          }
        );
      },
      error => {
        console.warn('errer');
        const errorDialog = this.dialog.open(
          DialogSinConexionComponent,
          { width: '600px', disableClose: true }
        );

        errorDialog.afterOpen().subscribe(
          result => {
            this.dialogRef.close(false);
          }
        );
      }
    );

    this.cerrarCajaForm = new FormGroup(
      {
        test: new FormControl('')
      }
    );
  }

  cerrarCaja() {
    const otrosDatos = {
      usuario: this.usuario,
      fechamovimiento: new Date()
    };

    Object.keys(this.cerrarCajaForm).forEach(
      prop => this.cierreCaja[prop] = this.cerrarCajaForm.value[prop] || otrosDatos[prop] || null
    );

    this.dialogRef.close(this.cierreCaja);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }
}
