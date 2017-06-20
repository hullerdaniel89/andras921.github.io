import { Recipes } from "../models/recipes";
import { Ingredient } from "../models/ingredient";
import  { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth";
import 'rxjs/Rx';
@Injectable()

export class RecipeService {
    private recipes: Recipes[] = [];

    constructor(private http: Http, private authService: AuthService) {}

    addRecipe(title:string, description:string, time: string, ingredients: Ingredient[]){
        this.recipes.push(new Recipes(title,description,time,ingredients));
    }

    getRecipes() {
        return this.recipes.slice();
    }

    updateRecipe(index: number,title:string, description:string, time: string, ingredients: Ingredient[]){
        this.recipes[index] = new Recipes(title,description,time,ingredients);
    }

    removeRecipe(index:number){
        this.recipes.splice(index,1);
    }

    storeList(token:string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put('https://fir-project-55c9b.firebaseio.com/' + userId + '/recipes.json?auth='+token, this.recipes)
            .map((response: Response) => {
                return response.json();
            })     
    }

    fetchList(token:string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://fir-project-55c9b.firebaseio.com/' + userId + '/recipes.json?auth='+token)
            .map((response: Response) => {
                const recipes: Recipes[] = response.json() ? response.json() : [];
                for (let item of recipes) {
                    if (!item.hasOwnProperty('ingredients')) {
                        item.ingredients = [];
                    }
                }
                return recipes; 
            })
            .do((recipes: Recipes[]) => {
                if (recipes) {
                this.recipes = recipes;
                }else {
                this.recipes = [];    
                }
            });
    }

}