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
      tabLabel: 'Ventas totales por mes',
      type: 'ventas',
      url: URL_VENTAS.GET_ALL,
      itemX: 'Mes',
      label: 'Total'
    },
    pedidos: {
      tabLabel: 'Pedidos sin entregar por mes',
      type: 'pedidos',
      url: URL_PEDIDOS.GET_ALL,
      itemX: 'Mes',
      label: 'Pedidos'
    },
    stock: {
      tabLabel: 'Productos con menor stock',
      type: 'stock',
      url: URL_STOCK.GET_ALL,
      itemX: 'Producto',
      label: 'Unidades'
    },
    productos: {
      tabLabel: 'Productos más vendidos',
      type: 'productos',
      url: URL_VENTAS.GET_ALL,
      itemX: 'Producto',
      label: 'Unidades vendidas'
    }
  };
  masterTab = 'ventas';

  tabChanged(event: any) {
    this.masterTab = Object.keys(this.reports)[event.index];
  }
}
