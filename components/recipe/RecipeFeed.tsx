'use client';

import { useState, useMemo } from 'react';
import { Recipe } from '@/types';
import RecipeCard from './RecipeCard';
import styles from './RecipeFeed.module.css';

interface RecipeFeedProps {
  initialRecipes: Recipe[];
}

const CATEGORIES = ['All', 'Healthy', 'Breakfast', 'Quick'];

export default function RecipeFeed({ initialRecipes }: RecipeFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'All' ||
        recipe.category.toLowerCase() === selectedCategory.toLowerCase() ||
        recipe.tags.some(
          (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
        );

      return matchesSearch && matchesCategory;
    });
  }, [initialRecipes, searchQuery, selectedCategory]);

  return (
    <div className={styles.wrapper}>
      {/* Search Input */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search recipes or ingredients..."
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