import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { stringify } from '@angular/core/src/render3/util';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Usuarios } from '../../shared/models/usuarios.model';

@Injectable()
export class AuthService {
  authState: any = null;
  user: BehaviorSubject<Usuarios> = new BehaviorSubject(null);
  private baseUrl = 'https://api-tesis-clincker.herokuapp.com/api';
  // private baseUrl = 'http://localhost:53617/api';
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
    private http: HttpClient) {

  }

  signup(email: string, password: string) {
    // this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userData => {
    //   const newUser: Usuarios = {email: email, cashier: true, admin: false};
    //   this.afs.collection('users').doc(userData.uid).set(newUser);
    // });
  }

  emailLogin(email: string, password: string) {
    debugger;
    return this.http.post<any>(`${this.baseUrl}/usuarios/login`, { email: email, pass: password })
            .pipe(map(user => {
              debugger;
                if (user) {
                  if (user.email === null || user.email === '') {
                    // password incorrecta
                    return 'Verifique su password';
                  }
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return true;
                } else {
                   return 'Usuario no encontrado';
                }
            }));
    // return null;
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