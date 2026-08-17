'use client';

import Link from 'next/link';
import { useFavorites } from '@/lib/useFavorites';
import { MOCK_RECIPES } from '@/data/recipes';
import RecipeCard from '@/components/recipe/RecipeCard';
import styles from './page.module.css';

export default function SavedRecipesPage() {
  const { favorites } = useFavorites();

  const savedRecipes = MOCK_RECIPES.filter((recipe) =>
    favorites.includes(recipe.id)
  );

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