import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  { path: 'auth', component: AuthComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
