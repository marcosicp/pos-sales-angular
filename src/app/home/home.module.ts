import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// IMPORTAR MODULOS
import { AppRoutingModule } from '../core/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSelectModule } from '@ng-select/ng-select';
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
import { StockComponent } from './stock/stock.component';
import { ListaMovimientosComponent } from './lista-movimientos/lista-movimientos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ReporteGraficoComponent } from './reporte-grafico/reporte-grafico.component';
// OTROS MODULOS
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    NgSelectModule,
    SharedModule
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
    ProveedoresComponent,
    StockComponent,
    ListaMovimientosComponent,
    ReportesComponent,
    ReporteGraficoComponent,
    // ChartsModule
  ],
  entryComponents: [
    LineItemModalComponent
  ]
})
export class HomeModule { }
