import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MOCK_RECIPES } from '@/data/recipes';
import { createClient } from '@/lib/supabase/server';
import CookMode from '@/components/recipe/CookMode';
import styles from './page.module.css';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { id } = await params;

  // 1. Check static mock recipes first
  let recipe = MOCK_RECIPES.find((r) => r.id === id);

  // 2. If not found in mock data, query Supabase
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
        ingredients: dbRecipe.ingredients,
        instructions: dbRecipe.instructions,
      };
    }
  }

  if (!recipe) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Back to Recipes
      </Link>

      <article className={styles.article}>
        <div className={styles.imageWrapper}>
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className={styles.header}>
          <span className={styles.badge}>{recipe.category}</span>
          <h1 className={styles.title}>{recipe.title}</h1>
          <p className={styles.meta}>
            ⏱️ {recipe.prepTime} | 🍽️ {recipe.servings} servings
          </p>
          <p className={styles.description}>{recipe.description}</p>
        </div>

        {/* Cook Mode Checklist */}
        <CookMode ingredients={recipe.ingredients} instructions={recipe.instructions} />
      </article>
    </main>
  );
}