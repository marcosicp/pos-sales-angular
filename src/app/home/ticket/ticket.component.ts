import { Component, OnInit } from "@angular/core";
import { NgSelectConfig } from "@ng-select/ng-select";
import { Router, NavigationExtras } from "@angular/router";
import { MatDialog, MatSelectChange } from "@angular/material";
// MODELOS
import { Productos } from "../../shared/models/producto.model";
import { Usuarios } from "../../shared/models/usuarios.model";
import { Clientes } from "../../shared/models/clientes.model";
import { Venta } from "../../shared/models/venta.model";
// SERVICIOS
import { PosService } from "../../core/services/pos.service";
import { DataService } from "../../core/services/data.service";
import { ProductoPedido } from "../../shared/models/producto-venta.model";
import { LoadingService } from '../../shared/services/loading.service';
// URLS
import { URL_CLIENTES, URL_CONFIGURACION } from "../../shared/configs/urls.config";
// DIALOGOS
import { DialogCajaCerradaComponent } from "../../dialogs/dialog-caja-cerrada/dialog-caja-cerrada.component";
import { DialogSinConexionComponent } from "../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component";
import { DialogOperacionOkComponent } from "../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component";
import { DialogAdvertenciaComponent } from "../../dialogs/dialog-advertencia/dialog-advertencia.component";
import { DialogConfirmarComponent } from "../../dialogs/dialog-confirmar/dialog-confirmar.component";
import { Configuracion } from "../../../app/shared/models/configuracion.model";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.scss"],
})
export class TicketComponent implements OnInit {
  clientes: Clientes[] = [];
  clientesResponse: Clientes[] = [];
  configuracion: Configuracion = new Configuracion();
  ticket: Productos[] = [];
  isLoading: boolean;
  cartTotal = 0;
  cartTotalOriginal = 0;
  cartNumItems = 0;
  pagaCon = 0;
  vuelto = 0;
  totalIva = 0;
  totalFinal = 0;
  productosPedido: ProductoPedido[] = [];
  total = 0;
  descuento = 0;
  tipoTransaccion: string = "DEBITO";
  clienteId: string = null;
  usuario: Usuarios;
  nuevoPedido: Venta;

