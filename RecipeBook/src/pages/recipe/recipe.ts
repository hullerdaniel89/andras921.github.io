import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipes } from '../../models/recipes';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list'
import {RecipeService} from '../../services/recipes'
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe: Recipes;
  index: number;
  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              private slService: ShoppingListService,
              private recipesService: RecipeService){}
  
  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
    console.log(this.recipe);
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipePage,{mode: 'Edit', recipe: this.recipe, index:this.index});
  }

  onAddIngredients(){
    this.slService.addItems(this.recipe.ingredients);
    console.log(typeof this.recipe.ingredients);
    console.log(this.recipe.ingredients);
    this.navCtrl.popToRoot();
  }

  onDeleteRecipe(){
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
