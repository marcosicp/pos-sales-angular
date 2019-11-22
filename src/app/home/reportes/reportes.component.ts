import { Component } from '@angular/core';
// CONFIGURACIONES
import { URL_VENTAS, URL_STOCK, URL_PEDIDOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {
  reports = {
    ventas: {
      type: 'ventas',
      url: URL_VENTAS.GET_ALL,
      itemX: 'Mes',
      itemY: 'Total'
    },
    pedidos: {
      type: 'pedidos',
      url: URL_PEDIDOS.GET_ALL,
      itemX: 'Mes',
      itemY: 'Pedidos'
    },
    stock: {
      type: 'stock',
      url: URL_STOCK.GET_ALL,
      itemX: 'Producto',
      itemY: 'Unidades'
    }
  };
  masterTab = 'ventas';

  tabChanged(event: any) {
    this.masterTab = Object.keys(this.reports)[event.index];
  }
}
