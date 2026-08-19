import { createClient } from '@/lib/supabase/server';
import { MOCK_RECIPES } from '@/data/recipes';
import HomeClient from './HomeClient';

export default async function Home() {
  const supabase = await createClient();

  // Fetch custom recipes from Supabase
  const { data: dbRecipes } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  // Map DB schema (snake_case) to client Recipe interface (camelCase)
  const userRecipes = (dbRecipes || []).map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    region: item.region || 'African', // <--- Added region mapping with fallback
    prepTime: item.prep_time,
    servings: item.servings,
    description: item.description,
    imageUrl: item.image_url,
    ingredients: item.ingredients || [],
    instructions: item.instructions || [],
    userId: item.user_id,
  }));

  const allRecipes = [...userRecipes, ...MOCK_RECIPES];

  return <HomeClient initialRecipes={allRecipes} />;
}