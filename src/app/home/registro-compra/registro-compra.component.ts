import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
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
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogAdvertenciaComponent } from '../../dialogs/dialog-advertencia/dialog-advertencia.component';
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
    private router: Router,
    private dataService: DataService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadingService.toggleLoading();

    this.categorias = categoriasMock;

    this.dataService.getAsync(URL_PROVEEDORES.GET_ALL, []).subscribe(
      data => {
        this.proveedores = data;
        this.loadingService.toggleLoading();
      }
    );
  }

  poneleData = (modelId: any) => modelId && this.getProducts(modelId);

  getProducts = modelId => {
    this.loadingService.toggleLoading();

    // ACA OBTENES EL ID (MODELID) DEL PROVEEDOR, HACES UNA LLAMADA PARA QUE VENGAN LOS PRODUCTOS Y WUALA, MAGIA
    this.clearCart();

    this.dataService.getAsync(URL_STOCK.GET_ALL, []).subscribe(
      data => {
        this.productosBuscados = data.slice(0, 5);
        this.loadingService.toggleLoading();
      }
    );
  }

  removeItem(item: Productos) {
    const itemFinded = this.detalleCompra.find(_item => item.id === _item.id);
    const index = this.detalleCompra.indexOf(itemFinded);
    this.detalleCompra.splice(index, 1);
  }

  cerrar = () => this.router.navigate(['stock']);

  clearCart = (clearAll: boolean = false) => {
    this.productosBuscados = [];
    this.detalleCompra = [];
    if (clearAll) {
      this.proveedor = null;
    }
  }

  pay = () => {
    if (!this.proveedor || !this.detalleCompra.length) {
      const dialogConfig = !this.proveedor ?
        {
          title: 'Revisar proveedor',
          confirmText: 'Por favor seleccione un proveedor para continuar.'
        } : {
          title: 'Sin productos',
          confirmText: 'Debe incluir al menos un producto en el pedido.'
        };

      this.dialog.open(
        DialogAdvertenciaComponent,
        {
          width: '600px',
          disableClose: true,
          data: dialogConfig
        }
      );
    } else {
      // ACA ES DONDE DEBERIA HACERSE EL CREATE DE LA COMPRA Y ACTUALZIARSE EL STOCK DE PRODUCTOS
      // UNA VEZ HECHO TODO, MANDAR AL USUARIO AL STOCK DE NUEVO
    }
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
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          const dialogResult = this.dialog.open(
            DialogOperacionOkComponent,
            {width: '600px', disableClose: true }
          );

          // UNA VEZ QUE REGISTRAS EL ARCHIVO, VOLVES A BUSCAR LOS PRODUCTOS O HACES UN PUSH
          // LO QUE MAS SIRVA
          dialogResult.afterClosed().subscribe(
            () => this.getProducts(this.proveedor.id)
          )
        }
      }
    );
  }

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
