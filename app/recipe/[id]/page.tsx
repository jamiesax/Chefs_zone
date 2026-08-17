import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_RECIPES } from '@/data/recipes';
import CookMode from '@/components/recipe/CookMode';
import styles from './page.module.css';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = MOCK_RECIPES.find((r) => r.id === id);

  if (!recipe) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Back to Recipes
      </Link>

      <div className={styles.hero}>
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          fill
          priority
          className={styles.image}
          sizes="(max-width: 800px) 100vw, 800px"
        />
        <div className={styles.header}>
          <span className={styles.badge}>{recipe.category}</span>
          <h1 className={styles.title}>{recipe.title}</h1>
          <p className={styles.meta}>
            ⏱️ {recipe.prepTime} • 👥 {recipe.servings} servings
          </p>
        </div>
      </div>

      <p className={styles.description}>{recipe.description}</p>

      {/* Interactive Cook Mode & Ingredients */}
      <CookMode
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
      />
    </article>
  );
}