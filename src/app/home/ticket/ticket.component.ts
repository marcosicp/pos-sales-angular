import { Component, OnInit } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Productos } from '../../shared/models/producto.model';
import { PosService } from '../../core/services/pos.service';
import { DataService } from '../../core/services/data.service';
import { DialogCajaCerradaComponent } from '../../dialogs/dialog-caja-cerrada/dialog-caja-cerrada.component';
import { DialogBuscarProductoComponent } from '../../dialogs/dialog-buscar-producto/dialog-buscar-producto.component';
import { Usuarios } from '../../shared/models/usuarios.model';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { AuthService } from '../../core/services/auth.service';
import { Pedido } from '../../shared/models/pedido.model';
import { MatDialog } from '@angular/material';
import { ProductoPedido } from '../../shared/models/producto-venta.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ticket: Productos[] = [];

  cartTotal = 0;
  cartPeso = 0;
  cartNumItems = 0;
  productosPedido: ProductoPedido[] = [];
  total = 0;
  pesoTotal = 0;
  clienteId = "";
  usuario : Usuarios;
  constructor(private authService: AuthService, private ticketSync: PosService, private dataService: DataService, public dialog: MatDialog) { }

  // Sync with ticketSync service on init
  ngOnInit() {
    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
    this.ticketSync.currentTotal.subscribe(total => this.cartTotal = total);
    this.ticketSync.currentPeso.subscribe(pesoTotal => this.cartPeso = pesoTotal);
    this.ticketSync.currentCartNum.subscribe(num => this.cartNumItems = num);
    this.ticketSync.currentClienteId.subscribe(cli => this.clienteId = cli);

    this.usuario = JSON.parse(localStorage.getItem('currentUser'));
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
    this.calculateTotal();
    this.calculatePeso();
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
    this.calculateTotal();
  }

  // Reduce quantity by one
  subtractOne(item: Productos) {
    // Check if last item, if so, use remove method
    if (this.ticket[this.ticket.indexOf(item)].cantidad === 1) {
      this.removeItem(item);
    } else {
      this.ticket[this.ticket.indexOf(item)].cantidad = this.ticket[this.ticket.indexOf(item)].cantidad - 1;
    }
    this.syncTicket();
    this.calculateTotal();
  }

  // Calculate cart total
  calculateTotal() {
    let total = 0;
    let peso = 0;
    let cartitems = 0;
    // Multiply item price by item quantity, add to total
    this.ticket.forEach(function(item: Productos) {
      total += (item.precioVenta * item.cantidad);
      peso += (item.peso * item.cantidad);
      cartitems += item.cantidad;
    });
    this.cartTotal = total;
    this.cartPeso = peso;
    this.cartNumItems = cartitems;

    // Sync total with ticketSync service.
    this.ticketSync.updateNumItems(this.cartNumItems);
    this.ticketSync.updateTotal(this.cartTotal);
    this.ticketSync.updatePeso(this.cartPeso);
  }

   // Calculate cart total
   calculatePeso() {
    let peso = 0;
    this.ticket.forEach(function(item: Productos) {
      peso += item.peso;
    });
    this.cartPeso = peso;

    // Sync total with ticketSync service.
    this.ticketSync.updateTotal(this.cartTotal);
  }

  // Remove all items from cart
  clearCart() {
    // Reduce back to initial quantity (1 vs 0 for re-add)
    this.ticket.forEach(function(item: Productos) {
      item.cantidad = 1;
    });
    // Empty local ticket variable then sync
    this.ticket = [];
    this.syncTicket();
    this.calculateTotal();
  }

  syncTicket() {
    this.ticketSync.changeTicket(this.ticket);
  }

  resetear() {
    this.productosPedido = [];
    // this.dataSource.data = this.productosPedido;
    this.cartTotal = 0;
    // this.pagaCon = 0;
    // this.vuelto = 0;
    // this.actualizarVuelto();
  }

  checkout() {
  
    if (this.ticket.length === 0) {
      // this.openSnackBar('NO HAY ITEMS CARGADOS EN EL CHANGO!', 'ATENCION');
      return;
    } else {
      let prodsDesc = '';
      const dialogRef = this.dialog.open(DialogCajaCerradaComponent, { width: '900px' });

      dialogRef.afterClosed().subscribe(result => {
          ;
          const nuevaPedido = new Pedido();
          const ventaOk = [Pedido];

          // nuevaPedido.usuarioVendio = this.usuario;
          nuevaPedido.ProductosPedidos = this.ticket;
          nuevaPedido.FechaPedido = new Date();
          nuevaPedido.FechaPedido.setHours(nuevaPedido.FechaPedido.getHours() - 3)
          nuevaPedido.Total = this.cartTotal;
          nuevaPedido.Usuario = this.usuario.usuario.toString();
          nuevaPedido.PesoTotal = this.cartPeso;
          nuevaPedido.ClienteId = this.clienteId;
          nuevaPedido.ImprimioTicket = true;

        if (result === true) {
          // Guardar venta
          this.dataService.createAsync('pedidos/AddPedido', nuevaPedido, ventaOk).subscribe(
            data => {
              ;
              const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' });
              dialogRef.afterClosed().subscribe(result => {
                // Imprimir ticket
              this.resetear();
              this.clearCart();
              // this.openSnackBar('Imprimiendo ticket!', 'Aguarde');
              });
            },
            error => {
              ;
              const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
              dialogRef.afterClosed().subscribe(result => {
                ;        
    
              });
            }
          );
        } else if (result === false) {
          // Guardar venta sin ticket
          nuevaPedido.ImprimioTicket = false;
            this.dataService.createAsync('pedidos/AddPedido', nuevaPedido, ventaOk).subscribe(
              data => {
                const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' });
                dialogRef.afterClosed().subscribe(result => {
                  this.resetear();
                  this.clearCart();
                });
                
              },
              error => {
                ;   
                const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
                dialogRef.afterClosed().subscribe(result => {
                });
              }
            );
        }
      });


    }
  }

}
