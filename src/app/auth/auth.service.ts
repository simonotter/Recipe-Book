import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?' +
            'key=AIzaSyCbm9lV6P_jrdaWiV2ZbCWmzzjhd7n2eI0',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn
                );
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?' +
            'key=AIzaSyCbm9lV6P_jrdaWiV2ZbCWmzzjhd7n2eI0',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn
                );
            })
        );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        // Convert expiresIn in to number, convert it from milliseconds to seconds and
        // add to current timestamp.
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured.';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
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
        return throwError(errorMessage);
    }
}
