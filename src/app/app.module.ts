import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// IMPORTAR COSAS DE SISTEMA
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
// IMPORTAR MODULOS
import { AppRoutingModule } from './core/app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './core/material.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { WelcomeModule } from './welcome/welcome.module';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
// IMPORTAR SERVICIOS
// IMPORTAR APP COMPONENT
import { AppComponent } from './app.component';
// IMPORTAR COMPONENTES
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { ConfirmacionComponent } from './home/confirmacion/confirmacion.component';
import { VentasComponent } from './ventas/ventas.component';
import { PactarEntregaComponent } from './pactar-entrega/pactar-entrega.component';
import { AcopiosComponent } from './acopios/acopios.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoadingScreenComponent,
    PageNotFoundComponent,
    ConfirmacionComponent,
    VentasComponent,
    PactarEntregaComponent,
    AcopiosComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule,
    HomeModule,
    AdminModule,
    DialogsModule,
    WelcomeModule,
    SharedModule,
    NgSelectModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModalModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
