import { CuentasCorrientesComponent } from './../home/proveedores/cuentas-corrientes/cuentas-corrientes.component';
import { RegistroCompraComponent } from './../home/registro-compra/registro-compra.component';
import { ComprasProveedoresComponent } from '../home/compras-proveedores/compras-proveedores.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// GUARDAS
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
// COMPONENTES
import { WelcomeComponent } from '../../app/welcome/welcome/welcome.component';
import { ConfiguracionComponent } from '../home/configuracion/configuracion.component';
// import { ConfirmacionComponent } from '../home/confirmacion/confirmacion.component';
import { HomeComponent } from '../home/home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LoginComponent } from '../welcome/login/login.component';
import { ResetPasswordComponent } from '../welcome/reset-password/reset-password.component';
import { AdministracionComponent } from '../../app/home/administracion/administracion.component';
import { UsersComponent } from '../admin/users/users.component';
import { StockComponent } from '../home/stock/stock.component';
import { ClientesComponent } from '../home/clientes/clientes.component';
import { ProveedoresComponent } from '../home/proveedores/proveedores.component';
import { VentasComponent } from '../home/ventas/ventas.component';
// import { PactarEntregaComponent } from '../pactar-entrega/pactar-entrega.component';
import { ListaMovimientosComponent } from '../home/lista-movimientos/lista-movimientos.component';
import { ReportesComponent } from '../home/reportes/reportes.component';
import { CajaComponent } from '../home/caja/caja.component';
import { SoporteComponent } from '../soporte/soporte.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptor } from './guards/http.interceptor';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'caja',
    component: CajaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'proveedores',
    // component: ProveedoresComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProveedoresComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'proveedores',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'registrar-compra',
        component: RegistroCompraComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'compras-proveedores',
        component: ComprasProveedoresComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cuentas-corrientes',
        component: CuentasCorrientesComponent,
        canActivate: [AuthGuard],
      },

    ]
  },
  {
    path: 'soporte',
    component: SoporteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'administracion',
    component: AdministracionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movimientos',
    component: ListaMovimientosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stock',
    component: StockComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  providers: [
    AuthGuard,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
