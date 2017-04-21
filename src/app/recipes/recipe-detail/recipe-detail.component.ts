import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  // @Input() recipe: Recipe;
  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.recipe = data['recipe'];
      }
    );
  }

  onAddToShoppingList() {
    this.shoppingListService.addItems(this.recipe.ingredients);
  }

}
