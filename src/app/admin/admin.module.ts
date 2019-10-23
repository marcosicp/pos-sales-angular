import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../core/app-routing.module';
// COMPONENTES
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// SERVICIOS
import { AuthService } from '../core/services/auth.service';
// OTROS MODULOS
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModalModule
  ],
  declarations: [
    UsersComponent,
    AdminComponent
  ],
  providers: [AuthService]
})
export class AdminModule { }
