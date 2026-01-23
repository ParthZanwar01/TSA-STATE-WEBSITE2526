/**
 * Hook for managing user favorites (bookmarked businesses).
 * Persists to localStorage per user ID for FBLA rubric: "Saving/bookmarking favorites."
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'locallink_favorites';
const GUEST_ID = 'guest';

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
  const effectiveId = userId ?? GUEST_ID;
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites(effectiveId));
  }, [effectiveId]);

  const toggle = useCallback(
    (businessId: string) => {
      setFavorites((prev) => {
        const next = prev.includes(businessId)
          ? prev.filter((id) => id !== businessId)
          : [...prev, businessId];
        saveFavorites(effectiveId, next);
        return next;
      });
    },
    [effectiveId]
  );

  const isFavorite = useCallback(
    (businessId: string) => favorites.includes(businessId),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
};
