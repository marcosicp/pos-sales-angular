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

  /*
      CUANDO SE HACE UNA DE LAS 4 ACCIONES ENLISTADAS DEBAJO, SE EJECUTA UNA FUNCION PARA
    REDUCIR LA CANTIDA DE CODIGO INNECESARIO.
  */
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

  /*
      AL INICIAR LA FUNCION, SE HARA UNA LLAMADA API PARA SABER EL ESTADO DE CAJA DEL NEGOCIO
    , EN CASO DE VER QUE EL PRIMER ELEMENTO (PORQUE DEVUELVE UN ARRAY) SEA POSITIVO, SE HARA OTRA
    LLAMADA A LA API PARA SABER TODOS LOS MOVIMIENTOS EN EL NEGOCIO, HACIENDO UNA SEGMENTACION ENTRE
    EL TIPO DE MOVIMIENTO (APERTURA Y DEPOSITO AGREGAN UN MONTO, RETIRO REDUCEN DICHO MONTO Y
    CIERRE CORTA CON EL CICLO DE FOREACH)
  */
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

  /*
      AL INICIAR LA FUNCION, SE FIJA QUE LA CAJA ESTE CERRADA Y SE QUIERA HACER UN DEPOSITO O
    RETIRO. EN CASO DE SER CIERTO, SE MUESTRA UNA PANTALLA ADVIRTIENDO QUE SE DEBE ABRIR LA CAJA
    PRIMERO.
      EN CASO CONTRARIO, SE INICIA UN DIALOGO (CUYOS DATOS VIENEN COMO UN ARGUMENTO DE LA FUNCION)
    Y SE ESPERA AL RESULTADO QUE DEVOLVERA EL DIALOGO. EN CASO DE DEVOLVER UN MOVIMIENTO (LAS
    VALIDACIONES SE HACEN DESDE EL LADO DEL DIALOGO). SE EJECUTARA UNA LLAMADA API CON LOS DATOS
    DEL DIALOGO Y SE HARA UN CHECKEO EN CASO DE HABERSE RELAIZADO UN REGISTRO DE DEPOSITO O RETIRO.
    EN CASO DE NO SERLO, SE EJECUTRA LA FUNCION PARA OBTENER EL ESTADO DE LA CAJA
  */
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
