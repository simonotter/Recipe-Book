import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AuthComponent } from './auth.component';


@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'auth', component: AuthComponent}
        ]),
        SharedModule,
        AppMaterialModule
    ]
})
export class AuthModule {}
