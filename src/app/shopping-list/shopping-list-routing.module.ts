import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const appRoutes: Route[] = [
  {
    path: '', component: ShoppingListComponent, children: [
      { path: ':id/edit', component: ShoppingEditComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRoutingModule { }
