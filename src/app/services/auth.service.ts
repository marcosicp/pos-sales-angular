import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataService } from '../../app/services/data.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: any;
  private baseUrl = 'https://api-tesis-clincker.herokuapp.com/api';
  //private baseUrl = 'http://localhost:5000/api';
  private jwtHelper = new JwtHelperService()

  constructor(private dataService: DataService, private router: Router, private http: HttpClient) {
    //this.getUser.subscribe(user => this.user = user);
  }

  getUser = Observable.create(observer => {
        if (this.user) {
          debugger;
          observer.next(localStorage.getItem('currentUser'));
        } else {
          observer.next(null);
        }
        observer.complete();
      
  });

  public isAuthenticated(): boolean {
    const user = localStorage.getItem('currentUser');
    // Check whether the token is expired and return
    // true or false
    if (user!=null){
      return true;
    }else{
      return false;
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.baseUrl+'/usuarios/Login', { email: email, pass: password })
            .pipe(map(user => {
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
  }

  resetPassword(email: string) {
    // return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOut() {
     // remove user from local storage to log user out
     localStorage.removeItem('currentUser');
     if(!this.isAuthenticated()){
      this.router.navigate(['login']);
     }
  }
}
