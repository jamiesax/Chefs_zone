import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import RecipeFeed from '@/components/recipe/RecipeFeed';
import { MOCK_RECIPES } from '@/data/recipes';
import styles from './page.module.css';

export default async function Home() {
  const supabase = await createClient();

  // Get current user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    prepTime: item.prep_time,
    servings: item.servings,
    description: item.description,
    imageUrl: item.image_url,
    ingredients: item.ingredients,
    instructions: item.instructions,
  }));

  const allRecipes = [...userRecipes, ...MOCK_RECIPES];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Chef&apos;s Zone</h1>
          <p className={styles.subtitle}>Your happy place in the kitchen</p>
        </div>

        <div className={styles.navActions}>
          <Link href="/saved" className={styles.navLink}>
            ❤️ Saved
          </Link>

          {user ? (
            <>
              <Link href="/create" className={styles.createBtn}>
                ➕ Add Recipe
              </Link>
              <form action="/auth/signout" method="post">
                <button type="submit" className={styles.authBtn}>
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className={styles.authBtn}>
              Sign In
            </Link>
          )}
        </div>
      </header>

      <RecipeFeed initialRecipes={allRecipes} />
    </main>
  );
}