export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: string;
  servings: number;
  category: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
}