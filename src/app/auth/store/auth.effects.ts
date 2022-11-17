import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/auth-response.model';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  /* ------------------------------ Login Effect ------------------------------ */
  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      mergeMap((authData: AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>(
          environment.authBaseUrl + ':signInWithPassword',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }, {
          params: { 'key': environment.authAPIKey }
        }).pipe(
          map(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return { type: AuthActions.LOGIN, payload: { id: resData.localId, email: resData.email, token: resData.idToken, tokenExpirationDate: expirationDate } }
          }), catchError(error => {
            return of();
          }));
      })
    );
  });

  /* -------------------------- Success Login Effect -------------------------- */
  authSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      tap(() => {
        console.log('tap');
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        console.log('effectsError', error);
        return of(new AuthActions.LoginFail(error));
        // return { type: AuthActions.LOGIN_FAIL, payload: error };
      }
      )
    );
  }, { dispatch: false });

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }
}
