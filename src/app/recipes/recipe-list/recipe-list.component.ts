import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2014/06/16/23/10/spice-370114_960_720.jpg'),
    new Recipe('A test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2014/06/16/23/10/spice-370114_960_720.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
