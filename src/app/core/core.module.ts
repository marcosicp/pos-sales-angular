import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AngularFireAuthModule } from 'angularfire2/auth';
// MODULOS
import { AppRoutingModule } from './app-routing.module';
// GUARDAS
import { AdminGuard } from './guards/admin.guard';
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
