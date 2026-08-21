import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MOCK_RECIPES } from '@/data/recipes';
import RecipeDetailClient from './RecipeDetailClient';

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

  // Safely map elements (strings or objects) into formatted string strings
  return list.map((item) => {
    if (typeof item === 'string') return item;

    if (typeof item === 'object' && item !== null) {
      const obj = item as Record<string, unknown>;
      const amount = obj.amount ? `${obj.amount} ` : '';
      const unit = obj.unit ? `${obj.unit} ` : '';
      const name = obj.name || obj.ingredient || obj.title || '';

      const combined = `${amount}${unit}${name}`.trim();
      return combined || JSON.stringify(item);
    }

    return String(item);
  });
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