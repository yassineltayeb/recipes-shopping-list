import { Observable } from 'rxjs';
import { AuthResponseData } from './models/auth-response.model';
import { AuthRequestData } from './models/auth-request-data.model';
import { AuthService } from './auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  loginForm: FormGroup;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    }
    )
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    console.table(this.loginForm.value);

    if (!this.loginForm.valid) {
      return;
    }


    this.isLoading = true;
    this.error = null;

    const authRequestData: AuthRequestData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      returnSecureToken: true
    }

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(authRequestData);

    } else {
      authObs = this.authService.signUp(authRequestData);
    }

    authObs.subscribe((res: AuthResponseData) => {
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, (error) => {
      this.error = error;
      this.isLoading = false;
    });

    this.loginForm.reset();
  }

  onHandelError() {
    this.error = null;
  }
}
