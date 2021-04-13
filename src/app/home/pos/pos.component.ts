import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { Productos } from "../../shared/models/producto.model";
import { PosService } from "../../core/services/pos.service";
import { DataService } from "../../core/services/data.service";
import {
  MatDialog,
  MatTableDataSource,
  MatSnackBar,
  MatPaginator,
} from "@angular/material";
import { MatTabsModule } from "@angular/material";
import { MatSort } from "@angular/material/sort";
import { DebugRenderer2 } from "@angular/core/src/view/services";
import { ProductoPedido } from "../../shared/models/producto-venta.model";
import { DialogCajaCerradaComponent } from "../../dialogs/dialog-caja-cerrada/dialog-caja-cerrada.component";
import { DialogBuscarProductoComponent } from "../../dialogs/dialog-buscar-producto/dialog-buscar-producto.component";
import { DialogSinConexionComponent } from "../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component";
import { DialogOperacionOkComponent } from "../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component";
import { Pedido } from "../../shared/models/pedido.model";
import { URL_STOCK } from "../../shared/configs/urls.config";
import { LoadingService } from "../../shared/services/loading.service";
// MOCKS
import categoriasMock from "../../shared/mocks/categorias.mock";

@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.scss"],
})
export class PosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products = [];
  productTypes = categoriasMock
    .sort((a, b) => (a.nombre > b.nombre ? 1 : -1))
    .map((item) => item.nombre);
  ticket: Productos[];
  cartTotal = 0;
  cartNumItems = 0;
  // cartPeso = 0;
  items;
  productosPedido: ProductoPedido[] = [];
  total = 0;
  vuelto = 0;
  pagaCon = 0;
  displayedColumns: string[] = [
    "codigo",
    "producto",
    "cantidad",
    "precioVenta",
  ];
  productos: MatTableDataSource<Productos>;
  dataSource = new MatTableDataSource<ProductoPedido>();

  constructor(
    private ticketSync: PosService,
    private dataService: DataService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ticketSync.currentTicket.subscribe((data) => (this.ticket = data));
    this.ticketSync.currentTotal.subscribe((total) => (this.cartTotal = total));
    this.ticketSync.currentCartNum.subscribe((num) => this.cartNumItems);

    this.loadingService.toggleLoading();

    if (this.dataService.productos && this.dataService.productos.length) {
      this.productos = new MatTableDataSource(this.dataService.productos);
    } else {
      this.dataService
        .getAsync(URL_STOCK.GET_ALL, this.dataService.productos)
        .subscribe((data) => {
          this.productos = new MatTableDataSource<Productos>(data);
          this.productos.paginator = this.paginator;
          this.productos.sort = this.sort;
        });
    }

    this.loadingService.toggleLoading();
  }

  applyFilter(filterValue: string) {
    this.productos.filter = filterValue.trim().toLowerCase();
  }

  selectRow(result) {
    if (result) {
      this.addToCheck(result);
      this.total += result.precioVenta;
      this.actualizarVuelto();
    }
  }

  addToCheck(item: Productos) {
    // If the item already exists, add 1 to quantity
    if (
      this.ticket.some(
        (i) => i.nombre === item.nombre && i.codigo === item.codigo
      )
    ) {
      var prodTicket = this.ticket.find(
        (i) => i.nombre === item.nombre && i.codigo === item.codigo
      );
      prodTicket.cantidad += 1;
    } else {
      var prodTicket = Object.assign({}, item);
      prodTicket.cantidad = 1;
      prodTicket.descuento = 0;
      this.ticket.push(prodTicket);
    }
    this.calculateTotal();
  }

  // Calculate cart total
  calculateTotal() {
    let total = 0;
    let peso = 0;
    let cartNum = 0;
    // Multiply item price by item quantity, add to total
    this.ticket.forEach(function (item: Productos) {
      total += item.precioVenta * item.cantidad;
      cartNum += item.cantidad;
    });
    this.cartTotal = total;
    this.cartNumItems = cartNum;
    // this.cartPeso = peso;
    this.ticketSync.updateNumItems(this.cartNumItems);
    this.ticketSync.updateTotal(this.cartTotal);
    // this.ticketSync.updatePeso(this.cartPeso);
  }

  ngAfterViewInit() {
    // this.productos.paginator = this.paginator;
    // this.productos.sort = this.sort;
  }

  cerrarTicket() {
    if (this.productosPedido.length === 0) {
      // this.openSnackBar('NO HAY ITEMS CARGADOS EN EL CHANGO!', 'ATENCION');
      return;
    } else {
      let prodsDesc = "";
      const dialogRef = this.dialog.open(DialogCajaCerradaComponent, {
        width: "900px",
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        const nuevaPedido = new Pedido();
        const ventaOk = [Pedido];

        // nuevaPedido.usuarioVendio = this.usuario;
        nuevaPedido.productosPedidos = this.productosPedido;
        nuevaPedido.fechaPedido = new Date();

        nuevaPedido.fechaPedido.setHours(
          nuevaPedido.fechaPedido.getHours() - 3
        );
        nuevaPedido.total = this.total;
        nuevaPedido.imprimioTicket = true;

        if (result === true) {
          nuevaPedido.tipoTransaccion = "Efectivo";
          // Guardar venta
        } else {
          nuevaPedido.tipoTransaccion = "Tarjeta";
        }

        this.dataService.createAsync("ventas", nuevaPedido, ventaOk).subscribe(
          (data) => {
            const dialogRef = this.dialog.open(DialogOperacionOkComponent, {
              width: "600px",
              disableClose: true,
            });
            dialogRef.afterClosed().subscribe((result) => {
              // Imprimir ticket
              this.resetear();
              // this.openSnackBar('Imprimiendo ticket!', 'Aguarde');
            });
          },
          (error) => {
            const dialogRef = this.dialog.open(DialogSinConexionComponent, {
              width: "600px",
              disableClose: true,
            });
            dialogRef.afterClosed().subscribe((result) => {});
          }
        );
      });
    }
  }

  resetear() {
    this.productosPedido = [];
    this.ticket = [];
    this.dataSource.data = this.productosPedido;
    this.total = 0;
    this.pagaCon = 0;
    this.vuelto = 0;
    this.actualizarVuelto();
  }

  actualizarVuelto() {
    if (this.pagaCon !== 0) {
      const vuelto = this.pagaCon - this.total;
      if (vuelto < 0) {
        this.vuelto = 0;
      } else {
        this.vuelto = vuelto;
      }
    }
  }
  // syncTicket() {
  //   this.ticketSync.changeTicket(this.ticket);
  // }
}
