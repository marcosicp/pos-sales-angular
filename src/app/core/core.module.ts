import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// IMPORTAR SERVICIOS
import { AuthService } from './services/auth.service';
import { NotifyService } from './services/notify.service';
import { DataService } from './services/data.service';
import { PosService } from './services/pos.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    NotifyService,
    DataService,
    PosService
  ]
})
export class CoreModule { }
