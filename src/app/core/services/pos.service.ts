import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Productos } from '../../shared/models/producto.model';

// Demo content
const TICKET: Productos[] = [];

@Injectable()
export class PosService {

  private ticket = TICKET;
  private ticketSource = new BehaviorSubject<Productos[]>(this.ticket);

  private cartTotal = 0;
  private cartTotalSource = new BehaviorSubject<number>(this.cartTotal);

  // private cartPeso = 0;
  // private cartPesoSource = new BehaviorSubject<number>(this.cartPeso);

  private cartNumItems = 0;
  private cartNumSource = new BehaviorSubject<number>(this.cartNumItems);

  private clienteId = "";
  private clienteIdSource = new BehaviorSubject<string>(this.clienteId);

  currentTicket = this.ticketSource.asObservable();
  currentTotal = this.cartTotalSource.asObservable();
  // currentPeso = this.cartPesoSource.asObservable();
  currentCartNum = this.cartNumSource.asObservable();
  currentClienteId = this.clienteIdSource.asObservable();

  constructor() { }

  changeTicket(ticket: Productos[]) {
    this.ticketSource.next(ticket);
  }

  updateTotal(total: number) {
    this.cartTotalSource.next(total);
  }

  // updatePeso(peso: number) {
  //   this.cartPesoSource.next(peso);
  // }

  updateNumItems(num: number) {
    this.cartNumSource.next(num);
  }

  updateClienteId(cli: string) {
    this.clienteIdSource.next(cli);
  }
}
