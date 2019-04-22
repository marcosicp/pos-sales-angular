import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
// GUARDAS
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
// COMPONENTES
import { WelcomeComponent } from '../welcome/welcome.component';
import { HomeComponent } from '../home/home.component';
import { TransactionsComponent } from '../home/transactions/transactions.component';
import { AdminComponent } from '../admin/admin/admin.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LoginComponent } from '../welcome/login/login.component';
import { ResetpasswordComponent } from '../welcome/resetpassword/resetpassword.component';
import { AdministracionComponent  } from '../../app/home/administracion/administracion.component';
import { UsersComponent  } from '../admin/users/users.component';
import { ItemsComponent } from '../admin/items/items.component';
import { ReportsComponent } from '../home/reports/reports.component';
import { HistorialComponent } from '../home/historial/historial.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'resetpassword',
    component: ResetpasswordComponent
  }, {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'home',
    component: HomeComponent ,
    canActivate: [AuthGuard]
  }, {
    path: 'administracion',
    component: AdministracionComponent ,
    canActivate: [AuthGuard]
  }, {
    path: 'historial',
    component: HistorialComponent ,
    canActivate: [AuthGuard]
  },  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent
      }, {
        path: 'items',
        component: ItemsComponent
      }
    ]
  }, {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthGuard,
    AdminGuard
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
