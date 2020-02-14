import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
// IMPORTAR SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
// IMPORTAR DIALOGOS
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogAdvertenciaComponent } from '../../dialogs/dialog-advertencia/dialog-advertencia.component';
// IMPORTAR CONFIGURACIONES
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  cajaAbierta = false;

  constructor(
    private router: Router,
    private comerciosService: DataService,
    public loadingService: LoadingService,
    public dialog: MatDialog
  ) {
    this.consultarEstadoCaja();
  }

  // CHECKEA QUE LA CAJA ESTE CERRADA (SE INICIA EN EL CONSTRUCTOR), SI LO ESTA, APARECE UN CARTEL DE AVISO. CASO CONTRARIO, ENVIA A LA PANTALLA PARA AGREGAR UN PEDIDO
  checkearCajaCerrada() {
    if (this.cajaAbierta) {
      this.router.navigate(['home']);
    } else {
      const dialogRef = this.dialog.open(
        DialogAdvertenciaComponent, {
          data: {
            title: 'Caja cerrada',
            confirmText: 'No se podrán registrar pedidos hasta que se abra la caja.'
          }
        }
      );

      dialogRef.afterClosed().subscribe(
        () => this.consultarEstadoCaja()
      );
    }
  }

  consultarEstadoCaja() {
    this.loadingService.toggleLoading();

    this.comerciosService.getAsync(URL_MOVIMIENTOS.GET_ESTADO, []).subscribe(
      result => {
        this.loadingService.toggleLoading();
        this.cajaAbierta = result[0]
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
