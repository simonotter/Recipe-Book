import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppMaterialModule,
        RouterModule.forChild([
            { path: 'shopping-list', component: ShoppingListComponent},
        ])
    ]
})
export class ShoppingListModule {}
