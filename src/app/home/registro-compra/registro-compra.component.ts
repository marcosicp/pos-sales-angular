import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
// MODELOS
import { Productos } from '../../shared/models/producto.model';
import { Proveedores } from '../../shared/models/proveedores.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
// CONFIGURACIONES
import { URL_STOCK, URL_PROVEEDORES } from '../../shared/configs/urls.config';
import { TABLA_STOCK } from '../../shared/configs/table.config';
// DIALOGOS
import { DialogStockAddEditComponent } from '../../dialogs/dialog-stock-add-edit/dialog-stock-add-edit.component';
import { DialogStockAumentarComponent } from '../../dialogs/dialog-stock-aumentar/dialog-stock-aumentar.component';
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogEditarGananciasComponent } from '../../dialogs/dialog-editar-ganancias/dialog-editar-ganancias.component';
// MOCKS
import categoriasMock from '../../shared/mocks/categorias.mock';

@Component({
  selector: 'app-registro-compra',
  templateUrl: './registro-compra.component.html',
  styleUrls: ['./registro-compra.component.scss']
})
export class RegistroCompraComponent implements OnInit {
  proveedores: Proveedores[];
  proveedor: Proveedores;
  detalleCompra: Productos[] = [];
  productosBuscados: Productos[] = [];
  categorias: any[];

  constructor(
    private dataService: DataService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadingService.toggleLoading();

    this.categorias = categoriasMock;

    this.dataService.getAsync(URL_PROVEEDORES.GET_ALL, []).subscribe(
      data => this.proveedores = data
    );

    this.dataService.getAsync(URL_STOCK.GET_ALL, []).subscribe(
      data => this.productosBuscados = data.slice(0, 5)
    );

    this.loadingService.toggleLoading();
  }

  calcularTotal = (cantidad: number, id: any) => cantidad * id;

  clearCart = () => this.detalleCompra = [];

  pay = () => console.warn('hola vieja');

  removeItem(item: Productos) {
    const test = this.detalleCompra.find(_item => item.id === _item.id);
    const hola = this.detalleCompra.indexOf(test);
    this.detalleCompra.splice(hola, 1);
  }

  addProduct = () => {
    const dialogRef = this.dialog.open(
      DialogStockAddEditComponent,
      {
        width: '900px',
        disableClose: true,
        data: {
          proveedores: this.proveedores.map(item => `${item.razonSocial}`),
          categorias: this.categorias
        }
      }
    )
  };

  addToCheck = (prod: Productos) => {
    const exist = this.detalleCompra.find(item => item.id === prod.id);

    if (exist) {
      const index = this.detalleCompra.indexOf(prod);
      this.detalleCompra[index].cantidadComprada++;
    } else {
      prod.cantidadComprada = 1;
      this.detalleCompra.push(prod);
    }
  }

  totalAmount = (): number => {
    return this.detalleCompra.length > 0 ?
      this.detalleCompra.map(item => item.precioCompra * item.cantidadComprada).reduce((a, b) => a + b) : 0;
  }

  totalWeight = () => {
    return this.detalleCompra.length > 0 ?
      this.detalleCompra.map(item => item.peso * item.cantidadComprada).reduce((a, b) => a + b) : 0;
  }
}
