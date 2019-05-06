import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
// IMPORTAR CONFIG
import { UserUrl } from '../../shared/configs/urls.config';
// IMPORTAR MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
import { DataService } from './data.service';

@Injectable()
export class AuthService {
  authState: any = null;
  user: BehaviorSubject<Usuarios> = new BehaviorSubject(null);
  currentUID: string;
  admin: boolean;

  getUser = Observable.create(
    observer => {
      if (this.user) {
        debugger;
        observer.next(localStorage.getItem('currentUser'));
      } else {
        observer.next(null);
      }
      observer.complete();
    }
  );

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService) {
  }

  signup(email: string, password: string) {
    // this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userData => {
    //   const newUser: Usuarios = {email: email, cashier: true, admin: false};
    //   this.afs.collection('users').doc(userData.uid).set(newUser);
    // });
  }

  emailLogin(email: string, password: string) {
    const test = {
      email: email,
      pass: password
    };

    return this.dataService.postAsync(UserUrl.emailLogin, test);
  }

  public isAuthenticated(): boolean {
    const user = localStorage.getItem('currentUser');
    // Check whether the token is expired and return
    // true or false
    return user != null;
  }

  resetPassword(email: string) {
    return null;
    //  this.afAuth.auth.sendPasswordResetEmail(email)
    //   .then(() => console.log('email sent'));
  }

  updateUserRole(id, roles) {
    // this.db.updateUser(id, roles);
  }

  checkAdmin(uid) {
    if (uid !== 'guest') {
      // this.db.getUser(uid).valueChanges().take(1).subscribe(data => this.admin = data.admin);
    } else {
      this.admin = false;
    }
  }

  signOut(): void {
    console.log('Logged out');
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    if(!this.isAuthenticated()){
     this.router.navigate(['login']);
    }
  }
}
