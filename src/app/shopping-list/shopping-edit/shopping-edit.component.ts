import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') from: NgForm;
  subscription: Subscription;
  editedIngredient: Ingredient;
  editMode: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {

    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedIngredient = stateData.editedIngredient;
        this.from.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      } else {
        this.editMode = false;
      }
    });

    // this.subscription = this.shoppingListService.startedEditing.subscribe((id: number) => {
    //   this.ingredientId = id;
    //   this.editMode = true;
    //   this.editedIngredient = this.shoppingListService.getIngredient(this.ingredientId);
    //   this.from.setValue({
    //     name: this.editedIngredient.name,
    //     amount: this.editedIngredient.amount
    //   });
    // });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
    this.store.dispatch(new ShoppingListActions.StopEdit());
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
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
      // this.shoppingListService.editIngredient(this.ingredientId, newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.from.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    // this.shoppingListService.deleteIngredient(this.ingredientId);
    this.onClear();
  }
}
