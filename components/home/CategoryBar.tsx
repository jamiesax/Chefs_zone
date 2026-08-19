'use client';

import { useEffect, useState } from 'react';
import styles from './CategoryBar.module.css';

const CATEGORIES = [
  { label: 'All', id: 'all' },
  { label: 'Breakfast', id: 'breakfast' },
  { label: 'Lunch', id: 'lunch' },
  { label: 'Dinner', id: 'dinner' },
  { label: 'Desserts', id: 'desserts' },
];

export default function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Triggers when section enters upper middle view
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.bar}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => scrollToSection(cat.id)}
          className={`${styles.pill} ${
            activeCategory === cat.id ? styles.active : ''
          }`}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}