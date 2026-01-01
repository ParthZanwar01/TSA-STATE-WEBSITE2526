import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useBusinessStoreContext } from '@/contexts/BusinessStoreContext';
import { ScrollFadeIn, StaggerChildren, StaggerItem } from '@/components/ScrollAnimations';
import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { useAuth } from '@/hooks/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useUserReviews } from '@/hooks/useUserReviews';
import { Heart, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const generateReviews = (bizId: string, bizName: string) => {
  const reviewTemplates = [
    { author: "Sarah M.", initials: "SM", text: `Absolutely love ${bizName}! The quality and service are outstanding. Will definitely be coming back.`, rating: 5, date: "Jan 15, 2025" },
    { author: "James R.", initials: "JR", text: "Great experience overall. Staff was friendly and professional. Highly recommend to anyone in the area.", rating: 5, date: "Dec 28, 2024" },
    { author: "Linda P.", initials: "LP", text: "Good place, fair prices. A bit busy on weekends but worth the wait.", rating: 4, date: "Nov 10, 2024" },
    { author: "Carlos G.", initials: "CG", text: `${bizName} is a gem in Cypress. We've been regulars for over a year now and it never disappoints.`, rating: 5, date: "Oct 22, 2024" },
    { author: "Michelle T.", initials: "MT", text: "Nice atmosphere and convenient location. Would give 5 stars but parking can be tricky during peak hours.", rating: 4, date: "Sep 05, 2024" },
    { author: "David K.", initials: "DK", text: "Exceeded my expectations! The attention to detail really sets this place apart from the competition.", rating: 5, date: "Aug 18, 2024" },
  ];
  const hash = bizId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const count = 3 + (hash % 4);
  return reviewTemplates.slice(0, count).map((r, i) => ({ ...r, id: `${bizId}_r${i}` }));
};

const galleryImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
];

