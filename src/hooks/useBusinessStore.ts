/**
 * Business store for admin: pending submissions and approved (user-submitted) businesses.
 * Static businesses from businessData remain read-only. Approved businesses from SQLite.
 */

import { useState, useCallback, useEffect } from 'react';
import { businesses as staticBusinesses, type Business } from '@/data/businessData';
import type { PendingBusiness } from '@/types/db';
import { sanitizeText } from '@/lib/sanitize';
import {
  getApprovedBusinesses,
  getPendingBusinesses,
  addApprovedBusiness as dbAddApproved,
  addPendingBusiness as dbAddPending,
  removePendingBusiness as dbRemovePending,
  updateApprovedBusiness as dbUpdateApproved,
  removeApprovedBusiness as dbRemoveApproved,
  isDbReady,
} from '@/lib/sqlite';

export type { PendingBusiness };

const CYPRESS_LAT = 29.9691;
const CYPRESS_LNG = -95.6977;
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop';

/** Generate a full Business from a pending submission */
function pendingToBusiness(p: PendingBusiness): Business {
  return {
    id: `biz_submitted_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    name: p.name,
    category: p.category,
    rating: 0,
    reviewCount: 0,
    address: p.address,
    description: p.description,
    image: DEFAULT_IMAGE,
    priceRange: p.priceRange,
    isOpen: true,
    lat: CYPRESS_LAT,
    lng: CYPRESS_LNG,
    phone: p.phone || undefined,
  };
}

/** Same logic as BusinessDetail generateReviews: number of preset reviews shown for a business */
function getPresetReviewCount(bizId: string): number {
  const hash = bizId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return 3 + (hash % 4);
}

function loadFromDb() {
  const approved = isDbReady() ? getApprovedBusinesses() : [];
  return {
    approved: approved.map((b) => ({
      ...b,
      reviewCount: b.reviewCount + getPresetReviewCount(b.id),
    })),
    pending: isDbReady() ? getPendingBusinesses() : [],
  };
}

export function useBusinessStore() {
  const [pending, setPending] = useState<PendingBusiness[]>([]);
  const [approved, setApproved] = useState<Business[]>([]);

  useEffect(() => {
    const { approved: a, pending: p } = loadFromDb();
    setApproved(a);
    setPending(p);
  }, []);

  const allBusinesses = [...staticBusinesses, ...approved];

  const addPending = useCallback((data: Omit<PendingBusiness, 'id' | 'submittedAt'>) => {
    const item: PendingBusiness = {
      name: sanitizeText(data.name, 100),
      category: sanitizeText(data.category, 50),
      address: sanitizeText(data.address, 200),
      description: sanitizeText(data.description, 500),
      priceRange: sanitizeText(data.priceRange, 10),
      ownerName: sanitizeText(data.ownerName, 100),
      ownerEmail: sanitizeText(data.ownerEmail, 255),
      phone: data.phone ? sanitizeText(data.phone, 20) : undefined,
      website: data.website ? sanitizeText(data.website, 255) : undefined,
      hours: data.hours ? sanitizeText(data.hours, 200) : undefined,
      id: `pending_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      submittedAt: new Date().toISOString(),
    };
    setPending((prev) => [...prev, item]);
    dbAddPending(item);
  }, []);

  const approvePending = useCallback((pendingId: string) => {
    const p = pending.find((x) => x.id === pendingId);
    if (!p) return;
    const biz = pendingToBusiness(p);
    const withPresetCount = { ...biz, reviewCount: biz.reviewCount + getPresetReviewCount(biz.id) };
    setApproved((prev) => [...prev, withPresetCount]);
    setPending((prev) => prev.filter((x) => x.id !== pendingId));
    dbAddApproved(biz);
    dbRemovePending(pendingId);
  }, [pending]);

  const rejectPending = useCallback((pendingId: string) => {
    setPending((prev) => prev.filter((x) => x.id !== pendingId));
    dbRemovePending(pendingId);
  }, []);

  const updateBusiness = useCallback((id: string, updates: Partial<Business>) => {
    if (!id.startsWith('biz_submitted_')) return;
    setApproved((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
    dbUpdateApproved(id, updates);
  }, []);

  const removeBusiness = useCallback((id: string) => {
    if (!id.startsWith('biz_submitted_')) return;
    setApproved((prev) => prev.filter((b) => b.id !== id));
    dbRemoveApproved(id);
  }, []);

  const getBusinessById = useCallback(
    (id: string): Business | undefined =>
      allBusinesses.find((b) => b.id === id),
    [allBusinesses]
  );

  return {
    allBusinesses,
    pendingBusinesses: pending,
    addPending,
    approvePending,
    rejectPending,
    updateBusiness,
    removeBusiness,
    getBusinessById,
    isApprovedId: (id: string) => id.startsWith('biz_submitted_'),
  };
}
