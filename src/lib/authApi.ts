/**
 * Local auth API - Uses localStorage (no backend required)
 * Sign up persists users. Sign in verifies email + password.
 * Admin: admin@locallink.com / admin123 (same login page)
 * Demo: demo@locallink.com / demo123
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'user' | 'admin' | 'business_owner';
}

interface StoredUser {
  id: string;
  email: string;
  password: string;
  name?: string;
}

const STORAGE_KEY = 'locallink_user';
const USERS_KEY = 'locallink_users';
const DEMO_EMAIL = 'demo@locallink.com';
const DEMO_PASSWORD = 'demo123';
const ADMIN_EMAIL = 'admin@locallink.com';
const ADMIN_PASSWORD = 'admin123';

const generateId = () =>
  `user_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 10)}`;

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toUser(u: StoredUser): User {
  return { id: u.id, email: u.email, name: u.name, role: 'user' };
}

export const authApi = {
  async signUp(email: string, password: string, name?: string) {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !password) throw new Error('Email and password are required');
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === trimmed)) {
      throw new Error('An account with this email already exists. Sign in instead.');
    }
    const stored: StoredUser = {
      id: generateId(),
      email: trimmed,
      password,
      name: (name || trimmed.split('@')[0]).trim() || undefined,
    };
    users.push(stored);
    saveUsers(users);
    const user: User = toUser(stored);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { user };
  },

  async signIn(email: string, password: string) {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !password) throw new Error('Email and password are required');

    // Admin login (same page, special credentials)
    if (trimmed === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user: User = {
        id: generateId(),
        email: ADMIN_EMAIL,
        name: 'Admin',
        role: 'admin',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return { user };
    }

    // Demo login
    if (trimmed === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const user: User = {
        id: generateId(),
        email: DEMO_EMAIL,
        name: 'Demo User',
        role: 'user',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return { user };
    }

    // Registered users
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === trimmed);
    if (found) {
      if (found.password !== password) {
        throw new Error('Incorrect password');
      }
      const user: User = toUser(found);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return { user };
    }

    throw new Error('No account found with this email. Sign up to create one.');
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
