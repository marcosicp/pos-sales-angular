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
import { ProductosUrl } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  products = [];
  productTypes = ['HIERRO', 'PALOS'];
  ticket: Productos[];
  cartTotal = 0;
  cartNumItems = 0;
  items;
  productosPedido: ProductoPedido[] = [];
  total = 0;
  vuelto = 0;
  pagaCon = 0;

  dataSource = new MatTableDataSource<ProductoPedido>();

  constructor(private ticketSync: PosService, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
    this.ticketSync.currentTotal.subscribe(total => this.cartTotal = total);
    this.ticketSync.currentCartNum.subscribe(num => this.cartNumItems);

    if (this.dataService.productos.length) {
      this.products = this.dataService.productos;
      this.loadData();
    } else {
      this.getData();
    }
    // this.products[0] = this.db.getDrink();
    // this.products[1] = this.db.getFood();
  }

  getData() {
    // this.isLoading = true;
    this.dataService.getAsync(ProductosUrl.getAll, this.dataService.productos).subscribe(
      data => {
        this.products[0]=[];
        data.forEach(element => {

          this.products[0].push(element);
        });
        // this.products[0] = data;
        this.loadData();
      },
      error => {
        console.log(error);
        // this.isLoading = false;
      }
    );
  }

  loadData() {
    // this.dataSource = new MatTableDataSource<Pedido>();
    // this.dataSource.data = this.pedidos;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.isLoading = false;
  }


  addToCheck(item: Productos) {
    // If the item already exists, add 1 to quantity
    if (this.ticket.includes(item)) {
      this.ticket[this.ticket.indexOf(item)].cantidad += 1;
    } else {
      item.cantidad=1;
      this.ticket.push(item);
    }
    this.calculateTotal();
  }

  // Calculate cart total
  calculateTotal() {
    let total = 0;
    let cartNum = 0;
    // Multiply item price by item quantity, add to total
    this.ticket.forEach(function(item: Productos) {
      total += (item.precioVenta * item.cantidad);
      cartNum += item.cantidad;
    });
    this.cartTotal = total;
    this.cartNumItems = cartNum;
    this.ticketSync.updateNumItems(this.cartNumItems);
    this.ticketSync.updateTotal(this.cartTotal);
  }

  agregarProducto(value: string) {
    const productoPedidoFiltro = this.productosPedido.filter(x => x.codigo === value);
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
          nuevoProductoPedido.codigo = agregarProd.codigo;
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
    const dialogRef = this.dialog.open(DialogBuscarProductoComponent, { panelClass: 'my-full-screen-dialog' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        this.addToCheck(result);
        this.total += result.precioVenta;
        this.actualizarVuelto();

        debugger;
        const filtroProductos = this.productosPedido.filter(x => x.codigo === result.codigo);
        if (filtroProductos.length) {
          const productoPedido = filtroProductos[0];
          productoPedido.cantidad += 1;
          productoPedido.precioVenta += productoPedido.precioVenta;
        } else {
          const nuevoProductoPedido = new ProductoPedido();
          nuevoProductoPedido.cantidad = 1;
          nuevoProductoPedido.codigo = result.codigo;
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
      const dialogRef = this.dialog.open(DialogCajaCerradaComponent, { width: '900px' });

      dialogRef.afterClosed().subscribe(result => {
        const nuevaPedido = new Pedido();
          const ventaOk = [Pedido];

          // nuevaPedido.usuarioVendio = this.usuario;
          nuevaPedido.ProductosPedidos = this.productosPedido;
          nuevaPedido.FechaPedido = new Date();
          nuevaPedido.FechaPedido.setHours(nuevaPedido.FechaPedido.getHours() - 3)
          nuevaPedido.Total = this.total;
          nuevaPedido.ImprimioTicket = true;

        if (result === true) {
          // Guardar venta
          this.dataService.createAsync('ventas', nuevaPedido, ventaOk).subscribe(
            data => {
              const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' });
              dialogRef.afterClosed().subscribe(result => {
                // Imprimir ticket
              this.resetear();
              // this.openSnackBar('Imprimiendo ticket!', 'Aguarde');
              });
            },
            error => {
              const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
              dialogRef.afterClosed().subscribe(result => {
                debugger;

              });
            }
          );
        } else if (result === false) {
          // Guardar venta sin ticket
          nuevaPedido.ImprimioTicket = false;
          this.dataService.createAsync('ventas', nuevaPedido, ventaOk).subscribe(
            data => {
              const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' });
              dialogRef.afterClosed().subscribe(result => {
                this.resetear();
                // this.openSnackBar('Pedido guardada!', 'Gracias');
              });

            },
            error => {
              const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
              dialogRef.afterClosed().subscribe(result => {
                debugger;

              });
            }
          );
        }
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
