import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// COMPONENTES
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
// SERVICIOS
import { LoadingService } from './services/loading.service';
// PIPES
// import { ParseUserRolePipe } from './pipes/parse-user-role.pipe';
import { BooleanPipe } from './pipes/boolean.pipe';
// OTROS MODULOS
import { MaterialModule } from '../core/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DynamicTableComponent,
    BooleanPipe,
    // ParseUserRolePipe,
    MaterialModule
  ],
  declarations: [
    DynamicTableComponent,
    BooleanPipe
    // ParseUserRolePipe
  ],
  providers: [
    LoadingService
  ]
})
export class SharedModule { }
