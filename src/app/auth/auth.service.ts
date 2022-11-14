import { Router } from '@angular/router';
import { User } from './models/user.mode';
import { AuthResponseData } from './models/auth-response.model';
import { AuthRequestData } from './models/auth-request-data.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authBaseUrl = environment.authBaseUrl;
  private authAPIKey = environment.authAPIKey;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(authRequestData: AuthRequestData) {
    return this.http.post<AuthResponseData>(this.authBaseUrl + ':signUp', authRequestData, {
      params: { 'key': this.authAPIKey }
    }).pipe(catchError(this.handelError), tap(resDate => {
      this.handleAuthentication(resDate.email, resDate.localId, resDate.idToken, +resDate.expiresIn)
    }));
  }

  login(authRequestData: AuthRequestData) {
    return this.http.post<AuthResponseData>(this.authBaseUrl + ':signInWithPassword', authRequestData, {
      params: { 'key': this.authAPIKey }
    }).pipe(catchError(this.handelError), tap(resDate => {
      this.handleAuthentication(resDate.email, resDate.localId, resDate.idToken, +resDate.expiresIn)
    }))
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.id, userData.email, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }

  private handelError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurs';

    if (!errorRes.error || !errorRes.error.error || !errorRes.error.error.message) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorRes.error.error.message) {
      // Sign Up
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already exist';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'This operation is not allowed';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'You tried to many attempts, please try again later'
        break;

      // Login
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Incorrect email/password';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect email/password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator'
        break;
      default:
        break;
    }

    return throwError(() => new Error(errorMessage))
  }
}
