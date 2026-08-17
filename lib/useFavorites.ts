'use client';

import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Read from localStorage only after initial client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem('chefs_zone_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to read favorites from localStorage', e);
    }
  }, []);

  // Update localStorage when favorites change (only after mounting)
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('chefs_zone_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites, isMounted]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => {
    return isMounted && favorites.includes(id);
  };

  return { favorites, toggleFavorite, isFavorite, isMounted };
}