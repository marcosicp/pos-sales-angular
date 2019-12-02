import { Component, OnInit} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
// MODELOS
import { Venta } from '../shared/models/venta.model';
import { ProductoPedido } from '../shared/models/producto-venta.model';
// SERVICIOS
import { DataService } from '../core/services/data.service';
// DIALOGOS
import { DialogVerItemsPedidoComponent } from '../dialogs/dialog-ver-items-venta/dialog-ver-items-venta.component';
import { DialogSinConexionComponent } from '../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
// CONFIGURACIONES
import { URL_VENTAS } from '../shared/configs/urls.config';
import { TABLA_VENTAS } from '../shared/configs/table.config';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventas: Venta[];
  total: number;
  productosVenta: ProductoPedido[] = [];

  tableTitle = TABLA_VENTAS.title;
  dataSource = new MatTableDataSource<Venta>();
  headerTitles = Object.keys(TABLA_VENTAS.cells);
  tableHeaders = TABLA_VENTAS.headers;
  columnCells = TABLA_VENTAS.cells;
  formatTableCells = TABLA_VENTAS.format;
  isLoading: boolean;

  constructor(
    private router: Router,
    private comerciosService: DataService,
    public dialog: MatDialog
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.comerciosService.getAsync(URL_VENTAS.GET_ALL, this.productosVenta).subscribe(
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
          buttonEvent: (venta) => this.verItems(venta.pedido)
        },
        {
          buttonIcon: 'event',
          buttonLabel: 'Pactar entrega',
          buttonEvent: (venta) => this.pactarEntrega(venta)
        }];
        this.isLoading = false;
      },
    );
  }

  pactarEntrega(venta: Venta) {
    const navigationExtras: NavigationExtras = {
      queryParams: { idventa: JSON.stringify(venta.id)}
    };
    this.router.navigate(['agenda'], navigationExtras);
  }

  verItems(pedido: any) {
    const dialogRef = this.dialog.open(
      DialogVerItemsPedidoComponent,
      {
        width: '900px',  disableClose: true,
        data: pedido
      });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
