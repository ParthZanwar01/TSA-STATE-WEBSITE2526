/**
 * Local auth API - Uses localStorage (no backend required)
 * Works offline. Demo: demo@locallink.com / demo123 or any email/password
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'user' | 'admin' | 'business_owner';
}

const STORAGE_KEY = 'locallink_user';
const DEMO_EMAIL = 'demo@locallink.com';
const DEMO_PASSWORD = 'demo123';

const generateId = () =>
  `user_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 10)}`;

export const authApi = {
  async signUp(email: string, password: string, name?: string) {
    const user: User = {
      id: generateId(),
      email,
      name: name || email.split('@')[0],
      role: 'user',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { user };
  },

  async signIn(email: string, password: string) {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === email) {
        return { user };
      }
    }
    // Demo login
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const user: User = {
        id: generateId(),
        email: DEMO_EMAIL,
        name: 'Demo User',
        role: 'user',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return { user };
    }
    // New user - create on first login (local mode)
    const user: User = {
      id: generateId(),
      email,
      name: email.split('@')[0],
      role: 'user',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { user };
  },

  async signOut() {
    localStorage.removeItem(STORAGE_KEY);
    return { message: 'Signed out successfully' };
  },

  async getUser(): Promise<{ user: User | null }> {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { user: null };
    try {
      const user = JSON.parse(stored);
      return { user };
    } catch {
      return { user: null };
    }
  },
};
