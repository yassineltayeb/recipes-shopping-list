import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import * as fromShoppingList from './store/shopping-list.reducer';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  startedEditing = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor(private store: Store<fromShoppingList.AppState>) { }

  getIngredients() {
    this.store.select('shoppingList').subscribe((ingredients: { ingredients: Ingredient[] }) => {
      this.ingredients = ingredients.ingredients;
    })

    return this.ingredients;
  }

  getIngredient(id: number) {
    this.store.select('shoppingList').subscribe((ingredients: { ingredients: Ingredient[] }) => {
      this.ingredients = ingredients.ingredients;
    })
    return this.ingredients[id];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

  editIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients[id] = newIngredient;
    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next(this.ingredients);
  }
}
