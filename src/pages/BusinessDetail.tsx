import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, DollarSign, ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { businesses } from '@/data/businessData';
import { ScrollFadeIn, StaggerChildren, StaggerItem } from '@/components/ScrollAnimations';
import { useState } from 'react';

// Generate deterministic dummy reviews per business
const generateReviews = (bizId: string, bizName: string) => {
  const reviewTemplates = [
    { author: "Sarah M.", initials: "SM", text: `Absolutely love ${bizName}! The quality and service are outstanding. Will definitely be coming back.`, rating: 5, date: "Jan 15, 2025" },
    { author: "James R.", initials: "JR", text: "Great experience overall. Staff was friendly and professional. Highly recommend to anyone in the area.", rating: 5, date: "Dec 28, 2024" },
    { author: "Linda P.", initials: "LP", text: "Good place, fair prices. A bit busy on weekends but worth the wait.", rating: 4, date: "Nov 10, 2024" },
    { author: "Carlos G.", initials: "CG", text: `${bizName} is a gem in Cypress. We've been regulars for over a year now and it never disappoints.`, rating: 5, date: "Oct 22, 2024" },
    { author: "Michelle T.", initials: "MT", text: "Nice atmosphere and convenient location. Would give 5 stars but parking can be tricky during peak hours.", rating: 4, date: "Sep 05, 2024" },
    { author: "David K.", initials: "DK", text: "Exceeded my expectations! The attention to detail really sets this place apart from the competition.", rating: 5, date: "Aug 18, 2024" },
  ];
  // Use id hash to pick a subset
  const hash = bizId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const count = 3 + (hash % 4);
  return reviewTemplates.slice(0, count).map((r, i) => ({ ...r, id: `${bizId}_r${i}` }));
};

// Generate gallery images per business
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
  const biz = businesses.find(b => b.id === id);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!biz) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Business Not Found</h1>
          <Link to="/directory" className="text-gold font-semibold hover:underline">← Back to Directory</Link>
        </div>
      </div>
    );
  }

  const reviews = generateReviews(biz.id, biz.name);
  const images = [biz.image, ...galleryImages];
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      {/* Hero image */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <img src={images[galleryIndex]} alt={biz.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />

        {/* Gallery nav */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <button onClick={() => setGalleryIndex(i => (i - 1 + images.length) % images.length)} className="p-1.5 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => setGalleryIndex(i)} className={`w-2 h-2 rounded-full transition-colors ${i === galleryIndex ? 'bg-gold' : 'bg-card/50'}`} />
            ))}
          </div>
          <button onClick={() => setGalleryIndex(i => (i + 1) % images.length)} className="p-1.5 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Back button */}
        <Link to="/directory" className="absolute top-4 left-4 flex items-center gap-1.5 bg-card/80 backdrop-blur-sm text-foreground px-3 py-2 rounded-full text-sm font-medium hover:bg-card transition-colors">
          <ArrowLeft className="w-4 h-4" /> Directory
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        {/* Main info card */}
        <ScrollFadeIn>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <span className="inline-block bg-gold/15 text-gold text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                  {biz.category}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{biz.name}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">{biz.description}</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.round(biz.rating) ? 'text-gold fill-gold' : 'text-border'}`} />
                  ))}
                  <span className="text-foreground font-bold ml-1">{biz.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{biz.reviewCount} reviews</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-foreground">{biz.address}, Cypress, TX</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-foreground">{biz.priceRange} Price Range</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span className={biz.isOpen ? 'text-green-600 font-medium' : 'text-destructive font-medium'}>
                  {biz.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
              {biz.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-foreground">{biz.phone}</span>
                </div>
              )}
            </div>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo gallery */}
            <ScrollFadeIn>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`relative rounded-lg overflow-hidden h-24 md:h-32 border-2 transition-colors ${galleryIndex === i ? 'border-gold' : 'border-transparent hover:border-border'}`}
                  >
                    <img src={img} alt={`${biz.name} photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </ScrollFadeIn>

            {/* Reviews */}
            <ScrollFadeIn>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Reviews <span className="text-muted-foreground text-lg font-normal">({reviews.length})</span>
              </h2>
              <StaggerChildren className="space-y-4">
                {reviews.map((review) => (
                  <StaggerItem key={review.id}>
                    <div className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold text-sm">
                            {review.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{review.author}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-gold fill-gold' : 'text-border'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{review.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </ScrollFadeIn>
          </div>

          {/* Right column: Hours & Info */}
          <div className="space-y-6">
            <ScrollFadeIn>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gold" /> Business Hours
                </h3>
                <div className="space-y-2.5">
                  {hoursData.map((h) => {
                    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                    const isToday = h.day === today;
                    return (
                      <div key={h.day} className={`flex items-center justify-between text-sm py-1.5 px-2 rounded ${isToday ? 'bg-gold/10 font-medium' : ''}`}>
                        <span className={isToday ? 'text-gold' : 'text-foreground'}>{h.day}</span>
                        <span className={isToday ? 'text-gold' : 'text-muted-foreground'}>{h.hours}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Location</h3>
                <div className="bg-muted rounded-lg h-40 flex items-center justify-center mb-3">
                  <Link to="/map" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
                    <MapPin className="w-8 h-8" />
                    <span className="text-sm font-medium">View on Map</span>
                  </Link>
                </div>
                <p className="text-sm text-foreground">{biz.address}</p>
                <p className="text-sm text-muted-foreground">Cypress, TX</p>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <Link
                to="/directory"
                className="block text-center bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-navy-light transition-colors"
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
