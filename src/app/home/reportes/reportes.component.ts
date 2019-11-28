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
      maxItems: 12,
      tabLabel: 'Ventas totales por mes',
      type: 'ventas',
      url: URL_VENTAS.GET_ALL,
      itemX: 'Mes',
      label: 'Total'
    },
    pedidos: {
      maxItems: 12,
      tabLabel: 'Pedidos sin entregar por mes',
      type: 'pedidos',
      url: URL_PEDIDOS.GET_ALL,
      itemX: 'Mes',
      label: 'Pedidos'
    },
    stock: {
      maxItems: 12,
      tabLabel: 'Productos con menor stock',
      type: 'stock',
      url: URL_STOCK.GET_ALL,
      itemX: 'Producto',
      label: 'Unidades'
    },
    productos: {
      maxItems: 12,
      tabLabel: 'Productos más vendidos',
      type: 'productos',
      url: URL_VENTAS.GET_ALL,
      itemX: 'Producto',
      label: '% de Ventas'
    }
  };
  masterTab = 'ventas';

  tabChanged(event: any) {
    this.masterTab = Object.keys(this.reports)[event.index];
  }
}