  constructor(
    private router: Router,
    private ticketSync: PosService,
    private dataService: DataService,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {
    this.clienteId = null;
  }

  ngOnInit() {
    this.loadingService.toggleLoading();
    this.dataService
      .getAsync(URL_CLIENTES.GET_ALL, this.clientesResponse)
      .subscribe(
        (data) => {
          this.clientes = data;
          this.clientes.forEach((unCliente) => {
            unCliente.displayName = unCliente.nombre + " " + unCliente.cuit;
          });
          this.clienteId = null;
        },
        (error) => {
          const dialogRef = this.dialog.open(DialogSinConexionComponent, {
            width: "600px",
            disableClose: true,
          });
          dialogRef.afterClosed().subscribe(() => {});
          console.log(error);
        }
      );

    this.dataService
      .getOneAsync(URL_CONFIGURACION.GET_ALL, {})
      .subscribe(
        (data) => {
          this.configuracion = data;
        },
        (error) => {
          const dialogRef = this.dialog.open(DialogSinConexionComponent, {
            width: "600px",
            disableClose: true,
          });
          dialogRef.afterClosed().subscribe(() => {});
          console.log(error);
        }
      );
    this.ticketSync.currentTicket.subscribe((data) => (this.ticket = data));
    this.ticketSync.currentTotal.subscribe((total) => {
      this.cartTotal = total;
      this.actualizarTipoTransaccion();
    } );
    this.ticketSync.currentCartNum.subscribe(
      (num) => (this.cartNumItems = num)
    );

    this.ticketSync.currentClienteId.subscribe((cli) => (this.clienteId = cli));
    this.usuario = JSON.parse(localStorage.getItem("currentUser"));
    this.loadingService.toggleLoading();
  }

  updateClienteId(cliente: any) {
    this.ticketSync.updateClienteId(cliente.value);
  }

  // Add item to ticket.
  addItem(item: Productos) {
    // If the item already exists, add 1 to quantity
    if (this.ticket.includes(item)) {
      this.ticket[this.ticket.indexOf(item)].cantidad += 1;
    } else {
      this.ticket.push(item);
    }
    this.syncTicket();
    this.calcularTotal(null, null);
  }

  calcularVuelto() {
    this.vuelto = this.pagaCon - this.cartTotal;
  }

  // Remove item from ticket
  removeItem(item: Productos) {
    // Check if item is in array
    if (this.ticket.includes(item)) {
      // Splice the element out of the array
      const index = this.ticket.indexOf(item);
      if (index > -1) {
        // Set item quantity back to 1 (thus when readded, quantity isn't 0)
        this.ticket[this.ticket.indexOf(item)].cantidad = 1;
        this.ticket.splice(index, 1);
      }
    }
    this.syncTicket();
    this.calcularTotal(null, null);
  }

  // Reduce quantity by one
  subtractOne(item: Productos) {
    // Check if last item, if so, use remove method
    if (this.ticket[this.ticket.indexOf(item)].cantidad === 1) {
      this.removeItem(item);
    } else {
      this.ticket[this.ticket.indexOf(item)].cantidad =
        this.ticket[this.ticket.indexOf(item)].cantidad - 1;
    }
    this.syncTicket();
    this.calcularTotal(null, null);
  }

  calcularDescuento() {
    var total = 0;
    this.ticket.forEach(function (item: Productos) {
      total += item.precioVenta * item.cantidad;
    });

    if (this.descuento != 0) {
      this.cartTotal = total - total * (this.descuento / 100);
    } else {
      this.cartTotal = total;
    }

  }

  // Calculate cart total
  calcularTotal(cantidad: number, id: any) {
    let total = 0;
    let cartitems = 0;

    if (cantidad != null) {
      // Multiply item price by item quantity, add to total
      this.ticket.forEach(function (item: Productos) {
        if (id === item.id) {
          total += item.precioVenta * cantidad;
          cartitems += cantidad;
        } else {
          total += item.precioVenta * item.cantidad;
          cartitems += item.cantidad;
        }
      });
      this.cartTotal = total;
      this.cartTotalOriginal = total;
      this.cartNumItems = cartitems;

      // Sync total with ticketSync service.
      this.ticketSync.updateNumItems(this.cartNumItems);
      this.ticketSync.updateTotal(this.cartTotal);
    } else {
      // Multiply item price by item quantity, add to total
      this.ticket.forEach(function (item: Productos) {
        total += item.precioVenta * item.cantidad;
        cartitems += item.cantidad;
      });
      
      this.cartTotal = total;
      this.cartNumItems = cartitems;

      // Sync total with ticketSync service.
      this.ticketSync.updateNumItems(this.cartNumItems);

      this.ticketSync.updateTotal(this.cartTotal);
    }

    this.actualizarTipoTransaccion();
  }

  calcularDesc(desc: number, id: any) {
    let total = 0;

    if (desc != null && desc != 0) {
      // Multiply item price by item quantity, add to total
      this.ticket.forEach(function (item: Productos) {
        if (id === item.id) {
          total += (item.precioVenta * item.cantidad) - desc ;
        } else {
          total += item.precioVenta * item.cantidad;
        }
      });
      this.cartTotal = total;
      this.cartTotalOriginal = total;

      // Sync total with ticketSync service.
      this.ticketSync.updateTotal(this.cartTotal);
    } else {
      // Multiply item price by item quantity, add to total
      this.ticket.forEach(function (item: Productos) {
        total += item.precioVenta * item.cantidad;
      });
      this.cartTotal = total;
      this.ticketSync.updateTotal(this.cartTotal);
    }
  }

  // Remove all items from cart
  clearCart() {
    // Reduce back to initial quantity (1 vs 0 for re-add)
    this.ticket.forEach(function (item: Productos) {
      item.cantidad = 1;
    });
    // Empty local ticket variable then sync
    this.ticket = [];
    this.syncTicket();
    this.calcularTotal(null, null);
  }

  syncTicket() {
    this.ticketSync.changeTicket(this.ticket);
  }

  resetear() {
    this.productosPedido = [];
    this.cartTotal = 0;
    this.descuento = 0;
    this.pagaCon = 0;
    this.tipoTransaccion= "EFECTIVO";
  }

  actualizarTipoTransaccion(){
    var total = 0;
    this.ticket.forEach(function (item: Productos) {
      total += item.precioVenta * item.cantidad;
    });
    switch(this.tipoTransaccion){
      case "EFECTIVO":
      this.cartTotal = total - (total * (this.configuracion.efectivo / 100));
      break;
      case "DEBITO":
       this.cartTotal = total + (total * (this.configuracion.debito / 100));
      break;
      case "1 CUOTA":
        this.cartTotal = total + (total * (this.configuracion.unaCuota / 100));
      break;
      case "3 CUOTAS":
        this.cartTotal = total + (total * (this.configuracion.tresCuotas / 100));
      break;
      case "MERCADO PAGO":
        this.cartTotal = total + (total * (this.configuracion.mercadoPago / 100));
      break;
      case "CUENTA CORRIENTE":
        this.cartTotal = total + (total * (this.configuracion.cuentaCorriente / 100));
      break;
      case "TRANSFERENCIA":
        this.cartTotal = total + (total * (this.configuracion.transferencia / 100));
        break;
      default: 
        break;
    }
    this.cartTotal
  }

  validarCliente() {
    if (this.clienteId == null || this.clienteId == "") {
      const dialogRef = this.dialog.open(DialogAdvertenciaComponent, {
        width: "600px",
        disableClose: true,
        data: {
          title: "Revisar Cliente",
          confirmText: "Por favor seleccione un cliente para continuar.",
        },
      });
      dialogRef.afterClosed().subscribe(() => {});

      return false;
    }
    return true;
  }

  checkout() {
    // if (this.validarCliente()){
    if (this.ticket.length === 0) {
      const dialogRef = this.dialog.open(DialogAdvertenciaComponent, {
        width: "600px",
        disableClose: true,
        data: {
          title: "Sin productos",
          confirmText: "Debe incluir al menos un producto en el pedido.",
        },
      });
      dialogRef.afterClosed().subscribe(() => {});
      return;
    } else {
      const dialogRef = this.dialog.open(DialogConfirmarComponent, {
        width: "900px",
        data: {
          title: "CONFIRMAR VENTA",
          confirmText: "Presione Aceptar para confirmar esta venta",
        },
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result.confirm) {
          this.loadingService.toggleLoading();
          const ventaOk = [Venta];
          this.nuevoPedido = new Venta();
          this.nuevoPedido.productosVenta = this.ticket;
          this.nuevoPedido.tipoTransaccion = this.tipoTransaccion;
          this.nuevoPedido.total = this.cartTotal;
          this.nuevoPedido.usuario = this.usuario.usuario.toString();
          this.nuevoPedido.clienteId = this.clienteId;
          this.nuevoPedido.descuento = this.descuento;
          this.nuevoPedido.pagoCon = this.pagaCon;
          this.nuevoPedido.imprimioTicket = true;

          const venta = new Venta();
          venta.cliente = this.clientes.find((x) => x.id === this.clienteId);
        
          this.dataService.createAsync('ventas/AddVenta', this.nuevoPedido, ventaOk).subscribe(
            data => {
              this.loadingService.toggleLoading();
              this.nuevoPedido = data[1];
              // tslint:disable-next-line: no-shadowed-variable
              const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' ,  disableClose: true });
              dialogRef.afterClosed().subscribe(result => {

              this.resetear();
              this.clearCart();
              
              });
            },
            error => {
              const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
              dialogRef.afterClosed().subscribe(result => {
              });
            }
          );
        }
      });
    }
    // }
  }

  cerrar = () => {
    if (this.hayDatos()) {
      const dialogRef = this.dialog.open(DialogConfirmarComponent, {
        width: "600px",
        disableClose: true,
        data: {
          title: "Salir del pedido",
          confirmText:
            "¿Esta seguro que desear salir? Los datos cargados del pedido se perderán",
        },
      });

      dialogRef
        .afterClosed()
        .subscribe(
          (result) => result.confirm && this.router.navigate(["welcome"])
        );
    } else {
      this.router.navigate(["welcome"]);
    }
  };

  hayDatos = () => this.clienteId || this.ticket.length;
}
