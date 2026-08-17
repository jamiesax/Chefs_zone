'use client';

import { useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('chefs_zone_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse favorites', e);
      return [];
    }
  });

  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];

      localStorage.setItem('chefs_zone_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  return { favorites, toggleFavorite, isFavorite };
}