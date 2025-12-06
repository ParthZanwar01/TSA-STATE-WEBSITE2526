import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import GlassCard from '@/components/GlassCard';
import { ReCaptcha } from '@/components/ReCaptcha';
import { useAuth } from '@/hooks/AuthContext';

const BusinessLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) return;
    if (!email || !password) return;
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, name || undefined);
      } else {
        await signIn(email, password);
      }
      navigate('/directory');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    if (!captchaToken) return;
    setLoading(true);
    try {
      await signIn('demo@locallink.com', 'demo123');
      navigate('/directory');
    } finally {
      setLoading(false);
    }
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
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
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

            <div>
              <p className="text-sm font-medium text-foreground mb-2">Verify you&apos;re not a robot</p>
              <ReCaptcha onVerify={setCaptchaToken} size="compact" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !captchaToken}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:bg-navy-light transition-colors depth-shadow disabled:opacity-70"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </motion.button>

            {!isSignUp && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleDemoLogin}
                disabled={loading || !captchaToken}
                className="w-full flex items-center justify-center gap-2 border-2 border-gold text-gold py-3.5 rounded-xl font-semibold hover:bg-gold/10 transition-colors disabled:opacity-70"
              >
                Try Demo Login
              </motion.button>
            )}
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
          Or use demo@locallink.com / demo123
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
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
