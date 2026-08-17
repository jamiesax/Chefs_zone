import Link from 'next/link';
import RecipeFeed from '@/components/recipe/RecipeFeed';
import { MOCK_RECIPES } from '@/data/recipes';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Chef&apos;s Zone</h1>
          <p className={styles.subtitle}>Your happy place in the kitchen</p>
        </div>
        <Link href="/saved" className={styles.savedLink}>
          ❤️ Saved Recipes
        </Link>
      </header>

      <RecipeFeed initialRecipes={MOCK_RECIPES} />
    </main>
  );
}