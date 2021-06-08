import { Clientes } from './../../../shared/models/clientes.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
// MODELOS
import { Productos } from '../../../shared/models/producto.model';
import { Proveedores } from '../../../shared/models/proveedores.model';
import { Compra } from '../../../shared/models/compra.model';
import { Usuarios } from '../../../shared/models/usuarios.model';
// SERVICIOS
import { DataService } from '../../../core/services/data.service';
import { LoadingService } from '../../../shared/services/loading.service';
// CONFIGURACIONES
import {
  URL_STOCK,
  URL_PROVEEDORES,
  URL_CLIENTES,
} from '../../../shared/configs/urls.config';
import { TABLA_STOCK } from '../../../shared/configs/table.config';
// DIALOGOS
import { DialogStockAddEditComponent } from '../../../dialogs/dialog-stock-add-edit/dialog-stock-add-edit.component';
import { DialogConfirmarComponent } from '../../../dialogs/dialog-confirmar/dialog-confirmar.component';
import { DialogOperacionOkComponent } from '../../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogAdvertenciaComponent } from '../../../dialogs/dialog-advertencia/dialog-advertencia.component';
// MOCKS
import categoriasMock from '../../../shared/mocks/categorias.mock';
// HEPLERS
import fechaArg from '../../../shared/helpers/date.helper';
import { FormControl } from '@angular/forms';
import { Venta } from '../../../shared/models/venta.model';

@Component({
  selector: 'app-registro-compra',
  templateUrl: './cuentas-corrientes.component.html',
  styleUrls: ['./cuentas-corrientes.component.scss'],
})
export class CuentasCorrientesComponent implements OnInit {
  proveedores: Proveedores[];
  ventas: any[];
  proveedorBuscados: any[];
  clientes: Clientes[];
  cliente: Clientes;
  proveedor: Proveedores;
  detalleCompra: Productos[] = [];
  productosBuscados: Productos[] = [];
  categorias: any[];
  usuario: Usuarios;
  descuento: 0;
  DescuentoFormControl = new FormControl('', []);
  productos: MatTableDataSource<Productos>;

  constructor(
    private router: Router,
    private dataService: DataService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadingService.toggleLoading();

    this.categorias = categoriasMock;
    this.usuario = JSON.parse(localStorage.getItem('currentUser'));

    this.dataService.getAsync(URL_PROVEEDORES.GET_ALL, []).subscribe((data) => {
      this.proveedores = data.sort((a, b) => (a.nombre < b.nombre ? -1 : 1));
      this.loadingService.toggleLoading();
    });

    this.dataService.getAsync(URL_CLIENTES.GET_ALL, []).subscribe((data) => {
      this.clientes = data.sort((a, b) => (a.dni < b.dni ? -1 : 1));
      this.loadingService.toggleLoading();
    });

    this.dataService
      .getAsync(URL_PROVEEDORES.GET_ALL_COMPRAS_PROVEEDORES_CC, [])
      .subscribe((data) => {
        
        this.ventas = data.sort((a, b) => (a.creado < b.creado ? -1 : 1));
        this.loadingService.toggleLoading();
      });
  }

  poneleData(unProveedor: any) {
    this.loadingService.toggleLoading();
    

    this.proveedorBuscados = this.ventas.filter((item) =>
      item.proveedorId.includes(unProveedor.id)
    );

    this.loadingService.toggleLoading();
  }



  cerrar = () => {
    if (this.proveedor || this.detalleCompra.length) {
      const dialogRef = this.dialog.open(DialogConfirmarComponent, {
        width: '600px',
        disableClose: true,
        data: {
          title: 'Salir de la compra',
          confirmText:
            '¿Esta seguro que desear salir? Los datos cargados de la compra se perderán',
        },
      });

      dialogRef
        .afterClosed()
        .subscribe(
          (result) => result.confirm && this.router.navigate(['proveedores'])
        );
    } else {
      this.router.navigate(['proveedores']);
    }
  }

  clearCart = (clearAll: boolean = false) => {
    this.productosBuscados = [];
    this.detalleCompra = [];
    if (clearAll) {
      this.proveedor = null;
    }
  }

  liquidar = (compra: any) => {
      const dialogConfig = {
            title: 'Confirmar Liquidación?',
            confirmText: 'Por favor confirme para seguir.',
          };

      const dialogRef = this.dialog.open(DialogConfirmarComponent, {
        width: '600px',
        disableClose: true,
        data: dialogConfig,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.confirm) {
          this.loadingService.toggleLoading();

          this.dataService
            .createAsync(URL_PROVEEDORES.CONFIRMAR_COMPRA_PROVEEDORE_CC, compra.id, [])
            .subscribe(
              _result => {
                if (_result) {
                  this.loadingService.toggleLoading();
                const dialogResult = this.dialog.open(DialogOperacionOkComponent, {
                  width: '600px',
                  disableClose: true,
                });

                dialogResult.afterClosed().subscribe(
                  () => this.router.navigate(['proveedores']) // que traiga un booleano bien bonito
                );
                } else {
                  this.loadingService.toggleLoading();

                this.dialog.open(DialogSinConexionComponent, {
                  width: '600px',
                  disableClose: true,
                });
                }

              },
            );
        }
      });
  }

  totalAmount = (): number => {
    return this.detalleCompra.length > 0
      ? this.detalleCompra
          .map((item) =>
            item.precioNuevoCompra === undefined ||
            item.precioNuevoCompra === null ||
            item.precioNuevoCompra === 0
              ? item.precioCompra * item.cantidadComprada
              : item.precioNuevoCompra * item.cantidadComprada
          )
          .reduce((a, b) => a + b)
      : 0;
  }

  hayDatos = () => this.proveedor || this.detalleCompra.length > 0;
}
