import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
