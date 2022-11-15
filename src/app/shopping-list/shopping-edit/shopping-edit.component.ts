import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') from: NgForm;
  subscription: Subscription;
  ingredientId: number;
  editedIngredient: Ingredient;
  editMode: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((id: number) => {
      this.ingredientId = id;
      this.editMode = true;
      this.editedIngredient = this.shoppingListService.getIngredient(this.ingredientId);
      this.from.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    console.log('newIngredient', newIngredient);
    if (this.editMode == false) {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredient(newIngredient);
    }
    else {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ index: this.ingredientId, ingredient: newIngredient }));
      // this.shoppingListService.editIngredient(this.ingredientId, newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.from.reset();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient({ index: this.ingredientId }));
    // this.shoppingListService.deleteIngredient(this.ingredientId);
    this.onClear();
  }
}
