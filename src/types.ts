export interface Ingredient {
  item: string;
  amount: number;
  unit: string;
}

export interface Step {
  title: string;
  description: string;
}

export type Category = 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert' | 'Snack';
export type Difficulty = 'Easy' | 'Intermediate' | 'Hardcore';

export interface Recipe {
  id: string;
  title: string;
  category: Category;
  cookTime: number;
  prepTime: number;
  difficulty: Difficulty;
  ingredients: Ingredient[];
  steps: Step[];
  imageUrl: string;
  description: string;
  servings: number;
}
