import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

import { FormControl, Validators } from '@angular/forms';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  success = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  userLogin(email, password) {
    this.authService.emailLogin(email, password).subscribe(
      error => 
      {
        debugger;
        this.success = false
        this.router.navigate(['/welcome']);
      });
  }
}
