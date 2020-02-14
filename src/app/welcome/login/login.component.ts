import { Component, AfterContentInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
// IMPORTAR SERVICIOS
import { AuthService } from '../../core/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
// IMPORTAR STRINGS CONFIGURADOS PARA USAR EN TODA LA APP
import strings from '../../shared/configs/strings.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormGroupDirective]
})
export class LoginComponent implements AfterContentInit, OnDestroy {
  @ViewChild('userInput') userInput: ElementRef;
  loginForm: FormGroup;
  error: string;

  // EN EL CONSTRUCTOR SE CREA UN FORMULARIO DE LOGIN CON LOS DATOS A REVISAR (CON VALIDADORES DE REQUERIDO EN AMBOS CASOS)
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

  // CUANDO EL USUARIO SE LOGUEA, SE OBTIENEN LOS DATOS DEL FORMULARIO DE LOGIN, CAMBIA LA INTERFAZ Y SE CONSULTA LA API.
  // EN CASO DE NO HABER INTERNET O LOGUEARSE CON EL USUARIO EQUIVOCADO, SE VUELVE A DAR FOCO EN EL USUARIO Y SE MUESTRA UN MSJ DE ERROR
  // EN CASO DE ENTRAR BIEN, SE GUARDA EL USUARIO EN UNA VARIABLE DEL LOCALSTORAGE Y SE MANDA A LA PANTALLA DE BIENVENIDA
  userLogin() {
    if (this.loginForm.valid) {
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
