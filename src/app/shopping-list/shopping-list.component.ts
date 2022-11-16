import { Ingredient } from './../shared/ingredients.model';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');
    // this.subscription = this.shoppingListService.ingredientsChanged
    //   .subscribe((ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //     console.log(ingredients);
    //   });

    // this.ingredients = this.shoppingListService.getIngredients();
  }

  onEdit(id: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
    // this.shoppingListService.startedEditing.next(id);
  }
}
