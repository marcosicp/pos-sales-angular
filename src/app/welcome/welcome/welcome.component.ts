import { Component, OnInit } from '@angular/core';
import { EstadoCaja } from '../../shared/models/estado-caja.model';
import { DataService } from '../../core/services/data.service';
import { MatDialog  } from '@angular/material';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  result: EstadoCaja[] = [];
  estadoCaja: EstadoCaja = new EstadoCaja();
  usuario = '';

  constructor(
    private dialog: MatDialog,
    private comerciosService: DataService
  ) {
    this.comerciosService.getAsync(URL_MOVIMIENTOS.GET_ESTADO, []).subscribe(
      data => this.estadoCaja.estado = data[0] ? 'ABIERTA' : 'CERRADA',
      error => {
        this.dialog.open(
          DialogSinConexionComponent,
          { width: '600px', disableClose: true }
        );
      }
    );
   }

  ngOnInit() {

  }

  verEstado() {
    return this.estadoCaja.estado === 'ABIERTA';
  }
}
