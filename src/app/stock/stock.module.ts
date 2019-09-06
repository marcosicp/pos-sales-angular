import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../core/app-routing.module';
// COMPONENTS
import { ItemsComponent } from './items/items.component';
// SERVICIOS
import { AuthService } from '../core/services/auth.service';
// OTROS MODULOS
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    ItemsComponent
  ],
  providers: [AuthService]
})
export class StockModule { }
