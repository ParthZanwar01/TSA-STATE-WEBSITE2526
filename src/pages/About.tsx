import { ScrollFadeIn, StaggerChildren, StaggerItem, TextReveal } from '@/components/ScrollAnimations';
import { MapPin, Tag, Users, Star } from 'lucide-react';

const stats = [
  { icon: MapPin, value: "74+", label: "Local Businesses" },
  { icon: Tag, value: "15+", label: "Active Deals" },
  { icon: Users, value: "Monthly", label: "Community Events" },
  { icon: Star, value: "500+", label: "5-Star Reviews" },
];

const About = () => {
  return (
    <div className="pt-20 bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582407947092-50b8aba1c062?w=1920&h=800&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <MapPin className="w-10 h-10 text-primary-foreground/50 mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About Cypress LocalLink
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            This community resource hub is designed for the Cypress, Texas community — connecting residents with local businesses, non-profits, support services, and civic programs.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16 px-6">
        <StaggerChildren className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="bg-card border border-border rounded-xl p-6 text-center card-hover">
                <stat.icon className="w-6 h-6 text-gold mx-auto mb-3" />
                <div className="text-3xl font-bold text-gold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Why */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeIn>
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">The Challenge</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Why We Built LocalLink
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              In suburban communities like Cypress, Texas, discovering quality local businesses can be challenging. National chain stores often dominate visibility, while neighborhood gems remain hidden.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-foreground">
                <span className="text-gold mt-1">•</span>
                Finding reliable local services without a centralized directory
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <span className="text-gold mt-1">•</span>
                Trusting business quality without community feedback
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <span className="text-gold mt-1">•</span>
                Discovering special offers and deals from local establishments
              </li>
            </ul>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeIn>
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">Our Solution</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              A Digital Ecosystem for Community
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              LocalLink creates a vibrant platform where residents can discover, evaluate, and support local businesses while fostering a sense of community pride and economic vitality.
            </p>
          </ScrollFadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Discover", desc: "Find local businesses easily with our comprehensive directory", img: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=300&fit=crop" },
              { title: "Evaluate", desc: "Read authentic community reviews from your neighbors", img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop" },
              { title: "Support", desc: "Shop local and strengthen the Cypress community", img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=300&fit=crop" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="bg-card border border-border rounded-xl overflow-hidden card-hover">
                  <img src={item.img} alt={item.title} className="w-full h-40 object-cover" loading="lazy" />
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Text reveal */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-4xl mx-auto min-h-[30vh] flex items-center">
          <TextReveal
            text="We believe every neighborhood deserves a digital main street where local businesses thrive and community connections flourish."
            className="text-2xl md:text-3xl font-display font-bold text-primary-foreground leading-snug justify-center text-center"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
