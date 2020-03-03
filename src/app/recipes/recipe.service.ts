import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test',
        'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/3:2/w_2560,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg'),
        new Recipe('Piri-piri chicken with smashed sweet potatoes & broccoli', 'Serve up an easy one-pan traybake of piri-piri chicken with sweet potatoes and broccoli. As well as being simple to make, it delivers three of your 5-a-day',
        'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2020/02/piri-piri-chicken-with-smashed-sweet-potatoes-broccoli.jpg?itok=2cCr3I7C')
    ];

    getRecipes() {
        return this.recipes.slice();
    }


}
