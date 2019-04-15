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

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';


import { PosService } from './pos.service';
import { AuthService } from './core/auth.service';

import { environment } from '../environments/environment';
// import { DatabaseService } from './database.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './welcome/login/login.component';
import { ResetpasswordComponent } from './welcome/resetpassword/resetpassword.component';
import { NotificationComponent } from './notification/notification.component';

// export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    ResetpasswordComponent,
    NotificationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    HomeModule,
    AdminModule
  ],
  providers: [PosService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
