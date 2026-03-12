/**
 * Hook for user-submitted reviews. Persists to SQLite (IndexedDB).
 * Used to satisfy FBLA rubric: "Allowing users to leave reviews or ratings."
 */

import { useState, useEffect, useCallback } from 'react';
import { sanitizeText, sanitizeName } from '@/lib/sanitize';
import {
  getReviewsByBusinessId,
  getAllReviewsFromDb,
  addReview as dbAddReview,
  removeReviewById as dbRemoveReviewById,
} from '@/lib/sqlite';

export interface UserReview {
  id: string;
  businessId: string;
  userId: string;
  author: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
}

/** Load all user-submitted reviews (for admin / Reports). */
export const getAllReviews = (): UserReview[] => getAllReviewsFromDb();

/** Remove a review by id (for admin). Persists to SQLite. */
export const removeReviewById = (reviewId: string): void => {
  dbRemoveReviewById(reviewId);
};

export const useUserReviews = (businessId: string | null) => {
  const [reviews, setReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    if (!businessId) return setReviews([]);
    setReviews(getReviewsByBusinessId(businessId));
  }, [businessId]);

  const addReview = useCallback(
    (userId: string, author: string, rating: number, text: string) => {
      if (!businessId) return;
      const safeAuthor = sanitizeName(author) || 'Anonymous';
      const safeText = sanitizeText(text, 2000);
      const initials = safeAuthor
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      const review: UserReview = {
        id: `ur_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        businessId,
        userId: sanitizeText(userId, 100),
        author: safeAuthor,
        initials: initials || '??',
        rating: Math.min(5, Math.max(1, Math.round(rating))),
        text: safeText,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      };
      dbAddReview(review);
      setReviews((prev) => [...prev, review]);
    },
    [businessId]
  );

  return { reviews, addReview };
};
