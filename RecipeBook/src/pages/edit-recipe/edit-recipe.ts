import { Component, OnInit} from '@angular/core';
import { NavParams , ActionSheetController, AlertController, ToastController,NavController} from "ionic-angular";
import { FormGroup, FormControl, Validators , FormArray} from '@angular/forms';

import { RecipeService } from '../../services/recipes';
import { Recipes } from '../../models/recipes';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode ="Új";
  recipeForm: FormGroup;
  recipe: Recipes;
  index: number;
  constructor (private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipesService: RecipeService,
              private navCtrl: NavController ){}
  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      console.log(this.recipe);
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit(){

    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0){
      ingredients = value.ingredients.map(name =>{
        return {name:name, amount: 1};
      });
    }
    if(this.mode == "Edit") {
      this.recipesService.updateRecipe(this.index,value.title, value.description, value.time, ingredients)
      
    }else{
      this.recipesService.addRecipe(value.title, value.description, value.time, ingredients);
    }
    
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      title: 'Mit Akarsz tenni?',
      buttons: [
        {
          text:'Új hozzávaló',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Hozzávalók törlés',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for(let i = len - 1; i >= 0; i--){
                fArray.removeAt(i);
              }
            const toast = this.toastCtrl.create({
               message: 'Hozzávalók törölve!',
               duration: 1500,
               position: 'bottom'
             });
             toast.present();
            }

          }
        },
        {
          text:'Mégse',
          role:'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return  this.alertCtrl.create({
      title: '',
      inputs:[
        {
          name: 'name',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text:'Mégse',
          role: 'cancel'
        },
        {
          text:'Hozzáad',
          handler: data => {
           if (data.name.trim() == '' || data.name == null){
             const toast = this.toastCtrl.create({
               message: 'A mező kitöltése kötelező',
               duration: 1500,
               position: 'bottom'
             });
             toast.present();
             return;
           }
           (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
           const toast = this.toastCtrl.create({
               message: 'Hozzáadva',
               duration: 1500,
               position: 'bottom'
             });
             toast.present();
          }
        }
      ]
    });
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let time = null;
    let ingredients = [];

    if(this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      time = this.recipe.time;
      for (let ingredient of this.recipe.ingredients){
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }

    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title,Validators.required),
      'description': new FormControl(description,Validators.required),
      'time': new FormControl(time),
      'ingredients' : new FormArray(ingredients)
    });
  }
}
