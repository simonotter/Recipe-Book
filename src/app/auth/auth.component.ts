import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.template.html',
    styleUrls: ['./auth.template.scss']
})

export class AuthComponent implements OnInit {
    isLoginMode = true; // not managed by NgRx as only used on this form
    isLoading = false;
    error: string = null;
    hide = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            // if (this.error) {
            //     this.showErrorAlert(this.error);
            // }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode) {
            this.store.dispatch(
                new AuthActions.LoginStart({ email, password }) // object-literal shorthand
            );
        } else {
            this.store.dispatch(
                new AuthActions.SignupStart({ email, password }) // object-literal shorthand
            );
        }

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }
}
