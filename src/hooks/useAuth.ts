import { useState, useEffect } from 'react';
import { authApi, type User } from '@/lib/authApi';
import { useToast } from '@/hooks/use-toast';

export type { User };

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    authApi.getUser().then(({ user }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { user } = await authApi.signUp(email, password, name);
      setUser(user);
      toast({ title: 'Account created!', description: 'Welcome! You have been signed in.' });
      return { data: { user }, error: null };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign up failed';
      toast({ title: 'Sign up failed', description: msg, variant: 'destructive' });
      return { data: null, error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await authApi.signIn(email, password);
      setUser(user);
      toast({ title: 'Welcome back!', description: 'You have successfully signed in.' });
      return { data: { user }, error: null };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      toast({ title: 'Sign in failed', description: msg, variant: 'destructive' });
      return { data: null, error: err };
    }
  };

  const signOut = async () => {
    try {
      await authApi.signOut();
      setUser(null);
      toast({ title: 'Signed out', description: 'You have been signed out successfully.' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign out failed';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
};
