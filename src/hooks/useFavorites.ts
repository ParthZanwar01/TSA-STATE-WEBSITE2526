/**
 * Hook for managing user favorites (bookmarked businesses).
 * Persists to SQLite (IndexedDB) per user ID for FBLA rubric: "Saving/bookmarking favorites."
 */

import { useState, useEffect, useCallback } from 'react';
import { getFavorites as dbGetFavorites, toggleFavorite as dbToggleFavorite } from '@/lib/sqlite';

const GUEST_ID = 'guest';

export const useFavorites = (userId: string | null) => {
  const effectiveId = userId ?? GUEST_ID;
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(dbGetFavorites(effectiveId));
  }, [effectiveId]);

  const toggle = useCallback(
    (businessId: string) => {
      const next = dbToggleFavorite(effectiveId, businessId);
      setFavorites(next);
    },
    [effectiveId]
  );

  const isFavorite = useCallback(
    (businessId: string) => favorites.includes(businessId),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
};
