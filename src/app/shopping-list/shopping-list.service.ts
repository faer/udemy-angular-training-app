import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';


export class ShoppingListService {

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addItems(ingredients: Ingredient[]) {
    this.ingredients.push(... ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  clearItems() {
    this.ingredients = [];
    this.ingredientsChanged.emit(this.getIngredients().slice());
  }

  deleteItem(ingredient: Ingredient) {
    const index = this.getIndexForIngredient(ingredient);
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  private getIndexForIngredient(ingredient: Ingredient) {
    let indexFounded;
    this.ingredients.some(
      (ing, index) => {
        indexFounded = index;
      return ing.name === ingredient.name;
    });
    return indexFounded;
  }

}
