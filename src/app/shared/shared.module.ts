import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// IMPORTAR SERVICIOS
import { LoadingService } from './services/loading.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    LoadingService
  ]
})
export class SharedModule { }
