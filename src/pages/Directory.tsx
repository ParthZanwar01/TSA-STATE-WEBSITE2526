import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Star, MapPin, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import { businesses, categories } from '@/data/businessData';
import { motion, AnimatePresence } from 'framer-motion';
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
      <div className="relative overflow-hidden">
        <div className="bg-primary py-16 md:py-20 px-6 relative">
          <FloatingOrbs className="opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-light opacity-80" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-14 h-14 rounded-2xl bg-gold/20 backdrop-blur-sm flex items-center justify-center mb-5 border border-gold/30"
                >
                  <LayoutGrid className="w-7 h-7 text-gold" />
                </motion.div>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3">
                  Business <span className="text-gold">Directory</span>
                </h1>
                <p className="text-primary-foreground/70 text-lg">Discover all local businesses in Cypress, Texas</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gold/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-gold/30">
                  <span className="text-gold font-bold text-lg">{filtered.length}</span>
                  <span className="text-primary-foreground/60 text-sm ml-1.5">businesses</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-5 mb-10 depth-shadow"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <SlidersHorizontal className="w-4 h-4 text-gold" />
            <span>Filters</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap gap-2 flex-1">
              {allCategories.map((cat) => (
                <motion.button
                  key={cat || 'all'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat || 'All'}
                </motion.button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by business name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all"
              />
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((biz, i) => {
              const isFlipped = flippedCard === biz.id;
              return (
                <motion.div
                  key={biz.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -6 }}
                  className="relative h-80 cursor-pointer group"
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
                    <div className="absolute inset-0 rounded-2xl overflow-hidden depth-shadow group-hover:depth-shadow-lg transition-shadow duration-300" style={{ backfaceVisibility: 'hidden' }}>
                      <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gold/90 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">{biz.category}</span>
                          <span className="bg-primary-foreground/20 text-primary-foreground text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">{biz.priceRange}</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-primary-foreground">{biz.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                          <span className="text-primary-foreground text-sm font-medium">{biz.rating}</span>
                          <span className="text-primary-foreground/50 text-xs">({biz.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 text-primary-foreground/60 text-xs">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{biz.address}</span>
                          </div>
                          <span className="text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Tap to flip →</span>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 rounded-2xl glass p-6 flex flex-col justify-between depth-shadow"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-3">{biz.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{biz.address}</span>
                        </div>
                        <span className={`inline-block text-xs px-2.5 py-1 rounded-full mb-3 font-medium ${biz.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {biz.isOpen ? '● Open Now' : '● Closed'}
                        </span>
                        <p className="text-xs text-muted-foreground mb-3">
                          {biz.priceRange} · {biz.category}
                        </p>
                        <p className="text-sm text-foreground/80 italic leading-relaxed">"{biz.description}"</p>
                      </div>
                      <Link
                        to={`/business/${biz.id}`}
                        onClick={(e) => { e.stopPropagation(); }}
                        className="mt-4 w-full bg-primary text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:bg-navy-light transition-colors block text-center depth-shadow"
                      >
                        View Full Profile →
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-display font-bold text-foreground mb-2">No businesses found</p>
            <p className="text-muted-foreground">Try adjusting your filters or search term</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Directory;
