import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MOCK_RECIPES } from '@/data/recipes';
import RecipeDetailClient from './RecipeDetailClient';

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

function parseList(data: unknown): string[] {
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [data];
    }
  }
  return [];
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = await params;

  let recipe = MOCK_RECIPES.find((r) => r.id === id);

  if (!recipe) {
    const supabase = await createClient();
    const { data: dbRecipe } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (dbRecipe) {
      recipe = {
        id: dbRecipe.id,
        title: dbRecipe.title,
        category: dbRecipe.category,
        prepTime: dbRecipe.prep_time,
        servings: dbRecipe.servings,
        description: dbRecipe.description,
        imageUrl: dbRecipe.image_url,
        ingredients: parseList(dbRecipe.ingredients),
        instructions: parseList(dbRecipe.instructions),
        userId: dbRecipe.user_id,
      };
    }
  }

  if (!recipe) {
    notFound();
  }

  return (
    <RecipeDetailClient
      recipe={recipe}
      ingredientsList={parseList(recipe.ingredients)}
      instructionsList={parseList(recipe.instructions)}
    />
  );
}