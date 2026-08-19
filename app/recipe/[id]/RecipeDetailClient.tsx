'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/types/index';
import CookModeModal from '@/components/recipe/CookModeModal';
import styles from './page.module.css';

interface RecipeDetailClientProps {
  recipe: Recipe;
  ingredientsList: string[];
  instructionsList: string[];
}

export default function RecipeDetailClient({
  recipe,
  ingredientsList,
  instructionsList,
}: RecipeDetailClientProps) {
  const [cookModeOpen, setCookModeOpen] = useState(false);

  return (
    <main className={styles.container}>
      {/* 1. Cleaned Top Bar with back link only */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.backBtn}>
          ← Back to Recipes
        </Link>
      </div>

      <div className={styles.heroSection}>
        <div className={styles.imageContainer}>
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.meta}>
          <span className={styles.badge}>{recipe.category}</span>
          <h1 className={styles.title}>{recipe.title}</h1>
          <p className={styles.description}>{recipe.description}</p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Prep Time</span>
              <span className={styles.statValue}>{recipe.prepTime}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Servings</span>
              <span className={styles.statValue}>{recipe.servings}</span>
            </div>
          </div>

          {/* 2. Moved here: Directly under stats */}
          <button
            onClick={() => setCookModeOpen(true)}
            className={styles.cookModeBtn}
          >
            👨‍🍳 Start Cook Mode
          </button>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ingredients</h2>
          <ul className={styles.ingredientsList}>
            {ingredientsList.map((item, idx) => (
              <li key={idx} className={styles.ingredientItem}>
                <span className={styles.bullet}>•</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Instructions</h2>
          <ol className={styles.instructionsList}>
            {instructionsList.map((step, idx) => (
              <li key={idx} className={styles.instructionItem}>
                <span className={styles.stepNum}>{idx + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Render Cook Mode Modal */}
      {cookModeOpen && (
        <CookModeModal
          recipeTitle={recipe.title}
          instructions={instructionsList}
          onClose={() => setCookModeOpen(false)}
        />
      )}
    </main>
  );
}