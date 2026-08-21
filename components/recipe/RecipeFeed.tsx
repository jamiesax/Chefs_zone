'use client';

import { useState, useMemo } from 'react';
import { Recipe } from '@/types';
import RecipeCard from './RecipeCard';
import styles from './RecipeFeed.module.css';

interface RecipeFeedProps {
  initialRecipes: Recipe[];
}

const CATEGORIES = ['All', 'Healthy', 'Breakfast', 'Quick'];

// Helper function to safely extract string from ingredient items
function getIngredientText(ing: unknown): string {
  if (typeof ing === 'string') return ing;
  if (typeof ing === 'object' && ing !== null) {
    const obj = ing as Record<string, unknown>;
    return String(obj.name || obj.ingredient || obj.title || '');
  }
  return String(ing || '');
}

export default function RecipeFeed({ initialRecipes }: RecipeFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter((recipe) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        (recipe.region && recipe.region.toLowerCase().includes(query)) ||
        recipe.ingredients.some((ing) =>
          getIngredientText(ing).toLowerCase().includes(query)
        );

      const matchesCategory =
        selectedCategory === 'All' ||
        recipe.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [initialRecipes, searchQuery, selectedCategory]);

  return (
    <div className={styles.wrapper}>
      {/* Search Input */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search recipes, ingredients, or regions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Category Chips */}
      <div className={styles.categoryContainer}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.chip} ${
              selectedCategory === cat ? styles.chipActive : ''
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <section className={styles.grid}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      ) : (
        <div className={styles.emptyState}>
          <p>No recipes found matching your search.</p>
        </div>
      )}
    </div>
  );
}