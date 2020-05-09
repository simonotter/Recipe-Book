import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { MatHeaderComponent } from './mat-header/mat-header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
