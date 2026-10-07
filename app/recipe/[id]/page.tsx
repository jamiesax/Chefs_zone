import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MOCK_RECIPES } from '@/data/recipes';
import RecipeDetailClient from './RecipeDetailClient';
import FormatStringArray from '@/util/StringFormatter';

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

function parseList(data: unknown): string[] {
  if (!data) return [];

  let list = data;

  // Attempt to parse stringified JSON first
  if (typeof data === 'string') {
    try {
      list = JSON.parse(data);
    } catch {
      return [data];
    }
  }

  if (!Array.isArray(list)) return [];
  // console.log('Parsed List:', list);
  
  // Safely map elements (strings or objects) into formatted string strings
  return FormatStringArray(list);

  
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
        region: dbRecipe.region || 'African', // Added required region field with fallback
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