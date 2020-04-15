import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?' +
            'key=AIzaSyCbm9lV6P_jrdaWiV2ZbCWmzzjhd7n2eI0',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
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
        ).pipe(catchError(this.handleError));
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
