import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  // @Output() ingredientToAdd = new EventEmitter<Ingredient>();
  @Output() cleanIngredients = new EventEmitter<void>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const ingredientName = this.name.nativeElement.value;
    const ingredientAmount = this.amount.nativeElement.value;
    const ingredient = new Ingredient(ingredientName, ingredientAmount);
    // this.ingredientToAdd.emit(ingredient);
    this.shoppingListService.addItem(ingredient);
  }

  onCleanUpList() {
    this.cleanIngredients.emit();
  }

}