const hoursData = [
  { day: "Monday", hours: "9:00 AM – 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 6:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 8:00 PM" },
  { day: "Friday", hours: "9:00 AM – 8:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
  { day: "Sunday", hours: "11:00 AM – 4:00 PM" },
];

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getBusinessById } = useBusinessStoreContext();
  const { isFavorite, toggle } = useFavorites(user?.id ?? null);
  const { reviews: userReviews, addReview } = useUserReviews(id || null);
  const biz = id ? getBusinessById(id) : undefined;
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  if (!biz) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Business Not Found</h1>
          <Link to="/directory" className="text-gold font-semibold hover:underline">← Back to Directory</Link>
        </motion.div>
      </div>
    );
  }

  const staticReviews = generateReviews(biz.id, biz.name);
  const allReviews = [...staticReviews, ...userReviews.map((r) => ({ id: r.id, author: r.author, initials: r.initials, date: r.date, text: r.text, rating: r.rating }))];
  const images = [biz.image, ...galleryImages];
  const avgRating = allReviews.length ? (allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length).toFixed(1) : '0';

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Sign in required', description: 'You must sign in to write a review.', variant: 'destructive' });
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 10) {
      toast({ title: 'Review too short', description: 'Please write at least 10 characters.', variant: 'destructive' });
      return;
    }
    addReview(user.id, user.name || user.email, reviewRating, reviewText.trim());
    setReviewText('');
    setReviewRating(5);
    setShowReviewForm(false);
    toast({ title: 'Thank you!', description: 'Your review has been posted.' });
  };

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/directory">Directory</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{biz.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Hero image */}
      <div className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <motion.img
          key={galleryIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={images[galleryIndex]}
          alt={biz.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

        {/* Gallery nav */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setGalleryIndex(i => (i - 1 + images.length) % images.length)}
            className="p-2 rounded-xl glass text-foreground hover:bg-card transition-colors depth-shadow"
          >
            ←
          </motion.button>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setGalleryIndex(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === galleryIndex ? 'bg-gold scale-125' : 'bg-card/50 hover:bg-card/80'}`} />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setGalleryIndex(i => (i + 1) % images.length)}
            className="p-2 rounded-xl glass text-foreground hover:bg-card transition-colors depth-shadow"
          >
            →
          </motion.button>
        </div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4"
        >
          <Link to="/directory" className="flex items-center gap-2 glass text-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-card transition-colors depth-shadow">
            ← Directory
          </Link>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
        {/* Main info card */}
        <ScrollFadeIn>
          <GlassCard glow className="p-6 md:p-8 depth-shadow-lg mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gold/90 text-primary text-xs font-bold px-3 py-1 rounded-full">
                    {biz.category}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${biz.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {biz.isOpen ? '● Open Now' : '● Closed'}
                  </span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{biz.name}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">{biz.description}</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-foreground font-bold text-lg">{biz.rating}/5</span>
                  {user && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggle(biz.id)}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite(biz.id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-muted text-muted-foreground hover:text-red-500 hover:bg-red-50'
                      }`}
                      aria-label={isFavorite(biz.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(biz.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{biz.reviewCount} reviews</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { text: `${biz.address}, Cypress, TX` },
                { text: `${biz.priceRange} Price Range` },
                { text: biz.isOpen ? 'Open Now' : 'Closed' },
                ...(biz.phone ? [{ text: biz.phone }] : []),
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm bg-muted/50 rounded-xl px-4 py-3">
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo gallery */}
            <ScrollFadeIn>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGalleryIndex(i)}
                    className={`relative rounded-xl overflow-hidden h-28 md:h-36 border-2 transition-all ${galleryIndex === i ? 'border-gold depth-shadow' : 'border-transparent hover:border-border'}`}
                  >
                    <img src={img} alt={`${biz.name} photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </motion.button>
                ))}
              </div>
            </ScrollFadeIn>

            {/* Reviews */}
            <ScrollFadeIn>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Reviews <span className="text-muted-foreground text-lg font-normal">({allReviews.length})</span>
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-gold/10 px-3 py-1.5 rounded-full">
                    <span className="text-sm font-bold text-gold">{avgRating}</span>
                  </div>
                  {user && !showReviewForm && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowReviewForm(true)}
                      className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
                    >
                      Leave a Review
                    </motion.button>
                  )}
                  {!user && (
                    <Link
                      to={`/login?redirect=${encodeURIComponent(`/business/${biz.id}`)}`}
                      className="text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
                    >
                      Sign in to leave a review
                    </Link>
                  )}
                </div>
              </div>
              {user && showReviewForm && (
                <GlassCard className="p-5 mb-4">
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Your Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} type="button" onClick={() => setReviewRating(n)} className="p-1">
                            <Star className={`w-6 h-6 ${n <= reviewRating ? 'fill-gold text-gold' : 'text-muted-foreground'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Your Review (min 10 chars)</label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold text-sm hover:bg-navy-light transition-colors"
                      >
                        Submit Review
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => { setShowReviewForm(false); setReviewText(''); }}
                        className="border border-border px-4 py-2 rounded-xl font-semibold text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </form>
                </GlassCard>
              )}
              <StaggerChildren className="space-y-4">
                {allReviews.map((review) => (
                  <StaggerItem key={review.id}>
                    <GlassCard className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-navy-gradient flex items-center justify-center text-gold font-bold text-sm">
                            {review.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{review.author}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <span className="text-sm text-muted-foreground">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{review.text}</p>
                    </GlassCard>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </ScrollFadeIn>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <ScrollFadeIn>
              <GlassCard glow className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Business Hours</h3>
                <div className="space-y-1">
                  {hoursData.map((h) => {
                    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                    const isToday = h.day === today;
                    return (
                      <div key={h.day} className={`flex items-center justify-between text-sm py-2.5 px-3 rounded-xl transition-colors ${isToday ? 'bg-gold/10 font-medium' : 'hover:bg-muted/50'}`}>
                        <span className={isToday ? 'text-gold' : 'text-foreground'}>{h.day}</span>
                        <span className={isToday ? 'text-gold' : 'text-muted-foreground'}>{h.hours}</span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <GlassCard glow className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Location</h3>
                <Link
                  to={`/map?lat=${biz.lat}&lng=${biz.lng}&biz=${biz.id}`}
                  className="block bg-muted rounded-xl h-44 flex items-center justify-center group hover:bg-muted/80 transition-colors"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-gold transition-colors">
                    <span className="text-sm font-medium">View on Map →</span>
                  </div>
                </Link>
                <p className="text-sm text-foreground mt-3">{biz.address}</p>
                <p className="text-sm text-muted-foreground">Cypress, TX</p>
              </GlassCard>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <Link
                to="/directory"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:bg-navy-light transition-colors depth-shadow"
              >
                ← Back to Directory
              </Link>
            </ScrollFadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
