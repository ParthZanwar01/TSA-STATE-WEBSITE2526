import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Star, MapPin } from 'lucide-react';
import { businesses, categories } from '@/data/businessData';
import { motion } from 'framer-motion';
import { FloatingOrbs } from '@/components/FloatingOrbs';

const Directory = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || b.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const allCategories = ['', ...new Set(businesses.map(b => b.category))];

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary py-12 px-6 mb-8 relative overflow-hidden">
        <FloatingOrbs className="opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
            Business Directory
          </h1>
          <p className="text-primary-foreground/70">Discover all local businesses in Cypress, Texas</p>
          <p className="text-gold text-sm mt-2">{filtered.length} businesses</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex flex-wrap gap-2 flex-1">
            {allCategories.map((cat) => (
              <motion.button
                key={cat || 'all'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-gold/30'
                }`}
              >
                {cat || 'All'}
              </motion.button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by business name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-shadow"
            />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((biz, i) => {
            const isFlipped = flippedCard === biz.id;
            return (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4 }}
                className="relative h-72 cursor-pointer group"
                onClick={() => setFlippedCard(isFlipped ? null : biz.id)}
                style={{ perspective: 1200 }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl group-hover:depth-shadow transition-shadow duration-300" style={{ backfaceVisibility: 'hidden' }}>
                    <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-lg font-bold text-primary-foreground">{biz.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                        <span className="text-primary-foreground text-sm">{biz.rating}</span>
                        <span className="text-primary-foreground/50 text-xs">({biz.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-primary-foreground/60 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>Cypress, TX</span>
                        <span className="ml-auto text-gold text-xs font-medium">Click to Flip →</span>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-xl glass p-6 flex flex-col justify-between depth-shadow"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">{biz.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <MapPin className="w-3 h-3" />
                        <span>{biz.address}</span>
                      </div>
                      <span className="inline-block text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded mb-3">
                        {biz.isOpen ? '🟢 Open today' : '🔴 Closed'}
                      </span>
                      <p className="text-xs text-muted-foreground mb-3">
                        {biz.priceRange} • {biz.category}
                      </p>
                      <p className="text-sm text-foreground/80 italic">"{biz.description}"</p>
                    </div>
                    <Link
                      to={`/business/${biz.id}`}
                      onClick={(e) => { e.stopPropagation(); }}
                      className="mt-4 w-full bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-lg hover:bg-navy-light transition-colors block text-center shadow-sm"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-muted-foreground"
          >
            <p className="text-lg">No businesses found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Directory;
