import { Component, OnInit} from '@angular/core';
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
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  totalVentasMes: number = 0;
  totalVentasHoy: number = 0;
  totalVentasTransferenciaMes: number = 0;
  totalVentasMercadoPagoMes: number = 0;
  totalVentasUnaCuotaMes: number = 0;
  totalVentasTresCuotasMes: number = 0;
  totalVentasDebitoMes: number = 0;
  totalVentasDebitoHoy: number = 0;
  totalVentasCuentaCorrienteMes: number = 0;
  totalVentasEfectivoMes: number = 0;
  totalVentasTransferenciaHoy: number = 0;
  totalVentasMercadoPagoHoy: number = 0;
  totalVentasUnaCuotaHoy: number = 0;
  totalVentasTresCuotasHoy: number = 0;
  totalVentasCuentaCorrienteHoy: number = 0;
  totalVentasEfectivoHoy: number = 0;

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
          buttonEvent: (venta) => this.verItems(venta)
        },
        ];
        this.isLoading = false;
      },
    );

    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_HOY, []).subscribe(
      data => {
        this.totalVentasHoy = data;
      },
    );
    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_MES, []).subscribe(
      data => {
        this.totalVentasMes = data;
      },
    );

    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_EFECTIVO_HOY, []).subscribe(
      data => {
        this.totalVentasEfectivoHoy = data;
      },
    );
    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_EFECTIVO_MES, []).subscribe(
      data => {
        this.totalVentasEfectivoMes = data;
      },
    );

    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_MERCADOPAGO_MES, []).subscribe(
      data => {
        this.totalVentasMercadoPagoMes = data;
      },
    );
    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_MERCADOPAGO_HOY, []).subscribe(
      data => {
        this.totalVentasMercadoPagoHoy = data;
      },
    );


    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_DEBITO_HOY, []).subscribe(
      data => {
        this.totalVentasDebitoHoy = data;
      },
    );
    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_DEBITO_MES, []).subscribe(
      data => {
        this.totalVentasDebitoMes = data;
      },
    );


    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_UNACUOTA_DIA, []).subscribe(
      data => {
        this.totalVentasUnaCuotaHoy = data;
      },
    );
    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_UNACUOTA_MES, []).subscribe(
      data => {
        this.totalVentasUnaCuotaMes = data;
      },
    );

    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_TRESCUOTAS_DIA, []).subscribe(
      data => {
        this.totalVentasTresCuotasHoy = data;
      },
    );
    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_TRESCUOTAS_MES, []).subscribe(
      data => {
        this.totalVentasTresCuotasMes = data;
      },
    );

    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_TRANSFERENCIA_HOY, []).subscribe(
      data => {
        this.totalVentasTransferenciaHoy = data;
      },
    );
    this.comerciosService.getOneAsync(URL_VENTAS.GET_VENTAS_TRANSFERENCIA_MES, []).subscribe(
      data => {
        this.totalVentasTransferenciaMes = data;
      },
    );
  }

  verItems(pedido: any) {
    this.dialog.open(
      DialogVerItemsPedidoComponent,
      {
        width: '80%',
        disableClose: true,
        data: pedido
      });
  }
}
