import { Component, AfterContentChecked } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterContentChecked{
  showUser: string;

  constructor(
    private auth: AuthService
  ) { }

  /*
    ME FIJO QUE HAYA UN USUARIO LOGUEADO EN EL SISTEMA. EN CASO DE NO HABERLO, QUITO EL NOMBRE DE
    LA UI, CASO CONTRARIO LO MODIFICO CON EL NOMBRE DEL QUE SE LOGUEO
  */
  ngAfterContentChecked() {
    this.auth.getUser.subscribe(
      user => {
        if (!user) {
          this.showUser = null;
        } else {
          const {nombre, apellido} = JSON.parse(user);
          this.showUser = `Hola ${nombre} ${apellido}`;
        }
      }
    );
  }

  logout() {
    this.showUser = null;
    this.auth.signOut();
  }
}
