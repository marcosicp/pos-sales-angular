import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// IMPORTAR MODULOS
import { AppRoutingModule } from '../core/app-routing.module';
import { MaterialModule } from '../core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// IMORTAR COMPONENTES
import { WelcomeComponent } from './welcome/welcome.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    WelcomeComponent,
    ResetPasswordComponent,
    LoginComponent,
    NotificationComponent
  ]
})
export class WelcomeModule { }
