import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @ViewChild('f') form: NgForm;
  editMode = false;
  selectedItemIndex: number;
  ingredientSelected: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientToEdit.subscribe(
      (id: number) => {
        this.editMode = true;
        this.selectedItemIndex = id;
        this.ingredientSelected = this.shoppingListService.getIngredient(id);
        this.formSetValue(this.ingredientSelected);
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const ingredientName = form.value.name;
    const ingredientAmount = form.value.amount;
    const ingredient = new Ingredient(ingredientName, ingredientAmount);
    if (!this.editMode) {
      this.addItem(ingredient);
    } else {
      this.editItem(ingredient);
    }
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedItemIndex);
    this.resetEditModeAndForm();
  }

  onClear() {
    this.resetEditModeAndForm();
  }

  private formSetValue(ingredient: Ingredient) {
    this.form.setValue({
      'name': ingredient.name,
      'amount': ingredient.amount
    });
  }

  private addItem(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  private editItem(ingredient: Ingredient) {
    this.shoppingListService.updateIngredient(ingredient, this.selectedItemIndex);
    this.resetEditModeAndForm();
  }

  private resetEditModeAndForm() {
    this.editMode = false;
    this.form.reset();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
