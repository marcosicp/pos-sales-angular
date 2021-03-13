import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Productos } from '../../shared/models/producto.model';
import { PosService } from '../../core/services/pos.service';
import { DataService } from '../../core/services/data.service';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import {MatTabsModule} from '@angular/material';
import { DebugRenderer2 } from '@angular/core/src/view/services';
import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { DialogCajaCerradaComponent } from '../../dialogs/dialog-caja-cerrada/dialog-caja-cerrada.component';
import { DialogBuscarProductoComponent } from '../../dialogs/dialog-buscar-producto/dialog-buscar-producto.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { Pedido } from '../../shared/models/pedido.model';
import { URL_STOCK } from '../../shared/configs/urls.config';
import { LoadingService } from '../../shared/services/loading.service';
// MOCKS
import categoriasMock from '../../shared/mocks/categorias.mock';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  products = [];
  productTypes = categoriasMock.sort((a, b) => a.nombre > b.nombre ? 1 : -1).map(item => item.nombre);
  ticket: Productos[];
  cartTotal = 0;
  cartNumItems = 0;
  // cartPeso = 0;
  items;
  productosPedido: ProductoPedido[] = [];
  total = 0;
  vuelto = 0;
  pagaCon = 0;

  dataSource = new MatTableDataSource<ProductoPedido>();

  constructor(
    private ticketSync: PosService,
    private dataService: DataService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
    this.ticketSync.currentTotal.subscribe(total => this.cartTotal = total);
    this.ticketSync.currentCartNum.subscribe(num => this.cartNumItems);

    this.loadingService.toggleLoading();

    this.dataService.getAsync(URL_STOCK.GET_ALL, this.dataService.productos).subscribe(
      data => {
        data.forEach(
          item => {
            // item.precioVenta = item.precioCompra * (1 + ((categoriasMock.find(_item => _item.nombre === item.categoria || _item.nombre === 'OTROS')).ganancia / 100))
          }
        )

        this.productTypes.forEach(
          (item, index) => this.products[index] = [...data.filter(element => element.categoria === item)]
        );

        this.loadingService.toggleLoading();
      }
    );


    // this.dataService.getAsync(URL_STOCK.GET_ALL_CATEGORIAS, this.dataService.productos).subscribe(
    //   data => {
    //     data.forEach(
    //       item => {
    //         item.precioVenta = item.precioCompra * (1 + ((categoriasMock.find(_item => _item.nombre === item.categoria || _item.nombre === 'OTROS')).ganancia / 100))
    //       }
    //     )

    //     this.productTypes.forEach(
    //       (item, index) => this.products[index] = [...data.filter(element => element.categoria === item)]
    //     );

    //     this.loadingService.toggleLoading();
    //   }

    // );
  }

  addToCheck(item: Productos) {
    // If the item already exists, add 1 to quantity
    if (this.ticket.includes(item)) {
      this.ticket[this.ticket.indexOf(item)].cantidad += 1;
    } else {
      item.cantidad = 1;
      this.ticket.push(item);
    }
    this.calculateTotal();
  }

  // Calculate cart total
  calculateTotal() {
    let total = 0;
    let peso = 0;
    let cartNum = 0;
    // Multiply item price by item quantity, add to total
    this.ticket.forEach(function(item: Productos) {
      total += (item.precioVenta * item.cantidad);
      // peso += (item.peso * item.cantidad);
      cartNum += item.cantidad;
    });
    this.cartTotal = total;
    this.cartNumItems = cartNum;
    // this.cartPeso = peso;
    this.ticketSync.updateNumItems(this.cartNumItems);
    this.ticketSync.updateTotal(this.cartTotal);
    // this.ticketSync.updatePeso(this.cartPeso);

  }

  agregarProducto(value: string) {
    const productoPedidoFiltro = this.productosPedido.filter(x => x.codigoProv === value);
    if (productoPedidoFiltro.length) {
      // existe en el ticket
      const productoPedido = productoPedidoFiltro[0];
      // this.zone.run(() => {
        productoPedido.cantidad += 1;
        this.total += productoPedido.precioVenta;
      // });
        this.actualizarVuelto();
    } else {
      const productoFiltro = this.dataService.productos.filter(x => x.codigo === value);
      if (productoFiltro.length) {
        // this.zone.run(() => {
          const agregarProd = productoFiltro[0];
          const nuevoProductoPedido = new ProductoPedido();
          nuevoProductoPedido.cantidad = 1;
          nuevoProductoPedido.id = agregarProd.id;
          nuevoProductoPedido.idProducto = agregarProd.id;
          nuevoProductoPedido.codigoProv = agregarProd.codigo;
          nuevoProductoPedido.precioCompra = agregarProd.precioCosto;
          nuevoProductoPedido.precioVenta = agregarProd.precioVenta;
          nuevoProductoPedido.producto = agregarProd.producto;
          this.productosPedido.push(nuevoProductoPedido);
          this.total += nuevoProductoPedido.precioVenta;
          this.actualizarVuelto();
        // });
      } else {
        // TODO alert producto no encontrado
      }
    }
    this.dataSource.data = this.productosPedido;
  }

  buscarProducto() {
    const dialogRef = this.dialog.open(
      DialogBuscarProductoComponent, {
        panelClass: 'my-full-screen-dialog',
        width: '80%',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        ;
        this.addToCheck(result);
        this.total += result.precioVenta;
        this.actualizarVuelto();

        ;
        const filtroProductos = this.productosPedido.filter(x => x.codigoProv === result.codigo);
        if (filtroProductos.length) {
          const productoPedido = filtroProductos[0];
          productoPedido.cantidad += 1;
          productoPedido.precioVenta += productoPedido.precioVenta;
        } else {
          const nuevoProductoPedido = new ProductoPedido();
          nuevoProductoPedido.cantidad = 1;
          nuevoProductoPedido.codigoProv = result.codigo;
          nuevoProductoPedido.idProducto = result.id;
          nuevoProductoPedido.precioCompra = result.precioCosto;
          nuevoProductoPedido.precioVenta = result.precioVenta;
          nuevoProductoPedido.producto = result.producto;
          this.productosPedido.push(nuevoProductoPedido);
        }

        this.dataSource.data = this.productosPedido;
      }
    });
  }

  cerrarTicket() {
    if (this.productosPedido.length === 0) {
      // this.openSnackBar('NO HAY ITEMS CARGADOS EN EL CHANGO!', 'ATENCION');
      return;
    } else {
      let prodsDesc = '';
      const dialogRef = this.dialog.open(DialogCajaCerradaComponent, { width: '900px' ,  disableClose: true });

      dialogRef.afterClosed().subscribe(result => {
        const nuevaPedido = new Pedido();
          const ventaOk = [Pedido];

          // nuevaPedido.usuarioVendio = this.usuario;
          nuevaPedido.productosPedidos = this.productosPedido;
          nuevaPedido.fechaPedido = new Date();
          
          nuevaPedido.fechaPedido.setHours(nuevaPedido.fechaPedido.getHours() - 3)
          nuevaPedido.total = this.total;
          nuevaPedido.imprimioTicket = true;

        if (result === true) {
          nuevaPedido.tipoTransaccion = 'Efectivo';
          // Guardar venta
          
        } else {
          nuevaPedido.tipoTransaccion = 'Tarjeta';
        }

        this.dataService.createAsync('ventas', nuevaPedido, ventaOk).subscribe(
          data => {
            const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' ,  disableClose: true });
            dialogRef.afterClosed().subscribe(result => {
              // Imprimir ticket
            this.resetear();
            // this.openSnackBar('Imprimiendo ticket!', 'Aguarde');
            });
          },
          error => {
            const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
            dialogRef.afterClosed().subscribe(result => {

            });
          }
        );
        // else if (result === false) {
        //   // Guardar venta sin ticket
        //   nuevaPedido.imprimioTicket = false;
        //   this.dataService.createAsync('ventas', nuevaPedido, ventaOk).subscribe(
        //     data => {
        //       const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' ,  disableClose: true });
        //       dialogRef.afterClosed().subscribe(result => {
        //         this.resetear();
        //         // this.openSnackBar('Pedido guardada!', 'Gracias');
        //       });

        //     },
        //     error => {
        //       const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
        //       dialogRef.afterClosed().subscribe(result => {

        //       });
        //     }
        //   );
        // }
      });
    }
  }

  resetear() {
    this.productosPedido = [];
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
