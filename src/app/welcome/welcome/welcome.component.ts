import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
// DIALOGOS
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogAdvertenciaComponent } from '../../dialogs/dialog-advertencia/dialog-advertencia.component';
// CONFIGURACIONES
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  cajaAbierta = false;

  constructor(
    private router: Router,
    private comerciosService: DataService,
    public loadingService: LoadingService,
    public dialog: MatDialog
  ) {
    this.consultarEstadoCaja();
  }

  ngOnInit() { }

  test() {
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
