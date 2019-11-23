import { Component, } from '@angular/core';
import { MatDialog } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
// DIALOGOS
import { DialogCerrarCajaComponent } from '../../dialogs/dialog-cerrar-caja/dialog-cerrar-caja.component';
import { DialogAbrirCajaComponent } from '../../dialogs/dialog-abrir-caja/dialog-abrir-caja.component';
import { DialogIngresoCajaComponent } from '../../dialogs/dialog-ingreso-caja/dialog-ingreso-caja.component';
import { DialogEgresoCajaComponent } from '../../dialogs/dialog-egreso-caja/dialog-egreso-caja.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
// CONFIGURACIONES
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent {
  cajaAbierta: any;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {
    this.dataService.getAsync(URL_MOVIMIENTOS.GET_ESTADO, [])
      .subscribe(
        data => this.cajaAbierta = data[0],
        error => {
          this.cajaAbierta = null,
          this.dialog.open(
            DialogSinConexionComponent,
            { width: '600px', disableClose: true }
          );
        }
      );
  }

  abrirCaja() {
    this.logicaDeMovimientos(DialogAbrirCajaComponent);
  }

  cerrarCaja() {
    this.logicaDeMovimientos(DialogCerrarCajaComponent);
  }

  registrarDeposito() {
    this.logicaDeMovimientos(DialogIngresoCajaComponent);
  }

  registrarRetiro() {
    this.logicaDeMovimientos(DialogEgresoCajaComponent);
  }

  private logicaDeMovimientos(DialogComponent: any) {
    const dialogRef = this.dialog.open(
      DialogComponent,
      { width: '600px', disableClose: true }
    );

    dialogRef.afterClosed().subscribe(
      dialogResult => {
        if (dialogResult) {
          this.loadingService.toggleLoading();

          this.dataService.createAsync(URL_MOVIMIENTOS.ADD_MOVIMIENTO, dialogResult, [])
            .subscribe(
              result => {
                this.loadingService.toggleLoading();

                this.dialog.open(
                  DialogOperacionOkComponent,
                  { width: '600px', disableClose: true }
                );
              },
              error => {
                this.loadingService.toggleLoading();

                this.dialog.open(
                  DialogSinConexionComponent,
                  { width: '600px', disableClose: true }
                );
              }
            );
        }
      }
    );
  }
}
