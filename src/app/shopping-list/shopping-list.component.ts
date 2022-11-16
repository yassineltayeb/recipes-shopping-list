import { Ingredient } from './../shared/ingredients.model';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  subscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');
  }

  onEdit(id: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }
}
