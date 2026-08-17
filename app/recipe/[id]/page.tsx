import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_RECIPES } from '@/data/recipes';
import styles from './page.module.css';
import Image from 'next/image';

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
        {/* <Image src={recipe.imageUrl} alt={recipe.title} className={styles.image} /> */}
        <Image src={recipe.imageUrl} alt={recipe.title} className={styles.image} />
        
        <div className={styles.header}>
          <span className={styles.badge}>{recipe.category}</span>
          <h1 className={styles.title}>{recipe.title}</h1>
          <p className={styles.meta}>⏱️ {recipe.prepTime} • 👥 {recipe.servings} servings</p>
        </div>
      </div>

      <p className={styles.description}>{recipe.description}</p>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Ingredients</h2>
          <ul className={styles.ingredientList}>
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className={styles.ingredientItem}>
                <span>{ing.name}</span>
                <strong className={styles.amount}>{ing.amount}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Instructions</h2>
          <ol className={styles.instructionList}>
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className={styles.instructionStep}>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}