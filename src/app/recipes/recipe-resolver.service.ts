import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs/Observable';
/**
 * Created by Farouk Errahmani on 21/04/2017.
 */
@Injectable()
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
      return this.recipeService.getRecipe(+route.params['id']);
  }


}
