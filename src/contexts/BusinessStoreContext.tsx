/**
 * Shared business store context: pending submissions + approved businesses.
 * Provides allBusinesses (static + approved) for Directory, Map, etc.
 */

import { createContext, useContext, ReactNode } from 'react';
import { useBusinessStore } from '@/hooks/useBusinessStore';

type BusinessStoreContextType = ReturnType<typeof useBusinessStore>;

const BusinessStoreContext = createContext<BusinessStoreContextType | undefined>(undefined);

export function BusinessStoreProvider({ children }: { children: ReactNode }) {
  const store = useBusinessStore();
  return (
    <BusinessStoreContext.Provider value={store}>
      {children}
    </BusinessStoreContext.Provider>
  );
}

export function useBusinessStoreContext() {
  const ctx = useContext(BusinessStoreContext);
  if (!ctx) throw new Error('useBusinessStoreContext must be used within BusinessStoreProvider');
  return ctx;
}
