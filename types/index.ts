import { StaticImageData } from 'next/image';

export interface Ingredient {
  name: string;
  amount: string;
}

export type CuisineRegion = 'African' | 'Intercontinental' | 'Desserts';
export type MealCategory = 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  region: CuisineRegion;
  category: MealCategory;
  prepTime: string;
  servings: number;
  imageUrl: string | StaticImageData;
  ingredients: string[];
  instructions: string[];
  userId?: string;
}