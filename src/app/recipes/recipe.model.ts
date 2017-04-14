/**
 * Created by Farouk Errahmani on 14/04/2017.
 */
export class Recipe {

  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, description: string, imagePath: string) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}
