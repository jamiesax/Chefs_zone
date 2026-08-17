'use client';

import Link from 'next/link';
import { Recipe } from '@/types';
import { useFavorites } from '@/lib/useFavorites';
import styles from './RecipeCard.module.css';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(recipe.id);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* <img src={recipe.imageUrl} alt={recipe.title} className={styles.image} /> */}
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <span className={styles.badge}>{recipe.category}</span>
        <button
          type="button"
          onClick={() => toggleFavorite(recipe.id)}
          className={`${styles.saveButton} ${saved ? styles.saved : ''}`}
          aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>⏱️ {recipe.prepTime}</span>
          <span>👥 {recipe.servings} servings</span>
        </div>

        <h3 className={styles.title}>{recipe.title}</h3>
        <p className={styles.description}>{recipe.description}</p>

        <div className={styles.footer}>
          <Link href={`/recipe/${recipe.id}`} className={styles.button}>
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}