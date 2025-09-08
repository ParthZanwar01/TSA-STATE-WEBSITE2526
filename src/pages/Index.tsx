import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollFadeIn, ScrollScale, StickyReveal, TextReveal, StaggerChildren, StaggerItem } from '@/components/ScrollAnimations';
import { businesses, categories, reviews, events } from '@/data/businessData';
import { motion } from 'framer-motion';

const topRated = businesses.filter(b => b.rating >= 4.8).slice(0, 3);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewIndex, setReviewIndex] = useState(0);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/directory?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const nextReview = () => setReviewIndex((i) => (i + 1) % reviews.length);
  const prevReview = () => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length);

  return (
    <div className="bg-background">
      {/* ─── HERO ─── */}
      <StickyReveal>
        <div className="relative h-screen flex flex-col items-center justify-center">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582407947092-50b8aba1c062?w=1920&h=1080&fit=crop)' }}
          />
          <div className="absolute inset-0 bg-hero-overlay" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-4">
              Cypress <span className="gradient-gold">LocalLink</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
              Discover, Support & Celebrate Local Businesses
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-8">
              <div className="flex items-center bg-card/95 backdrop-blur-sm rounded-full overflow-hidden shadow-lg">
                <Search className="w-5 h-5 text-muted-foreground ml-5" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground outline-none font-body text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 py-3 mr-1 rounded-full text-sm font-semibold hover:bg-navy-light transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-3 text-primary-foreground/60 text-sm font-body tracking-widest">
              <span>EAT</span>
              <span className="text-gold">•</span>
              <span>SHOP</span>
              <span className="text-gold">•</span>
              <span>PLAY</span>
              <span className="text-gold">•</span>
              <span>LIVE</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
            </motion.div>
          </div>
        </div>
      </StickyReveal>

      {/* ─── CATEGORIES ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Explore Categories</h2>
              <p className="text-muted-foreground text-lg">Discover local businesses by industry</p>
            </div>
          </ScrollFadeIn>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link
                  to={`/directory?category=${encodeURIComponent(cat.slug)}`}
                  className="group block bg-card rounded-xl p-6 text-center card-hover border border-border"
                >
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <div className="text-center mt-10">
            <Link to="/directory" className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all">
              View All Businesses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TEXT REVEAL ─── */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-4xl mx-auto min-h-[40vh] flex items-center">
          <TextReveal
            text="Every local business has a story. We connect you with the people, places, and passions that make Cypress, Texas truly home."
            className="text-2xl md:text-4xl font-display font-bold text-primary-foreground leading-snug justify-center text-center"
          />
        </div>
      </section>

      {/* ─── TOP RATED ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Top Rated Spots</h2>
            </div>
          </ScrollFadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRated.map((biz) => (
              <StaggerItem key={biz.id}>
                <Link to={`/directory`} className="group block">
                  <div className="relative rounded-xl overflow-hidden card-hover">
                    <img
                      src={biz.image}
                      alt={biz.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block bg-gold/90 text-primary text-xs font-bold px-2 py-1 rounded mb-2">
                        Local Favorite
                      </span>
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span className="text-primary-foreground font-semibold text-sm">{biz.rating}</span>
                        <span className="text-primary-foreground/60 text-xs">{biz.category}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-primary-foreground">{biz.name}</h3>
                      <p className="text-primary-foreground/70 text-sm mt-1 line-clamp-2">{biz.description}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── EVENTS ─── */}
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <ScrollFadeIn>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-4xl font-bold text-foreground">Upcoming Events</h2>
              <Link to="/events" className="text-gold font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                See All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollFadeIn>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((ev) => (
              <StaggerItem key={ev.id}>
                <div className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border card-hover">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary rounded-lg flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground leading-none">{ev.day}</span>
                    <span className="text-xs text-gold font-semibold">{ev.month}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-foreground text-sm truncate">{ev.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── MAP PREVIEW ─── */}
      <section className="py-24 px-6">
        <ScrollScale>
          <Link to="/map" className="block max-w-4xl mx-auto group">
            <div className="relative rounded-2xl overflow-hidden card-hover border border-border">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=500&fit=crop"
                alt="Cypress community map"
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col items-center justify-end p-8 text-center">
                <MapPin className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                  Find Businesses Near You
                </h3>
                <p className="text-primary-foreground/70 text-sm max-w-md mb-4">
                  Explore the Cypress community map — dining, shopping, wellness & more.
                </p>
                <span className="inline-flex items-center gap-2 bg-gold text-primary px-5 py-2 rounded-full text-sm font-bold group-hover:gap-3 transition-all">
                  Open Map <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </ScrollScale>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeIn>
            <h2 className="font-display text-4xl font-bold text-primary-foreground text-center mb-16">Community Voices</h2>
          </ScrollFadeIn>

          <div className="relative">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-primary-foreground/90 italic font-display leading-relaxed mb-8">
                "{reviews[reviewIndex].text}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                  {reviews[reviewIndex].initials}
                </div>
                <div className="text-left">
                  <p className="text-primary-foreground font-semibold text-sm">{reviews[reviewIndex].author}</p>
                  <p className="text-primary-foreground/50 text-xs">{reviews[reviewIndex].date}</p>
                </div>
              </div>
            </motion.div>

            <div className="flex items-center justify-center gap-4 mt-10">
              <button onClick={prevReview} className="p-2 rounded-full border border-primary-foreground/20 text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/40 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === reviewIndex ? 'bg-gold' : 'bg-primary-foreground/20'}`}
                  />
                ))}
              </div>
              <button onClick={nextReview} className="p-2 rounded-full border border-primary-foreground/20 text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/40 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6">
        <ScrollScale>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join the LocalLink Community
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Whether you're a business owner or a local explorer, we have something for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/directory"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-navy-light transition-colors"
              >
                Explore Businesses
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </ScrollScale>
      </section>
    </div>
  );
};

export default Index;
