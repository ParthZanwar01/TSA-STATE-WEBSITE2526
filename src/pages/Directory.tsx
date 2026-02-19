import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { categories } from '@/data/businessData';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useBusinessStoreContext } from '@/contexts/BusinessStoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { useAuth } from '@/hooks/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart } from 'lucide-react';

const Directory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { allBusinesses } = useBusinessStoreContext();
  const { isFavorite, toggle } = useFavorites(user?.id ?? null);
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch.slice(0, 100));
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'reviews'>('name');
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = allBusinesses.filter((b) => {
      const q = search.trim().toLowerCase();
      const matchesSearch = !q ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || b.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'reviews') result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    else result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [search, selectedCategory, sortBy, allBusinesses]);

  const allCategories = ['', ...new Set(allBusinesses.map(b => b.category))];

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <PageHeader
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop"
        children={
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
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
        }
      />

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Directory</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-5 mb-10 depth-shadow"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <span>Filters & Sort</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap gap-2 flex-1">
              {allCategories.map((cat) => (
                <motion.button
                  key={cat || 'all'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                  setSelectedCategory(cat);
                  setSearch('');
                  setSearchParams((p) => { const next = new URLSearchParams(p); next.delete('search'); if (cat) next.set('category', cat); else next.delete('category'); return next; });
                }}
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'reviews')}
              className="px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-gold/30 transition-all"
            >
              <option value="name">Sort: Name A–Z</option>
              <option value="rating">Sort: Highest Rating</option>
              <option value="reviews">Sort: Most Reviews</option>
            </select>
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search by business name..."
                value={search}
                onChange={(e) => {
                const v = e.target.value.slice(0, 100);
                setSearch(v);
                setSearchParams((p) => { const next = new URLSearchParams(p); if (v.trim()) next.set('search', v); else next.delete('search'); return next; });
              }}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all"
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
                      <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); toggle(biz.id); }}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors z-10 ${
                            isFavorite(biz.id)
                              ? 'bg-red-500/90 text-white'
                              : 'bg-white/20 text-white hover:bg-white/40'
                          }`}
                          aria-label={isFavorite(biz.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart className={`w-5 h-5 ${isFavorite(biz.id) ? 'fill-current' : ''}`} strokeWidth={2} />
                        </motion.button>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gold/90 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">{biz.category}</span>
                          <span className="bg-primary-foreground/20 text-primary-foreground text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">{biz.priceRange}</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-primary-foreground">{biz.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-primary-foreground text-sm font-medium">{biz.rating}/5</span>
                          <span className="text-primary-foreground/50 text-xs">({biz.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 text-primary-foreground/60 text-xs">
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
                      <div className="flex gap-2 mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.stopPropagation(); toggle(biz.id); }}
                            className={`flex-shrink-0 p-2.5 rounded-xl transition-colors ${
                              isFavorite(biz.id)
                                ? 'bg-red-100 text-red-600'
                                : 'bg-muted text-muted-foreground hover:text-red-500 hover:bg-red-50'
                            }`}
                            aria-label={isFavorite(biz.id) ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            <Heart className={`w-5 h-5 ${isFavorite(biz.id) ? 'fill-current' : ''}`} />
                          </motion.button>
                        <Link
                          to={`/business/${biz.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-primary text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:bg-navy-light transition-colors block text-center depth-shadow"
                        >
                          View Full Profile →
                        </Link>
                      </div>
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
            role="status"
            aria-live="polite"
            aria-label="No businesses match your search"
          >
            <p className="text-lg font-display font-bold text-foreground mb-2">No businesses found</p>
            <p className="text-muted-foreground mb-2">
              {search
                ? `No businesses match "${search.trim() || 'your search'}". Try a different term or select "All" to browse all categories.`
                : selectedCategory
                  ? `No businesses in the selected category. Try "All" or another category.`
                  : 'Try adjusting your filters or search term to see more results.'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Directory;
