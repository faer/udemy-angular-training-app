import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input('recipe-item') recipe: Recipe;
  @Input() index: number;

  ngOnInit() {
  }

}
