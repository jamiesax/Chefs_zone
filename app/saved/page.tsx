'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/lib/useFavorites';
import { MOCK_RECIPES } from '@/data/recipes';
import { createClient } from '@/lib/supabase/client';
import RecipeCard from '@/components/recipe/RecipeCard';
import { Recipe } from '@/types/index';
import styles from './page.module.css';

export default function SavedRecipesPage() {
  const { favorites, isMounted } = useFavorites();
  const [allRecipes, setAllRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const supabase = createClient();

  useEffect(() => {
    async function loadDbRecipes() {
      const { data: dbRecipes } = await supabase.from('recipes').select('*');
      if (dbRecipes) {
        const formatted: Recipe[] = dbRecipes.map((item) => ({
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
        }));
        
        setAllRecipes([...formatted, ...MOCK_RECIPES]);
      }
    }

    loadDbRecipes();
  }, [supabase]);

  // Don't render until client mount to avoid hydration mismatches
  if (!isMounted) return null;

  const savedRecipes = allRecipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to All Recipes
        </Link>
        <h1 className={styles.title}>Your Saved Recipes</h1>
        <p className={styles.subtitle}>
          {savedRecipes.length === 1
            ? '1 recipe saved for later'
            : `${savedRecipes.length} recipes saved for later`}
        </p>
      </div>

      {savedRecipes.length > 0 ? (
        <section className={styles.grid}>
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      ) : (
        <div className={styles.emptyState}>
          <p>You haven&apos;t bookmarked any recipes yet.</p>
          <Link href="/" className={styles.exploreButton}>
            Explore Recipes
          </Link>
        </div>
      )}
    </main>
  );
}