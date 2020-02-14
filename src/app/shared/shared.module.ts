import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// COMPONENTES
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
// SERVICIOS -- USADO PARA CAMBIAR LA UI Y BLOQUEAR AL USUARIO MIENTRAS SE MANEJA UNA PETICION HTTP
import { LoadingService } from './services/loading.service';
// PIPES -- PIPES PARA LA MUESTRA DE DATOS EN FORMAS ESPECIFICA (TELEFONO, CUIL, ROL DE USUARIO, BOOLEANO Y VALOR DE UNA COLUMNA)
import { PhonePipe } from './pipes/phone.pipe';
import { CuilPipe } from './pipes/cuil.pipe';
import { ParseUserRolePipe } from './pipes/parse-user-role.pipe';
import { BooleanPipe } from './pipes/boolean.pipe';
import { ColumnValuePipe } from './pipes/column-value.pipe';
import { WeightPipe } from './pipes/weight.pipe';
// OTROS MODULOS
import { MaterialModule } from '../core/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DynamicTableComponent,
    MaterialModule,
    BooleanPipe,
    ColumnValuePipe,
    PhonePipe,
    CuilPipe,
    ParseUserRolePipe,
    WeightPipe
  ],
  declarations: [
    DynamicTableComponent,
    BooleanPipe,
    ColumnValuePipe,
    PhonePipe,
    CuilPipe,
    ParseUserRolePipe,
    WeightPipe
  ],
  providers: [
    LoadingService
  ]
})
export class SharedModule { }
