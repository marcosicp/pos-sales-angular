import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
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
    DialogVerItemsPedidoComponent
  ],
  entryComponents: [
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
    DialogVerItemsPedidoComponent
  ]
})
export class DialogsModule { }
