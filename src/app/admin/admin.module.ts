import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../core/app-routing.module';
// IMPORTS COMPONENTS
import { ItemsComponent } from './items/items.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule, MatButtonModule, MatCardModule, MatExpansionModule,
MatInputModule, MatSelectModule, MatCheckboxModule} from '@angular/material';

import { AuthService } from '../core/services/auth.service';
import { ParseUserRolePipe } from '../shared/pipes/parse-user-role.pipe';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgbModalModule,
    MatCheckboxModule
  ],
  declarations: [
    ItemsComponent,
    UsersComponent,
    AdminComponent,
    ParseUserRolePipe
  ],
  providers: [AuthService]
})
export class AdminModule { }
