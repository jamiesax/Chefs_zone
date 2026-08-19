import { createClient } from '@/lib/supabase/server';
import { Recipe } from '@/types/index';

export async function getRecipes(): Promise<Recipe[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recipes from Supabase:', error);
    return [];
  }

  // Map database snake_case columns to frontend camelCase model
  return (data || []).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    region: item.region || 'African', // Default fallback
    category: item.category,
    prepTime: item.prep_time || item.prepTime,
    servings: item.servings,
    imageUrl: item.image_url || item.imageUrl,
    ingredients: item.ingredients || [],
    instructions: item.instructions || [],
    userId: item.user_id,
  }));
}