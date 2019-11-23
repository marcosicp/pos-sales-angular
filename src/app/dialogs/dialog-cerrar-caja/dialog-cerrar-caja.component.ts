import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
import { MovimientosCaja } from '../../shared/models/movimientos-caja.model';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../../app/core/services/data.service';
// URLS
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';
// HELPERS
import getFechaArg from '../../shared/helpers/date.helper';
// DIALOGOS
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';


@Component({
  selector: 'app-dialog-cerrar-caja',
  templateUrl: './dialog-cerrar-caja.component.html',
  styleUrls: ['./dialog-cerrar-caja.component.scss']
})
export class DialogCerrarCajaComponent implements OnInit {
  cierreCaja: MovimientosCaja = new MovimientosCaja();
  aperturaCaja: MovimientosCaja = new MovimientosCaja();
  aperturas: MovimientosCaja[] = [];
  totalCierreCaja: number;
  usuario: Usuarios;
  cerrarCajaForm: FormGroup;
  errorString = (prop: string) => {
    return 'TEST';
  }

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<DialogCerrarCajaComponent>,
    private dialog: MatDialog,
    private comerciosService: DataService
  ) {
    this.authService.getUser.subscribe((data: any) => {
      this.usuario = JSON.parse(data);
    });
  }

  ngOnInit() {
    this.comerciosService.getAsync(
      URL_MOVIMIENTOS.GET_ULTIMA_APERTURA,
      []
    ).subscribe(
      data1 => {
        console.warn('errer');
        // this.aperturaCaja = data1[0];
        this.aperturaCaja.monto = data1[0];
        // NO ENTIENDO ESTA PARTE
        // this.comerciosService.getAsync(URL_MOVIMIENTOS.CERRAR_CAJA, []).subscribe(
        //   data2 => {
        //     console.warn('errer');
        //     this.cierreCaja = data2[0];
        //     // this.totalCierreCaja = this.aperturaCaja.monto + this.cierreCaja.totalPrecioPedido;
        //     this.totalCierreCaja = this.aperturaCaja.monto + 0;
        //   },
        //   error => {
        //     const dialogRef2 = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
        //     dialogRef2.afterClosed().subscribe(result => {
        //     });
        //     console.log(error);
        //   }
        // );
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
      tipo: 'CIERRE'
    };

    this.cierreCaja = {...this.cerrarCajaForm.value, ...otrosDatos};

    this.dialogRef.close(this.cierreCaja);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }
}
