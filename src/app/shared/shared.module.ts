import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// COMPONENTES
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
// SERVICIOS
import { LoadingService } from './services/loading.service';
// PIPES
import { PhonePipe } from './pipes/phone.pipe';
import { CuilPipe } from './pipes/cuil.pipe';
import { ParseUserRolePipe } from './pipes/parse-user-role.pipe';
import { BooleanPipe } from './pipes/boolean.pipe';
import { ColumnValuePipe } from './pipes/column-value.pipe';
// OTROS MODULOS
import { MaterialModule } from '../core/material.module';
import { WeightPipe } from './pipes/weight.pipe';

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
