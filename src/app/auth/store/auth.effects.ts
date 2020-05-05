import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect, EffectsFeatureModule } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string
) => {
    const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000
    );
    return new AuthActions.AuthenticateSuccess({
        email,  // object-literal shorthand
        userId, // object-literal shorthand
        token,  // object-literal shorthand
        expirationDate  // object-literal shorthand
    });
};

const handleError = (errorResponse: any) => {
    let errorMessage = 'An unknown error occured.';
    if (!errorResponse.error || !errorResponse.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'A user with that email already exists.';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist. Sign up now.';
            break;
        case 'INVALID_PASSWORD': // TODO Merge this with EMAIL_NOT_FOUND for better security
            errorMessage = 'This password is not correct.';
    }
    // must return a non-error observable else outer observable would die
    return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?' +
                'key=' + environment.firebaseAPIKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            )
            .pipe(
                map(resData => {
                    return handleAuthentication(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                    );
                }),
                catchError(errorResponse => {
                    return handleError(errorResponse);
                })
            );
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?' +
                'key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            )
            .pipe(
                map(resData => {
                    return handleAuthentication(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                    );
                }),
                catchError(errorResponse => {
                    return handleError(errorResponse);
                })
            );
        })
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
