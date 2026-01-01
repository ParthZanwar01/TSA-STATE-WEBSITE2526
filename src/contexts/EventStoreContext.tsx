/**
 * Event store context: pending submissions + approved user events.
 */

import { createContext, useContext, ReactNode } from 'react';
import { useEventStore } from '@/hooks/useEventStore';

type EventStoreContextType = ReturnType<typeof useEventStore>;

const EventStoreContext = createContext<EventStoreContextType | undefined>(undefined);

export function EventStoreProvider({ children }: { children: ReactNode }) {
  const store = useEventStore();
  return (
    <EventStoreContext.Provider value={store}>
      {children}
    </EventStoreContext.Provider>
  );
}

export function useEventStoreContext() {
  const ctx = useContext(EventStoreContext);
  if (!ctx) throw new Error('useEventStoreContext must be used within EventStoreProvider');
  return ctx;
}
