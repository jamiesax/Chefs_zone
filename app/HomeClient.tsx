'use client';

import { useState, useEffect } from 'react';
import { Recipe, CuisineRegion, MealCategory } from '@/types/index';
import RecipeCard from '@/components/recipe/RecipeCard';
import Hero from '@/components/home/Hero';
import styles from './page.module.css';

interface HomeClientProps {
  initialRecipes: Recipe[];
  selectedRegion?: string;
}

const CATEGORIES: MealCategory[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export default function HomeClient({ initialRecipes, selectedRegion = 'All' }: HomeClientProps) {
  const [activeCategory, setActiveCategory] = useState<MealCategory>('All');
  const [regionFilter, setRegionFilter] = useState<string>(selectedRegion);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync internal state if selectedRegion prop changes externally
  useEffect(() => {
    setRegionFilter(selectedRegion);
  }, [selectedRegion]);

  // Handler to set region and scroll to the target element automatically
  const handleSelectRegion = (region: string) => {
    setRegionFilter(region);

    setTimeout(() => {
      let targetId = 'recipes-section';
      if (region === 'African') targetId = 'section-african';
      if (region === 'Intercontinental') targetId = 'section-intercontinental';
      if (region === 'Desserts') targetId = 'section-desserts';

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Filter recipes by Region, Category, and Search Query
  const filterRecipes = (region: CuisineRegion) => {
    return initialRecipes.filter((r) => {
      const matchesRegion = r.region === region;
      const matchesCategory =
        activeCategory === 'All' ||
        r.category?.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();

      // Safe ingredient search (handles raw strings OR objects like { name: "..." })
      const matchesIngredients = Array.isArray(r.ingredients) && r.ingredients.some((ing) => {
        if (typeof ing === 'string') {
          return ing.toLowerCase().includes(query);
        }
        if (typeof ing === 'object' && ing !== null) {
          return JSON.stringify(ing).toLowerCase().includes(query);
        }
        return String(ing).toLowerCase().includes(query);
      });

      const matchesSearch =
        !query ||
        r.title?.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query) ||
        matchesIngredients;

      return matchesRegion && matchesCategory && matchesSearch;
    });
  };

  const africanRecipes = filterRecipes('African');
  const intercontinentalRecipes = filterRecipes('Intercontinental');
  const dessertRecipes = filterRecipes('Desserts');

  const totalVisibleRecipes =
    africanRecipes.length + intercontinentalRecipes.length + dessertRecipes.length;

  return (
    <main className={styles.main}>
      {/* Pass full props required by Hero */}
      <Hero
        activeCategory={activeCategory}
        onSelectCategory={(category) => setActiveCategory(category as MealCategory)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className={styles.container} id="recipes-section">

        {/* 1. African / Nigerian Section */}
        {(regionFilter === 'All' || regionFilter === 'African') && africanRecipes.length > 0 && (
          <section className={styles.section} id="section-african">
            <h2 className={styles.sectionTitle}>🇳🇬 African & Nigerian Cuisine</h2>
            <div className={styles.grid}>
              {africanRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* 2. Intercontinental Section */}
        {(regionFilter === 'All' || regionFilter === 'Intercontinental') && intercontinentalRecipes.length > 0 && (
          <section className={styles.section} id="section-intercontinental">
            <h2 className={styles.sectionTitle}>🌍 Intercontinental Dishes</h2>
            <div className={styles.grid}>
              {intercontinentalRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* 3. Desserts Section */}
        {(regionFilter === 'All' || regionFilter === 'Desserts') && dessertRecipes.length > 0 && (
          <section className={styles.section} id="section-desserts">
            <h2 className={styles.sectionTitle}>🍰 Desserts & Sweets</h2>
            <div className={styles.grid}>
              {dessertRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State Fallback */}
        {totalVisibleRecipes === 0 && (
          <div className={styles.emptyState}>
            <p>No recipes found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setRegionFilter('All');
                setSearchQuery('');
              }}
              className={styles.resetBtn}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}