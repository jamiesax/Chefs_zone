import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch recipes created specifically by this user
  const { data: userRecipes } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const formattedRecipes = (userRecipes || []).map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    region: item.region || 'African',
    prepTime: item.prep_time,
    servings: item.servings,
    description: item.description,
    imageUrl: item.image_url,
    ingredients: item.ingredients,
    instructions: item.instructions,
    userId: item.user_id,
  }));

  return <ProfileClient user={user} initialRecipes={formattedRecipes} />;
}