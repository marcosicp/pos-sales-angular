import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
// REGEXP HELPER
import RegExpHelper from '../../shared/helpers/regex.helper';
import { Router } from '@angular/router';

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
    private router: Router
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
      this.auth.resetPassword(this.resetPassForm.value.email)
      .then(value => console.warn(value))
      .catch(error => console.warn(error));
    }
  }

  cancel() {
    return this.router.navigate(['login']);
  }

  private focusOnEmail() {
    this.emailInput.nativeElement.focus();
  }
}
