import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  form: FormGroup;
  private recipeToEdit: Recipe = null;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
    if (this.editMode) {
      this.route.data.subscribe (
         (data: Data) => {
           this.recipeToEdit = data['recipe'];
         }
      );
    }
    this.initForm();
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeUrl = '';
    let recipeIngredients = new FormArray([]);
    if (this.recipeToEdit !== null) {
      recipeName = this.recipeToEdit.name;
      recipeDescription = this.recipeToEdit.description;
      recipeUrl = this.recipeToEdit.imagePath;
      if (this.recipeToEdit['ingredients']) {
        for (let ingredient of this.recipeToEdit.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]
              )
            })
          );
        }
      }
    }
    this.form = new FormGroup({
       'name': new FormControl(recipeName, Validators.required),
       'description': new FormControl(recipeDescription, Validators.required),
       'imagePath': new FormControl(recipeUrl, Validators.required),
       'ingredients': recipeIngredients
     });
  }

  onSubmit() {
    // const name = this.form.value['name'];
    // const description = this.form.value['description'];
    // const url = this.form.value['imagePath'];
    // const ingredients = this.form.value['ingredients'];
    // const recipe = new Recipe(name, description, url, ingredients);
    // ==> use of the reactive approach. The form match with the model.
    if (this.editMode) {
      this.recipeService.updateRecipe(this.form.value, this.id);
    } else {
      this.recipeService.addRecipe(this.form.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    const ingredient = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.form.get('ingredients')).push(ingredient);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);

  }

}
