import { Component } from '@angular/core';
// CONFIGURACIONES
import { URL_VENTAS, URL_STOCK, URL_PEDIDOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {
  /*
      SE CREAN 4 OBJETOS CUTAS PROPIEDADES SIRVEN PARA MANDAR A UN COMPONENTE QUE GENERARA REPORTES
    EN BASE A LOS DATOS ENVIADOS. LAS PROPIEDADES SON:
    - MAXITEMS: LA CANTIDAD DE ITEMS QUE SE PODRAN VER EN EL GRAFICO
    - TABLABEL: EL NOMBRE/TITULO DEL GRAFICO
    - TYPE: HACE REFERENCIA AL TIPO DE GRAFICO Y COMO SE DEBERAN TRATAR LOS DATOS TRAIDOS DE LA API
    - URL: EL NOMBRE DE LA API DONDE SE BUSCARAN LOS DATOS PARA HACER EL GRAFICO
    - ITEMX: EL NOMBRE QUE SE LE DARA AL EJE X
    - LABEL: EL NOMBRE DEL OBJETO QUE SE TOMARA MEDIDA PARA HACER EL GRAFICO
  */
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

  /*
    PARA HACER QUE SE CARGEN LOS GRAFICOS EN ESTE PROYECTO, SE HIZO UNA FUNCION DONDE AL HACER CLICK
    EN ALGUNA DE LAS TABS (PARA NAVEGACION), SE MANDARIAN DATOS DEL GRAFICO A RENDERIZAR
  */
  tabChanged(event: any) {
    this.masterTab = Object.keys(this.reports)[event.index];
  }
}
