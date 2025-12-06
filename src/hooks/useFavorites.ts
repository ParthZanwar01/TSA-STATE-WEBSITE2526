/**
 * Hook for managing user favorites (bookmarked businesses).
 * Persists to localStorage per user ID for FBLA rubric: "Saving/bookmarking favorites."
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'locallink_favorites';

const getStorageKey = (userId: string) => `${STORAGE_KEY}_${userId}`;

const loadFavorites = (userId: string): string[] => {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveFavorites = (userId: string, ids: string[]) => {
  localStorage.setItem(getStorageKey(userId), JSON.stringify(ids));
};

export const useFavorites = (userId: string | null) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      return;
    }
    setFavorites(loadFavorites(userId));
  }, [userId]);

  const toggle = useCallback(
    (businessId: string) => {
      if (!userId) return;
      setFavorites((prev) => {
        const next = prev.includes(businessId)
          ? prev.filter((id) => id !== businessId)
          : [...prev, businessId];
        saveFavorites(userId, next);
        return next;
      });
    },
    [userId]
  );

  const isFavorite = useCallback(
    (businessId: string) => favorites.includes(businessId),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
};
