import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// IMPORTAR MODULOS
import { AppRoutingModule } from '../core/app-routing.module';
import { MaterialModule } from '../core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// COMPONENTES
import { HistorialComponent } from './historial/historial.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { HistoryComponent } from './history/history.component';
import { PosComponent } from './pos/pos.component';
import { TicketComponent } from './ticket/ticket.component';
import { HomeComponent } from './home/home.component';
import { LineItemModalComponent } from './history/line-item-modal/line-item-modal.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ReportsComponent } from './reports/reports.component';
import { LineChartComponent } from './reports/line-chart/line-chart.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [
    HomeComponent,
    TicketComponent,
    LineItemModalComponent,
    PosComponent,
    HistorialComponent,
    HistoryComponent,
    TransactionsComponent,
    ReportsComponent,
    LineChartComponent,
    AdministracionComponent,
    ClientesComponent,
    ProveedoresComponent
    // ChartsModule
  ],
  entryComponents: [
    LineItemModalComponent
  ]
})
export class HomeModule { }
