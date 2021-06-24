import { LoadingService } from './../../shared/services/loading.service';
import { DialogOperacionOkComponent } from './../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';

// MODELOS
import { Venta } from '../../shared/models/venta.model';
import { ProductoPedido } from '../../shared/models/producto-venta.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// DIALOGOS
import { DialogVerItemsPedidoComponent } from '../../dialogs/dialog-ver-items-venta/dialog-ver-items-venta.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
// CONFIGURACIONES
import { URL_MOVIMIENTOS, URL_VENTAS } from '../../shared/configs/urls.config';
import { TABLA_VENTAS } from '../../shared/configs/table.config';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  totalVentasMes = 0;
  totalVentasHoy = 0;
  totalVentasTransferenciaMes = 0;
  totalVentasMercadoPagoMes = 0;
  totalVentasUnaCuotaMes = 0;
  totalVentasTresCuotasMes = 0;
  totalVentasDebitoMes = 0;
  totalVentasPedidosYaMes = 0;
  totalVentasDebitoHoy = 0;
  totalVentasCuentaCorrienteMes = 0;
  totalVentasEfectivoMes = 0;
  totalVentasTransferenciaHoy = 0;
  totalVentasMercadoPagoHoy = 0;
  totalVentasUnaCuotaHoy = 0;
  totalVentasTresCuotasHoy = 0;
  totalVentasCuentaCorrienteHoy = 0;
  totalVentasPedidosYaHoy = 0;
  totalVentasEfectivoHoy = 0;

  ventas: Venta[];
  total: number;
  productosVenta: ProductoPedido[] = [];

  /*
    TABLETITLE: TITULO DE LA TABLA
    DATASOURCE: EL CONJUNTO DE DATOS QUE SE MOSTRARA EN LA TABLE
    HEADERTITLES: LOS NOMBRES DE LAS COLUMNAS QUE SE USARAN COMO RELACION PARA CREAR CADA UNA
    TABLEHEADERS: LOS TITULOS DE CADA COLUMNA, HACIENDO REFERENCIA LA DATO QUE SE VA A MOSTRAR
    COLUMNCELLS: EL CONJUNTO DE PROPIEDADES DEL OBJETO (PUEDE SER UNA PROPIEDAD O LA PROPIEDAD DENTRO DE UN OBJETO QUE RESULTA SER OTRA PROPEIDAD)
    FORMATTABLECELLS: EL CONJUNTO DE FORMATOS QUE LLEVARA CADA PROPIEDAD PARA MOSTRARSE DE UNA FORMA AL USUARIO
    ISLOADING: USADO PARA MOSTRAR LA ANIMACION AL USUARIO MIENTRAS SUCEDE LA CARGA DE DATOS
  */
  tableTitle = TABLA_VENTAS.title;
  dataSource = new MatTableDataSource<Venta>();
  headerTitles = Object.keys(TABLA_VENTAS.cells);
  tableHeaders = TABLA_VENTAS.headers;
  columnCells = TABLA_VENTAS.cells;
  formatTableCells = TABLA_VENTAS.format;
  isLoading: boolean;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private comerciosService: DataService,
    public dialog: MatDialog
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    /*
        CUANDO SE TERMINA LA LLAMADA A LA API, SE FIJA QUE HAYA TRAIDO DATOS
      EN CASO DE NO TRAER DATOS (DEVUELVA UN VALOR COMO NULL O UNDEFINED),
      SE MUESTRA AL USUARIO UNA ADVERTENCIA QUE NO HAY CONEXION A INTERNET
        EN CASO DE FUNCIONAR, SE ASIGNA LOS DATOS TRAIDOS DE LA API Y SE CREAN
      LOS BOTONES ADICIONALES CON SU FUNCION PARA MOSTRARSE Y LA LOGICA QUE HARAN
      CUANDO SE LES HAGA CLICK (ESA LOGICA FUNCIONA EN ESTE COMPONENTE, NO EN LA TABLA)
    */
    this.comerciosService
      .getAsync(URL_VENTAS.GET_ALL, this.productosVenta)
      .subscribe((data: Venta[]) => {
        if (!data) {
          const dialogRef = this.dialog.open(DialogSinConexionComponent, {
            width: '900px',
            disableClose: true,
          });
          dialogRef
            .afterClosed()
            .subscribe(() => this.router.navigate(['welcome']));
        }

        this.dataSource.data = data;
        this.columnCells.opciones = [
          {
            buttonIcon: 'search',
            buttonLabel: 'Ver detalle',
            buttonEvent: (venta: any) => this.verItems(venta),
          },
          {
            buttonIcon: 'ok',
            buttonLabel: 'NOTIFICAR PAGO',
            buttonEvent: (venta: Venta) => this.notificarPago(venta),
          },
        ];
        this.isLoading = false;
      });

    this.initValuesReport();
  }

  initValuesReport() {
    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_HOY, [])
      .subscribe((data: number) => {
        this.totalVentasHoy = data;
      });
    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_MES, [])
      .subscribe((data: number) => {
        this.totalVentasMes = data;
      });

    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_EFECTIVO_HOY, [])
      .subscribe((data: number) => {
        this.totalVentasEfectivoHoy = data;
      });
    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_EFECTIVO_MES, [])
      .subscribe((data: number) => {
        this.totalVentasEfectivoMes = data;
      });

    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_MERCADOPAGO_MES, [])
      .subscribe((data: number) => {
        this.totalVentasMercadoPagoMes = data;
      });
    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_MERCADOPAGO_HOY, [])
      .subscribe((data: number) => {
        this.totalVentasMercadoPagoHoy = data;
      });

    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_DEBITO_HOY, [])
      .subscribe((data: number) => {
        this.totalVentasDebitoHoy = data;
      });
    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_DEBITO_MES, [])
      .subscribe((data: number) => {
        this.totalVentasDebitoMes = data;
      });

    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_UNACUOTA_DIA, [])
      .subscribe((data: number) => {
        this.totalVentasUnaCuotaHoy = data;
      });
    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_UNACUOTA_MES, [])
      .subscribe((data: number) => {
        this.totalVentasUnaCuotaMes = data;
      });

    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_TRESCUOTAS_DIA, [])
      .subscribe((data: number) => {
        this.totalVentasTresCuotasHoy = data;
      });
    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_TRESCUOTAS_MES, [])
      .subscribe((data: number) => {
        this.totalVentasTresCuotasMes = data;
      });

    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_TRANSFERENCIA_HOY, [])
      .subscribe((data: number) => {
        this.totalVentasTransferenciaHoy = data;
      });
    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_TRANSFERENCIA_MES, [])
      .subscribe((data: number) => {
        this.totalVentasTransferenciaMes = data;
      });

    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_PY_HOY, [])
      .subscribe((data: number) => {
        this.totalVentasPedidosYaHoy = data;
      });

    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_CUENTACORRIENTE_HOY, [])
      .subscribe((data: number) => {
        this.totalVentasCuentaCorrienteHoy = data;
      });
    this.comerciosService
      .getOneAsync(URL_VENTAS.GET_VENTAS_PY_MES, [])
      .subscribe((data: number) => {
        this.totalVentasPedidosYaMes = data;
      });
  }

  notificarPago(venta: Venta) {
    venta['pendiente'] = false;
    this.loadingService.toggleLoading();
    this.comerciosService.postAsync('ventas/NotificarPago', venta).subscribe(
      (data: any) => {
        this.loadingService.toggleLoading();

        // tslint:disable-next-line: no-shadowed-variable
        const dialogRef = this.dialog.open(DialogOperacionOkComponent, {
          width: '600px',
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result) => {});
      },
      (error: any) => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, {
          width: '600px',
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result) => {});
      }
    );
  }

  verItems(venta: any) {
    this.dialog.open(DialogVerItemsPedidoComponent, {
      width: '80%',
      disableClose: true,
      data: venta,
    });
  }
}
