import { Component, AfterContentInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
// STRINGS CONFIGURADOS PARA USER EN TODA LA APP
import strings from '../../shared/configs/strings.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormGroupDirective]
})
export class LoginComponent implements AfterContentInit, OnDestroy {
  error: string;
  loginForm: FormGroup;

  @ViewChild('userInput') userInput: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.loginForm = new FormGroup(
      {
        user: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required])
      }
    );
  }

  userLogin() {
    const { user, password } = this.loginForm.value;

    this.loadingService.toggleLoading();
    this.authService.emailLogin(user, password).subscribe(
      userResult => {
        this.loadingService.toggleLoading();

        if (!userResult) {
          this.error = strings.noInternet;
          this.focusOnUser();
        } else if (userResult.email === null || userResult.email === '') {
          this.error = strings.badLogin;
          this.focusOnUser();
        } else {
          this.error = null;

          localStorage.setItem('currentUser', JSON.stringify(userResult));
          this.router.navigate(['/welcome']);
        }
      }
    );
  }

  ngAfterContentInit() {
    this.focusOnUser();
  }

  ngOnDestroy() {
    this.error = null;
  }

  private focusOnUser() {
    this.userInput.nativeElement.focus();
  }
}
