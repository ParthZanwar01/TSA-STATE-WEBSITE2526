import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import GlassCard from '@/components/GlassCard';
import { toast } from '@/hooks/use-toast';

const BusinessLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isSignUp ? "Account creation coming soon!" : "Login coming soon!",
      description: "Business management features are being built. Stay tuned!",
    });
  };

  return (
    <div className="pt-20 min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-gold/5" />
      <FloatingOrbs className="opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md mx-auto px-6"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-navy-gradient flex items-center justify-center mx-auto mb-5 depth-shadow"
          >
            <Building2 className="w-8 h-8 text-gold" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {isSignUp ? 'Create Account' : 'Business Portal'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp ? 'Join Cypress LocalLink as a business owner' : 'Manage your business listing on Cypress LocalLink'}
          </p>
        </div>

        {/* Form */}
        <GlassCard glow className="p-8 depth-shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <div className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center">
                    <Building2 className="w-3.5 h-3.5 text-gold" />
                  </div>
                  Business Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your business name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                />
              </motion.div>
            )}

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <div className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                </div>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@business.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <div className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-gold" />
                </div>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-gold hover:text-gold/80 transition-colors font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:bg-navy-light transition-colors depth-shadow"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gold font-semibold hover:text-gold/80 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </GlassCard>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Not a business owner?{' '}
          <Link to="/" className="text-gold hover:underline">
            Return to home
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default BusinessLogin;
