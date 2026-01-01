/**
 * Event store: pending event submissions + approved user events.
 * Static events from businessData merge with approved user events.
 */

import { useState, useCallback, useEffect } from 'react';
import { type Event } from '@/data/businessData';
import { sanitizeText } from '@/lib/sanitize';

export interface PendingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  submitterEmail: string;
  submitterName: string;
  submittedAt: string;
}

const PENDING_KEY = 'locallink_pending_events';
const APPROVED_KEY = 'locallink_approved_events';

function loadPending(): PendingEvent[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadApproved(): Event[] {
  try {
    const raw = localStorage.getItem(APPROVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePending(list: PendingEvent[]) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(list));
}

function saveApproved(list: Event[]) {
  localStorage.setItem(APPROVED_KEY, JSON.stringify(list));
}

function parseDate(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr + 'T00:00:00');
  return {
    day: d.getDate().toString(),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
  };
}

function pendingToEvent(p: PendingEvent): Event {
  const { day, month } = parseDate(p.date);
  return {
    id: `evt_submitted_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    title: p.title,
    date: p.date,
    day,
    month,
    time: p.time,
    location: p.location,
  };
}

export function useEventStore() {
  const [pending, setPending] = useState<PendingEvent[]>(loadPending);
  const [approved, setApproved] = useState<Event[]>(loadApproved);

  useEffect(() => { savePending(pending); }, [pending]);
  useEffect(() => { saveApproved(approved); }, [approved]);

  const addPending = useCallback((data: Omit<PendingEvent, 'id' | 'submittedAt'>) => {
    const item: PendingEvent = {
      title: sanitizeText(data.title, 100),
      date: data.date,
      time: sanitizeText(data.time, 50),
      location: sanitizeText(data.location, 200),
      description: data.description ? sanitizeText(data.description, 500) : undefined,
      submitterEmail: sanitizeText(data.submitterEmail, 255),
      submitterName: sanitizeText(data.submitterName, 100),
      id: `pending_evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      submittedAt: new Date().toISOString(),
    };
    setPending((prev) => [...prev, item]);
  }, []);

  const approvePending = useCallback((pendingId: string) => {
    const p = pending.find((x) => x.id === pendingId);
    if (!p) return;
    const evt = pendingToEvent(p);
    setApproved((prev) => [...prev, evt]);
    setPending((prev) => prev.filter((x) => x.id !== pendingId));
  }, [pending]);

  const rejectPending = useCallback((pendingId: string) => {
    setPending((prev) => prev.filter((x) => x.id !== pendingId));
  }, []);

  const removeEvent = useCallback((id: string) => {
    if (!id.startsWith('evt_submitted_')) return;
    setApproved((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return {
    pendingEvents: pending,
    approvedEvents: approved,
    addPending,
    approvePending,
    rejectPending,
    removeEvent,
  };
}
