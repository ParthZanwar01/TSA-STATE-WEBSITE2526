import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { businesses } from '@/data/businessData';
import { useAuth } from '@/hooks/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { Heart } from 'lucide-react';

const MyFavorites = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { favorites, toggle } = useFavorites(user?.id ?? null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const favoriteBusinesses = businesses.filter((b) => favorites.includes(b.id));

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-gold/5 pointer-events-none" />
      <FloatingOrbs className="opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
            My <span className="text-gold">Favorites</span>
          </h1>
          <p className="text-muted-foreground">
            Hi, {user.name || user.email}. Here are the businesses you've favorited.
          </p>
        </motion.div>

        {favoriteBusinesses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <GlassCard glow className="max-w-md mx-auto p-12">
              <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Browse the directory and tap the heart on any business to add it here.
              </p>
              <Link
                to="/directory"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-navy-light transition-colors depth-shadow"
              >
                Browse Directory
              </Link>
            </GlassCard>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {favoriteBusinesses.map((biz, i) => (
                <motion.div
                  key={biz.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <GlassCard glow className="overflow-hidden group h-full">
                    <Link to={`/business/${biz.id}`} className="block">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={biz.image}
                          alt={biz.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="bg-gold/90 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {biz.category}
                          </span>
                          <h3 className="font-display text-lg font-bold text-primary-foreground mt-2 line-clamp-2">
                            {biz.name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-semibold">{biz.rating}/5</span>
                        <span className="text-muted-foreground text-sm">({biz.reviewCount} reviews)</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggle(biz.id)}
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </motion.button>
                    </div>
                    <div className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground truncate">{biz.address}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {favoriteBusinesses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              to="/directory"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold/80 transition-colors"
            >
              ← Back to Directory
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
