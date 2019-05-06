import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// IMPORTAR COSAS DE SISTEMA
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../environments/environment';
// IMPORTAR MODULOS
import { AppRoutingModule } from './core/app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './core/material.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { WelcomeModule } from './welcome/welcome.module';
import { ServiceWorkerModule } from '@angular/service-worker';
// IMPORTAR SERVICIOS
// IMPORTAR APP COMPONENT
import { AppComponent } from './app.component';
// IMPORTAR COMPONENTES
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule,
    HomeModule,
    AdminModule,
    DialogsModule,
    WelcomeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
