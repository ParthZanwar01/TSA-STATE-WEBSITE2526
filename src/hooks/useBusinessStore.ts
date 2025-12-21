/**
 * Business store for admin: pending submissions and approved (user-submitted) businesses.
 * Static businesses from businessData remain read-only. Approved businesses merge with static.
 */

import { useState, useCallback, useEffect } from 'react';
import { businesses as staticBusinesses, type Business } from '@/data/businessData';

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

const PENDING_KEY = 'locallink_pending_businesses';
const APPROVED_KEY = 'locallink_approved_businesses';
const CYPRESS_LAT = 29.9691;
const CYPRESS_LNG = -95.6977;
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop';

function loadPending(): PendingBusiness[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadApproved(): Business[] {
  try {
    const raw = localStorage.getItem(APPROVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePending(list: PendingBusiness[]) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(list));
}

function saveApproved(list: Business[]) {
  localStorage.setItem(APPROVED_KEY, JSON.stringify(list));
}

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

export function useBusinessStore() {
  const [pending, setPending] = useState<PendingBusiness[]>(loadPending);
  const [approved, setApproved] = useState<Business[]>(loadApproved);

  useEffect(() => {
    savePending(pending);
  }, [pending]);

  useEffect(() => {
    saveApproved(approved);
  }, [approved]);

  const allBusinesses = [...staticBusinesses, ...approved];

  const addPending = useCallback((data: Omit<PendingBusiness, 'id' | 'submittedAt'>) => {
    const item: PendingBusiness = {
      ...data,
      id: `pending_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      submittedAt: new Date().toISOString(),
    };
    setPending((prev) => [...prev, item]);
  }, []);

  const approvePending = useCallback((pendingId: string) => {
    const p = pending.find((x) => x.id === pendingId);
    if (!p) return;
    const biz = pendingToBusiness(p);
    setApproved((prev) => [...prev, biz]);
    setPending((prev) => prev.filter((x) => x.id !== pendingId));
  }, [pending]);

  const rejectPending = useCallback((pendingId: string) => {
    setPending((prev) => prev.filter((x) => x.id !== pendingId));
  }, []);

  const updateBusiness = useCallback((id: string, updates: Partial<Business>) => {
    if (!id.startsWith('biz_submitted_')) return; // only edit user-submitted
    setApproved((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  }, []);

  const removeBusiness = useCallback((id: string) => {
    if (!id.startsWith('biz_submitted_')) return;
    setApproved((prev) => prev.filter((b) => b.id !== id));
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
