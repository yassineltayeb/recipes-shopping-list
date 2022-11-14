import { ActivatedRoute } from '@angular/router';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute) { }

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
    if (this.editMode == false) {
      this.shoppingListService.addIngredient(newIngredient);
    }
    else {
      this.shoppingListService.editIngredient(this.ingredientId, newIngredient);

    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.from.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.ingredientId);
    this.onClear();
  }
}
