import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './store/app.reducer';

import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatHeaderComponent } from './mat-header/mat-header.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    MatHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
