import { Ingredient } from "./ingredient";
export class Recipes{
    constructor(
     public title: string,
     public description: string, 
     public time: string, 
     public ingredients: Ingredient[]){}
}