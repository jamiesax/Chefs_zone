'use client';

import styles from './Hero.module.css';

interface HeroProps {
  activeCategory: string;
  onSelectCategory?: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export default function Hero({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: HeroProps) {
  const handleCategoryClick = (category: string) => {
    // Optional chaining prevents 'onSelectCategory is not a function' error
    onSelectCategory?.(category);

    // Smooth scroll down to the recipes section
    const gridElement = document.getElementById('recipe-grid');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Your Happy Place in the <span className={styles.highlight}>Kitchen</span>
        </h1>
        <p className={styles.subtitle}>
          Discover, curate, and share delicious homemade recipes from cooks around the world.
        </p>

        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Category Pills */}
        <div className={styles.categoryBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`${styles.chip} ${
                activeCategory?.toLowerCase() === cat.toLowerCase() ? styles.chipActive : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}