import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
// MODELOS
import { Venta } from '../../shared/models/venta.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// DIALOGOS
import { DialogVerItemsPedidoComponent } from '../../dialogs/dialog-ver-items-venta/dialog-ver-items-venta.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogAdvertenciaComponent } from '../../dialogs/dialog-advertencia/dialog-advertencia.component';
// CONFIGURACIONES
import { URL_PEDIDOS } from '../../shared/configs/urls.config';
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';
import { TABLA_PEDIDOS } from '../../shared/configs/table.config';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  tableTitle = TABLA_PEDIDOS.title;
  dataSource = new MatTableDataSource<Venta>();
  headerTitles = Object.keys(TABLA_PEDIDOS.cells);
  tableHeaders = TABLA_PEDIDOS.headers;
  columnCells = TABLA_PEDIDOS.cells;
  formatTableCells = TABLA_PEDIDOS.format;
  isLoading: boolean;
  addButton = {
    label: 'Registrar pedido',
    buttonEvent: () => this.registrarPedido()
  };
  cajaAbierta: boolean;

  constructor(
    private router: Router,
    private comerciosService: DataService,
    public dialog: MatDialog
  ) {
    this.isLoading = true;
    this.consultarEstadoCaja();
  }

  ngOnInit() {
    this.comerciosService.getAsync(URL_PEDIDOS.GET_ALL, []).subscribe(
      data => {
        if (!data) {
          const dialogRef = this.dialog.open(
            DialogSinConexionComponent,
            { width: '900px',  disableClose: true}
          );

          dialogRef.afterClosed().subscribe(() => this.router.navigate(['welcome']));
        }

        this.dataSource.data = data;
        this.columnCells.opciones = [{
            buttonIcon: 'search',
            buttonLabel: 'Ver detalle',
            buttonEvent: (venta) => this.verItems(venta)
          }, {
            buttonIcon: 'done_all',
            buttonLabel: 'Confirmar pedido',
            canDisplay: (venta) => venta.estado !== 'CONFIRMADO',
            buttonEvent: (venta) => this.confirmarPedido(venta)
          }];
        this.isLoading = false;
      }
    );


  }

  registrarPedido() {
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

      dialogRef.afterOpened().subscribe(
        () => this.consultarEstadoCaja()
      );
    }
  }

  public confirmarPedido(element: Venta) {
    const navigationExtras: NavigationExtras = {
        queryParams: { pedido: JSON.stringify(element)}
    };

    this.router.navigate(['confirmacion'], navigationExtras);
  }

  verItems(venta) {
    const dialogRef = this.dialog.open(
      DialogVerItemsPedidoComponent,
      {
        width: '80%',
        disableClose: true,
        data: venta
      });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  consultarEstadoCaja() {
    this.comerciosService.getAsync(URL_MOVIMIENTOS.GET_ESTADO, []).subscribe(
      result => this.cajaAbierta = result[0],
      error => {
        this.dialog.open(
          DialogSinConexionComponent,
          { width: '600px', disableClose: true }
        );
      }
    );
  }
}
