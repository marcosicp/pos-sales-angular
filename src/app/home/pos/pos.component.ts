import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Productos } from '../../shared/models/producto.model';
import { PosService } from '../../core/services/pos.service';
import { DataService } from '../../core/services/data.service';
import {MatTabsModule} from '@angular/material';
import { DebugRenderer2 } from '@angular/core/src/view/services';


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

  constructor(private ticketSync: PosService, private dataService: DataService) { }

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
    this.dataService.getAsync('productos', this.dataService.productos).subscribe(
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

  // syncTicket() {
  //   this.ticketSync.changeTicket(this.ticket);
  // }


}
