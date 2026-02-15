/**
 * Accessibility context: high-contrast mode.
 * Persists to localStorage for FBLA rubric: "Accessibility features."
 */

import { createContext, useContext, useState, useLayoutEffect, type ReactNode } from 'react';

const STORAGE_KEY = 'locallink_high_contrast';

type AccessibilityContextType = {
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useLayoutEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(highContrast));
    } catch {}
    document.documentElement.setAttribute('data-high-contrast', highContrast ? 'true' : 'false');
  }, [highContrast]);

  return (
    <AccessibilityContext.Provider value={{ highContrast, setHighContrast: setHighContrastState }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
};
