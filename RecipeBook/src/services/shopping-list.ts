import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { Http , Response} from "@angular/http";
import 'rxjs/Rx';
import { AuthService } from "./auth";
@Injectable()
export class ShoppingListService{
    private ingredients: Ingredient[] = [];

    constructor(private http:Http, private authService:AuthService){}

    addItem(name: string, amount: string) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(name,amount);
    }
    addItems(items: Ingredient[]) {
       this.ingredients.push(...items); 
    }

    getItems() {
        return this.ingredients.slice();
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }
    storeList(token:string){
        const userId = this.authService.getActiveUser().uid;
        return this.http
            .put('https://fir-project-55c9b.firebaseio.com/' + userId + '/sopping-list.json?auth='+token, this.ingredients)
            .map((response: Response) => {
                return response.json();
            });
    }

    fetchList(token: string ) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://fir-project-55c9b.firebaseio.com/' + userId + '/sopping-list.json?auth='+token)
        .map((response:Response) => {
            return response.json();
        })
        .do((ingredients: Ingredient[]) => {
            if (ingredients) {
                this.ingredients = ingredients
            }
            
        });
    }
}