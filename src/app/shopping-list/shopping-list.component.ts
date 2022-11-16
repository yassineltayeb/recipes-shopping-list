import { Ingredient } from './../shared/ingredients.model';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');
  }

  onEdit(id: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }
}
