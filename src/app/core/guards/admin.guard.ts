import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// SERVICIOS
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';
// import { AngularFireAuth } from 'angularfire2/auth';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private notify: NotifyService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.admin) {
      this.notify.update('You do not have admin privileges.', 'error');
    }
    return this.authService.admin;
    }
}
