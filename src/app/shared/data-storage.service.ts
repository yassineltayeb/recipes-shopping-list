import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private baseUrl: string = environment.baseUrl + 'recipes.json';

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put<Recipe[]>(this.baseUrl, recipes).subscribe(res => {
    });
  }

  getRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          });
        }), tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}
