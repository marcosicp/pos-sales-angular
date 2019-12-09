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
import { DialogAdvertenciaComponent } from '../../dialogs/dialog-advertencia/dialog-advertencia.component';
// CONFIGURACIONES
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent {
  cajaAbierta = null;
  montoAntesCierre = 0;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {
    this.getEstado();
  }

  abrirCaja() {
    this.logicaDeMovimientos(DialogAbrirCajaComponent);
  }

  cerrarCaja() {
    this.logicaDeMovimientos(DialogCerrarCajaComponent);
  }

  registrarDeposito() {
    this.logicaDeMovimientos(DialogIngresoCajaComponent, true);
  }

  registrarRetiro() {
    this.logicaDeMovimientos(DialogEgresoCajaComponent, true);
  }

  getEstado() {
    this.montoAntesCierre = 0;
    this.loadingService.toggleLoading();

    this.dataService.getAsync(URL_MOVIMIENTOS.GET_ESTADO, [])
      .subscribe(
        data => {
          this.loadingService.toggleLoading();
          this.cajaAbierta = data[0];

          if (this.cajaAbierta) {
            this.dataService.getAsync(URL_MOVIMIENTOS.GET_ALL, [])
              .subscribe(
                _data => {
                  let finDeCaja = false;
                  _data
                    .sort((a, b) => new Date(b.creado) > new Date(a.creado) ? 1 : -1)
                    .forEach(
                      item => {
                        if (!finDeCaja) {
                          switch (item.tipo) {
                            case 'APERTURA':
                            case 'DEPOSITO': {
                              this.montoAntesCierre += item.monto;
                              break;
                            }
                            case 'RETIRO': {
                              this.montoAntesCierre -= item.monto;
                              break;
                            }
                            case 'CIERRE': {
                              finDeCaja = true;
                              return;
                            }
                          }
                        } else {
                          return;
                        }
                      }
                    );
                }
              );
          }
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

  private logicaDeMovimientos(DialogComponent: any, isRegistring: boolean = false) {
    if (isRegistring && !this.cajaAbierta) {
      this.dialog.open(
        DialogAdvertenciaComponent, {
          width: '600px',
          disableClose: true,
          data: {
            title: 'Caja cerrada',
            confirmText: 'Para registrar un depósito o retiro, primero debe abrir la caja.'
          }
        });
    } else {
      const dialogRef = this.dialog.open(
        DialogComponent,
        {
          width: '600px',
          disableClose: true,
          data: this.montoAntesCierre
        }
      );

      dialogRef.afterClosed().subscribe(
        dialogResult => {
          if (dialogResult) {
            this.loadingService.toggleLoading();

            this.dataService.createAsync(URL_MOVIMIENTOS.ADD_MOVIMIENTO, dialogResult, [])
              .subscribe(
                result => {
                  this.loadingService.toggleLoading();

                  const _dialogRef = this.dialog.open(
                    DialogOperacionOkComponent, { width: '600px', disableClose: true }
                  );

                  _dialogRef.afterClosed().subscribe(
                    () => {
                      if (!isRegistring) {
                        this.getEstado();
                      } else {
                        this.montoAntesCierre += dialogResult.tipo === 'DEPOSITO' ?
                          dialogResult.monto * 1 : dialogResult.monto * -1;
                      }
                    }
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
}
