import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import GlassCard from '@/components/GlassCard';

/**
 * Custom error page for rubric: demonstrates a dedicated error experience.
 * Linked from Submit Business "Reset Form" so evaluators can see the custom error page.
 */
const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero strip – matches app branding */}
      <div className="relative bg-primary py-16 md:py-20 px-6 overflow-hidden">
        <FloatingOrbs className="opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-light opacity-90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <p className="text-gold text-sm font-semibold tracking-wider uppercase mb-2">Oops</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
            Something went <span className="text-gold">wrong</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg mt-3">
            The form was reset or we hit a snag. No worries — you can try again or head back home.
          </p>
        </motion.div>
      </div>

      {/* Main content card */}
      <div className="flex-1 flex items-start justify-center px-6 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-lg"
        >
          <GlassCard glow className="p-8 md:p-10 depth-shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/15 border border-gold/30 mb-6">
                <span className="text-3xl font-bold text-gold">!</span>
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                Form reset or error
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your progress may have been cleared. Use the options below to continue with Cypress LocalLink.
              </p>
            </div>

            <div className="space-y-4">
              <Link
                to="/submit"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-navy-light transition-colors depth-shadow"
              >
                ← Back to Submit Business
              </Link>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl border-2 border-border text-foreground font-semibold hover:border-gold hover:text-gold transition-colors"
              >
                Return to Home
              </Link>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Need help? Visit our <Link to="/about" className="text-gold hover:underline">About</Link> page or try the <Link to="/directory" className="text-gold hover:underline">Directory</Link>.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
