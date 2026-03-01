import { useState, Suspense, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { isValidSearchQuery } from '@/lib/validation';
import { ScrollFadeIn, ScrollScale, StickyReveal, TextReveal, StaggerChildren, StaggerItem, ScrollParallax, ScrollRotate3D } from '@/components/ScrollAnimations';
import { categories, reviews, events, deals } from '@/data/businessData';
import { useBusinessStoreContext } from '@/contexts/BusinessStoreContext';
import { useAuth } from '@/hooks/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { motion } from 'framer-motion';
import MorphScene from '@/components/MorphScene';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';
import GlassCard from '@/components/GlassCard';
import { Heart } from 'lucide-react';

const HERO_VIDEO_SRC = '/boardwalk.mp4';

const Index = () => {
  const { user } = useAuth();
  const { allBusinesses } = useBusinessStoreContext();
  const { isFavorite, toggle } = useFavorites(user?.id ?? null);
  const topRated = allBusinesses.filter(b => b.rating >= 4.8).slice(0, 3);
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewIndex, setReviewIndex] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    if (!isValidSearchQuery(trimmed)) {
      toast({ title: 'Invalid search', description: 'Enter at least one letter or number to search.', variant: 'destructive' });
      return;
    }
    navigate(`/directory?search=${encodeURIComponent(trimmed.slice(0, 100))}`);
  };

  const nextReview = () => setReviewIndex((i) => (i + 1) % reviews.length);
  const prevReview = () => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length);

  return (
    <div className="bg-background">
      {/* ─── HERO WITH 3D MORPH ─── */}
      <StickyReveal>
        <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Parallax video background - boardwalk with refined filter */}
          <motion.div
            className="absolute inset-0"
            style={{ scale: 1.15 }}
            initial={{ y: 0 }}
            whileInView={{ y: 0 }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] video-refined"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 text-center px-6 max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-4"
            >
              Cypress <span className="gradient-gold">LocalLink</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-primary-foreground/80 mb-8"
            >
              Discover, Support & Celebrate Local Businesses
            </motion.p>

            {/* Search - Glassmorphism */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="relative max-w-xl mx-auto mb-8"
            >
              <div className="flex items-center glass rounded-full overflow-hidden shadow-2xl glow-gold">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-4 bg-transparent text-primary-foreground placeholder:text-primary-foreground/40 outline-none font-body text-sm"
                />
                <MagneticButton strength={0.3}>
                  <button
                    type="submit"
                    className="bg-gold text-primary px-6 py-3 mr-1 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
                  >
                    Search
                  </button>
                </MagneticButton>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center justify-center gap-3 text-primary-foreground/60 text-sm font-body tracking-widest"
            >
              {['EAT', 'SHOP', 'PLAY', 'LIVE'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  {i > 0 && <span className="text-gold mr-3">•</span>}
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-gold rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </StickyReveal>

      {/* ─── CATEGORIES WITH GLASSMORPHISM ─── */}
      <section className="py-24 px-6 relative">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Explore Categories</h2>
              <p className="text-muted-foreground text-lg">Discover local businesses by industry</p>
            </div>
          </ScrollFadeIn>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <TiltCard intensity={12}>
                  <Link
                    to={`/directory?category=${encodeURIComponent(cat.slug)}`}
                    className="group block rounded-xl overflow-hidden relative h-44 depth-shadow hover:depth-shadow-lg transition-all duration-500"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent group-hover:from-primary/90 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                      <span className="font-display text-sm font-bold text-primary-foreground group-hover:text-gold transition-colors">
                        {cat.name}
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <div className="text-center mt-10">
            <MagneticButton strength={0.4}>
              <Link to="/directory" className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all">
                View All Businesses
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ─── TEXT REVEAL WITH MORPH BACKGROUND ─── */}
      <section className="py-24 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Suspense fallback={null}>
            <MorphScene
              color1={[0.83, 0.66, 0.33]}
              color2={[0.3, 0.15, 0.5]}
              color3={[0.16, 0.24, 0.42]}
              size={4}
              interactive={false}
            />
          </Suspense>
        </div>
        <div className="max-w-4xl mx-auto min-h-[40vh] flex items-center relative z-10">
          <TextReveal
            text="Every local business has a story. We connect you with the people, places, and passions that make Cypress, Texas truly home."
            className="text-2xl md:text-4xl font-display font-bold text-primary-foreground leading-snug justify-center text-center"
          />
        </div>
      </section>

      {/* ─── TOP RATED WITH GLASS CARDS ─── */}
      <section className="py-24 px-6 relative">
        <FloatingOrbs className="opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Top Rated Spots</h2>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRated.map((biz, i) => (
              <ScrollRotate3D key={biz.id}>
                <motion.div
                  initial={{ opacity: 0, y: 60, rotateX: 15, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ perspective: 1000 }}
                >
                  <TiltCard intensity={10}>
                    <div className="group block relative">
                      <Link to={`/business/${biz.id}`} className="block">
                        <div className="relative rounded-2xl overflow-hidden depth-shadow-lg">
                          <img
                            src={biz.image}
                            alt={biz.name}
                            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                        {/* Glass overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="glass-dark rounded-xl p-4">
                            <motion.span
                              initial={{ x: -20, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="inline-block glass-gold text-gold text-xs font-bold px-2 py-1 rounded mb-2"
                            >
                              Local Favorite
                            </motion.span>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-primary-foreground font-semibold text-sm">{biz.rating}/5</span>
                              <span className="text-primary-foreground/60 text-xs">{biz.category}</span>
                            </div>
                            <h3 className="font-display text-xl font-bold text-primary-foreground">{biz.name}</h3>
                            <p className="text-primary-foreground/70 text-sm mt-1 line-clamp-2">{biz.description}</p>
                          </div>
                        </div>
                      </div>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.preventDefault(); toggle(biz.id); }}
                        className={`absolute top-4 right-4 p-2.5 rounded-full z-10 backdrop-blur-sm transition-colors ${
                          isFavorite(biz.id)
                            ? 'bg-red-500/90 text-white'
                            : 'bg-white/20 text-white hover:bg-white/40'
                        }`}
                        aria-label={isFavorite(biz.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite(biz.id) ? 'fill-current' : ''}`} strokeWidth={2} />
                      </motion.button>
                    </div>
                  </TiltCard>
                </motion.div>
              </ScrollRotate3D>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHOTO GALLERY STRIP ─── */}
      <section className="py-16 overflow-hidden">
        <ScrollFadeIn>
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">Life in Cypress</h2>
        </ScrollFadeIn>
        <ScrollParallax speed={0.2}>
          <div className="relative">
            <div className="flex gap-4 animate-scroll-x hover:[animation-play-state:paused]">
              {[
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=350&fit=crop",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=350&fit=crop",
                "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&h=350&fit=crop",
                "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=350&fit=crop",
                "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=350&fit=crop",
                "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&h=350&fit=crop",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=350&fit=crop",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=350&fit=crop",
              ].map((src, i) => (
                <div key={i} className="flex-shrink-0 w-72 h-48 rounded-xl overflow-hidden group">
                  <img
                    src={src}
                    alt={`Life in Cypress ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollParallax>
      </section>

      {/* ─── DEALS & COUPONS ─── */}
      <section className="py-24 px-6 relative">
        <FloatingOrbs className="opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollFadeIn>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-4xl font-bold text-foreground">Special Deals & Coupons</h2>
              <MagneticButton strength={0.3}>
                <Link to="/directory" className="text-gold font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  See All
                </Link>
              </MagneticButton>
            </div>
          </ScrollFadeIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deals.slice(0, 8).map((deal) => {
              const biz = allBusinesses.find(b => b.id === deal.business_id);
              return (
                <StaggerItem key={deal.id}>
                  <div className="relative">
                    <GlassCard glow hover3d className="p-4 h-full">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="bg-gold/90 text-primary text-xs font-bold px-2 py-0.5 rounded-full shrink-0">{deal.discount}</span>
                        {biz && (
                          <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-end">
                            <Link to={`/business/${biz.id}`} className="text-xs text-gold font-medium hover:underline truncate min-w-0">{biz.name}</Link>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => { e.preventDefault(); toggle(biz.id); }}
                              className={`shrink-0 p-1.5 rounded-full transition-colors ${
                                isFavorite(biz.id)
                                  ? 'bg-red-100 text-red-600'
                                  : 'bg-muted text-muted-foreground hover:text-red-500 hover:bg-red-50'
                              }`}
                              aria-label={isFavorite(biz.id) ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Heart className={`w-4 h-4 ${isFavorite(biz.id) ? 'fill-current' : ''}`} strokeWidth={2} />
                            </motion.button>
                          </div>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-foreground text-sm mb-1">{deal.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{deal.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Valid until {new Date(deal.valid_until).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </GlassCard>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── EVENTS WITH GLASS CARDS ─── */}
      <section className="py-24 px-6 bg-muted relative">
        <FloatingOrbs className="opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollFadeIn>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-4xl font-bold text-foreground">Upcoming Events</h2>
              <MagneticButton strength={0.3}>
                <Link to="/events" className="text-gold font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  See All
                </Link>
              </MagneticButton>
            </div>
          </ScrollFadeIn>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.slice(0, 6).map((ev) => (
              <StaggerItem key={ev.id}>
                <GlassCard glow hover3d className="p-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotateZ: -3 }}
                      className="flex-shrink-0 w-14 h-14 bg-navy-gradient rounded-lg flex flex-col items-center justify-center shadow-md"
                    >
                      <span className="text-lg font-bold text-primary-foreground leading-none">{ev.day}</span>
                      <span className="text-xs text-gold font-semibold">{ev.month}</span>
                    </motion.div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-foreground text-sm truncate">{ev.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── MAP PREVIEW WITH 3D ─── */}
      <section className="py-24 px-6">
        <ScrollRotate3D>
          <Link to="/map" className="block max-w-4xl mx-auto group">
            <TiltCard intensity={6} glare>
              <div className="relative rounded-2xl overflow-hidden depth-shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=500&fit=crop"
                  alt="Cypress community map"
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col items-center justify-end p-8 text-center">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                    Find Businesses Near You
                  </h3>
                  <p className="text-primary-foreground/70 text-sm max-w-md mb-4">
                    Explore the Cypress community map — dining, shopping, wellness & more.
                  </p>
                  <MagneticButton strength={0.3}>
                    <span className="inline-flex items-center gap-2 glass-gold text-gold px-5 py-2 rounded-full text-sm font-bold group-hover:gap-3 group-hover:glow-gold transition-all">
                      Open Map
                    </span>
                  </MagneticButton>
                </div>
              </div>
            </TiltCard>
          </Link>
        </ScrollRotate3D>
      </section>

      {/* ─── REVIEWS WITH MORPH ─── */}
      <section className="py-24 px-6 bg-muted relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15">
          <Suspense fallback={null}>
            <MorphScene
              color1={[0.83, 0.66, 0.33]}
              color2={[1, 1, 1]}
              color3={[0.5, 0.3, 0.1]}
              size={2.5}
              interactive={false}
            />
          </Suspense>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollFadeIn>
            <h2 className="font-display text-4xl font-bold text-foreground text-center mb-16">Community Voices</h2>
          </ScrollFadeIn>

          <div className="relative">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, x: 60, rotateY: -10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -60, rotateY: 10, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ perspective: 1000 }}
            >
              <div className="glass rounded-2xl p-8 md:p-12 text-center depth-shadow">
                <p className="text-xl md:text-2xl text-foreground/90 italic font-display leading-relaxed mb-8">
                  "{reviews[reviewIndex].text}"
                </p>
                <div className="text-center">
                  <p className="text-foreground font-semibold text-sm">{reviews[reviewIndex].author}</p>
                  <p className="text-muted-foreground text-xs">{reviews[reviewIndex].date}</p>
                </div>
              </div>
            </motion.div>

            <div className="flex items-center justify-center gap-4 mt-10">
              <MagneticButton strength={0.5}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevReview}
                  className="p-2 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
                >
                  ←
                </motion.button>
              </MagneticButton>
              <div className="flex gap-1.5">
                {reviews.map((_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.3 }}
                    onClick={() => setReviewIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === reviewIndex ? 'bg-gold glow-gold' : 'bg-muted-foreground/30'}`}
                  />
                ))}
              </div>
              <MagneticButton strength={0.5}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextReview}
                  className="p-2 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
                >
                  →
                </motion.button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 px-6 bg-primary relative overflow-hidden">
        <FloatingOrbs className="opacity-20" />
        <div className="absolute inset-0 opacity-10">
          <Suspense fallback={null}>
            <MorphScene
              color1={[0.83, 0.66, 0.33]}
              color2={[0.16, 0.24, 0.42]}
              color3={[0.4, 0.2, 0.6]}
              size={4}
              interactive={false}
            />
          </Suspense>
        </div>
        <ScrollScale>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
            >
              Join the LocalLink Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-primary-foreground/70 text-lg mb-10"
            >
              Whether you're a business owner or a local explorer, we have something for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton strength={0.3}>
                <Link
                  to="/directory"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors depth-shadow text-sm"
                >
                  Explore Businesses
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:bg-primary-foreground/10 transition-colors text-sm"
                >
                  Learn More
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </ScrollScale>
      </section>
    </div>
  );
};

export default Index;
