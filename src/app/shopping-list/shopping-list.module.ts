import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';

import { SharedModule } from '../shared/shared.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        FormsModule,
        AppMaterialModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent}, // Empty path, as lazy loaded
        ]),
        SharedModule
    ]
})
export class ShoppingListModule {}
