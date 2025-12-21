/**
 * Hook for user-submitted reviews. Stores reviews in localStorage
 * to persist across sessions. Used to satisfy FBLA rubric: "Allowing
 * users to leave reviews or ratings."
 */

import { useState, useEffect, useCallback } from 'react';

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

const STORAGE_KEY = 'locallink_user_reviews';

const loadReviews = (): UserReview[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveReviews = (reviews: UserReview[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

/** Load all user-submitted reviews (for admin). */
export const getAllReviews = (): UserReview[] => loadReviews();

/** Remove a review by id (for admin). Persists to localStorage. */
export const removeReviewById = (reviewId: string): void => {
  const all = loadReviews();
  const next = all.filter((r) => r.id !== reviewId);
  saveReviews(next);
};

export const useUserReviews = (businessId: string | null) => {
  const [reviews, setReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    if (!businessId) return setReviews([]);
    const all = loadReviews();
    setReviews(all.filter((r) => r.businessId === businessId));
  }, [businessId]);

  const addReview = useCallback(
    (userId: string, author: string, rating: number, text: string) => {
      if (!businessId) return;
      const initials = author
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      const review: UserReview = {
        id: `ur_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        businessId,
        userId,
        author,
        initials,
        rating,
        text,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      };
      const all = loadReviews();
      all.push(review);
      saveReviews(all);
      setReviews((prev) => [...prev, review]);
    },
    [businessId]
  );

  return { reviews, addReview };
};
