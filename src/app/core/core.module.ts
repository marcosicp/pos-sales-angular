import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// MODULOS
import { AppRoutingModule } from './app-routing.module';
// SERVICIOS
import { AuthService } from './services/auth.service';
import { NotifyService } from './services/notify.service';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [],
  providers: [
    AuthService,
    NotifyService
  ]
})
export class CoreModule { }
