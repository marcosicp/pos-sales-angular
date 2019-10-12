import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../../shared/services/loading.service';
import strings from '../../shared/configs/strings.config';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  email: string;
  password: string;
  error: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]
  );

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  userLogin(email, password) {
    this.loadingService.toggleLoading();
    this.authService.emailLogin(email, password).subscribe(
      user => {
        this.loadingService.toggleLoading();

        if (!user) {
          this.error = strings.noInternet;
        } else if (user.email === null || user.email === '') {
          this.error = strings.badLogin;
        } else {
          this.error = null;

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/welcome']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.error = null;
  }
}
