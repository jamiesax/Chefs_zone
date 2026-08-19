import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import EditRecipeClient from './EditRecipeClient';

interface EditRecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: recipe } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (!recipe) {
    notFound();
  }

  // Ensure only owner can access edit page
  if (recipe.user_id !== user.id) {
    redirect('/');
  }

  const formattedRecipe = {
    id: recipe.id,
    title: recipe.title,
    category: recipe.category,
    prepTime: recipe.prep_time,
    servings: recipe.servings,
    description: recipe.description,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    userId: recipe.user_id,
  };

  return <EditRecipeClient recipe={formattedRecipe} />;
}