import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailLogin: string;
  passwordLogin: string;
  loginError: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.emailLogin, this.passwordLogin)
            .pipe(first())
            .subscribe(
                data => {
                  if(data){
                    this.router.navigate(['/admin/pedidos']);
                  }else{
                    this.loginError = 'Usuario y/o contraseña incorrectos';
                  }
                },
                error => {
                    // this.alertService.error(error);
                    // this.loading = false;
                });

  }

  resetPassword() {
    // this.authService.resetPassword(this.emailLogin)
    //   .then(() => console.log('Mail enviado'));
  }
}
