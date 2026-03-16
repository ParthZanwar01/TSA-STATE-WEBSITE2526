/**
 * Shared types for SQLite-backed data. Kept in a separate module to avoid
 * circular dependencies between sqlite.ts and hooks (useUserReviews, useBusinessStore).
 */

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

export interface PendingBusiness {
  id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  website?: string;
  priceRange: string;
  description: string;
  ownerName: string;
  ownerEmail: string;
  hours?: string;
  submittedAt: string;
}
