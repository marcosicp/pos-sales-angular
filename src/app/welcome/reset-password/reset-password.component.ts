import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
// REGEXP HELPER
import RegExpHelper from '../../shared/helpers/regex.helper';
// DIALOGOS
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [FormGroupDirective]
})
export class ResetPasswordComponent implements OnInit, AfterContentInit {
  @ViewChild('emailInput') emailInput: ElementRef;
  resetPassForm: FormGroup;
  errorString = () => 'El campo EMAIL es obligatorio, debe ser llenado con un email valido';

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.resetPassForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.pattern(RegExpHelper.email)])
      }
    );
  }

  ngAfterContentInit() {
    this.focusOnEmail();
  }

  resetPassword() {
    if (this.resetPassForm.valid) {
      this.loadingService.toggleLoading();

      this.auth.resetPassword(this.resetPassForm.value.email).subscribe(
        result => {
          this.loadingService.toggleLoading();
          if (result) {
            const dialogResult = this.dialog.open(
              DialogOperacionOkComponent,
              { width: '600px', disableClose: true }
            );

            dialogResult.afterClosed().subscribe(
              () => this.router.navigate(['login'])
            );
          } else {
            this.dialog.open(
              DialogSinConexionComponent,
              { width: '600px', disableClose: true }
            );
          }
        }
      );
    }
  }

  cancel() {
    return this.router.navigate(['login']);
  }

  private focusOnEmail() {
    this.emailInput.nativeElement.focus();
  }
}
