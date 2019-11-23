import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CustomFormsModule } from 'ngx-custom-validators';
// IMPORTS
import { DialogAbrirCajaComponent } from './dialog-abrir-caja/dialog-abrir-caja.component';
import { DialogGestionarProductoComponent } from './dialog-gestionar-producto/dialog-gestionar-producto.component';
import { DialogBuscarProductoComponent } from './dialog-buscar-producto/dialog-buscar-producto.component';
import { DialogCajaCerradaComponent } from './dialog-caja-cerrada/dialog-caja-cerrada.component';
import { DialogCerrarCajaComponent } from './dialog-cerrar-caja/dialog-cerrar-caja.component';
import { DialogConfirmarComponent } from './dialog-confirmar/dialog-confirmar.component';
import { DialogEgresoCajaComponent } from './dialog-egreso-caja/dialog-egreso-caja.component';
import { DialogIngresoCajaComponent } from './dialog-ingreso-caja/dialog-ingreso-caja.component';
import { DialogOperacionOkComponent } from './dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from './dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogVerItemsPedidoComponent } from './dialog-ver-items-venta/dialog-ver-items-venta.component';
import { DialogProveedoresAddEditComponent } from './dialog-proveedores-add-edit/dialog-proveedores-add-edit.component';
import { DialogClienteAddEditComponent } from './dialog-cliente-add-edit/dialog-cliente-add-edit.component';
import { DialogEditarEntregaComponent } from './dialog-editar-entrega/dialog-editar-entrega.component';
import { DialogUsuarioAddEditComponent } from './dialog-usuario-add-edit/dialog-usuario-add-edit.component';
import { DialogCambiarPassComponent } from './dialog-cambiar-pass/dialog-cambiar-pass.component';
import { DialogStockAddEditComponent } from './dialog-stock-add-edit/dialog-stock-add-edit.component';
import { DialogStockAumentarComponent } from './dialog-stock-aumentar/dialog-stock-aumentar.component';
import { DialogConfirmarCambioFechaComponent } from './dialog-confirmar-cambio-fecha/dialog-confirmar-cambio-fecha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RxReactiveFormsModule,
    CustomFormsModule,
    NgbModalModule,
    ReactiveFormsModule
  ],
  declarations: [
    DialogAbrirCajaComponent,
    DialogGestionarProductoComponent,
    DialogBuscarProductoComponent,
    DialogCajaCerradaComponent,
    DialogCerrarCajaComponent,
    DialogConfirmarComponent,
    DialogEgresoCajaComponent,
    DialogIngresoCajaComponent,
    DialogOperacionOkComponent,
    DialogSinConexionComponent,
    DialogVerItemsPedidoComponent,
    DialogEditarEntregaComponent,
    DialogProveedoresAddEditComponent,
    DialogClienteAddEditComponent,
    DialogUsuarioAddEditComponent,
    DialogCambiarPassComponent,
    DialogStockAddEditComponent,
    DialogStockAumentarComponent,
    DialogConfirmarCambioFechaComponent
  ],
  entryComponents: [
    DialogAbrirCajaComponent,
    DialogGestionarProductoComponent,
    DialogBuscarProductoComponent,
    DialogCajaCerradaComponent,
    DialogEditarEntregaComponent,
    DialogCerrarCajaComponent,
    DialogConfirmarComponent,
    DialogEgresoCajaComponent,
    DialogIngresoCajaComponent,
    DialogOperacionOkComponent,
    DialogSinConexionComponent,
    DialogVerItemsPedidoComponent,
    DialogProveedoresAddEditComponent,
    DialogClienteAddEditComponent,
    DialogUsuarioAddEditComponent,
    DialogCambiarPassComponent,
    DialogStockAddEditComponent,
    DialogStockAumentarComponent,
    DialogConfirmarCambioFechaComponent
  ]
})
export class DialogsModule { }
