import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './core/app-routing.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { ChartsModule } from 'ng2-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
// import {MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule} from '@angular/material';
// import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DataService } from './core/services/data.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { AuthService } from './core/auth.service';
import { DialogBuscarProductoComponent } from './dialogs/dialog-buscar-producto/dialog-buscar-producto.component';
import { DialogCajaCerradaComponent } from './dialogs/dialog-caja-cerrada/dialog-caja-cerrada.component';
import { DialogAgregarEditarProductoComponent } from './dialogs/dialog-agregar-editar-producto/dialog-agregar-editar-producto.component';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DialogCerrarCajaComponent } from './dialogs/dialog-cerrar-caja/dialog-cerrar-caja.component';
import { DialogSinConexionComponent } from './dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogOperacionOkComponent } from './dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogAbrirCajaComponent } from './dialogs/dialog-abrir-caja/dialog-abrir-caja.component';
import { DialogEgresoCajaComponent } from './dialogs/dialog-egreso-caja/dialog-egreso-caja.component';
import { DialogIngresoCajaComponent } from './dialogs/dialog-ingreso-caja/dialog-ingreso-caja.component';
import { AdministracionComponent } from '../app/home/administracion/administracion.component';
import { DialogVerItemsVentaComponent } from './dialogs/dialog-ver-items-venta/dialog-ver-items-venta.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './welcome/login/login.component';
import { ResetpasswordComponent } from './welcome/resetpassword/resetpassword.component';
import { NotificationComponent } from './notification/notification.component';
import { PosService } from './pos.service';

// export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    ResetpasswordComponent,
    DialogBuscarProductoComponent,
    DialogCajaCerradaComponent,
    DialogAgregarEditarProductoComponent,
    DialogCerrarCajaComponent,
    DialogSinConexionComponent,
    DialogOperacionOkComponent,
    DialogAbrirCajaComponent,
    DialogEgresoCajaComponent,
    DialogIngresoCajaComponent,
    AdministracionComponent,
    ConfirmComponent,
    DialogVerItemsVentaComponent,
    NotificationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    HomeModule,
    AdminModule,
    FlexLayoutModule
  ],
  providers: [ AuthService, PosService,
    DataService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogBuscarProductoComponent,
    DialogCajaCerradaComponent,
    DialogAgregarEditarProductoComponent,
    DialogCerrarCajaComponent,
    DialogAbrirCajaComponent,
    DialogSinConexionComponent,
    DialogOperacionOkComponent,
    DialogEgresoCajaComponent,
    DialogIngresoCajaComponent,
    DialogVerItemsVentaComponent,
    ConfirmComponent
  ]
})
export class AppModule { }
