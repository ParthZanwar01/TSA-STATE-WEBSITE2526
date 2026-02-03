import { ScrollFadeIn, StaggerChildren, StaggerItem, TextReveal } from '@/components/ScrollAnimations';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { Link } from 'react-router-dom';

const stats = [
  { value: "100+", label: "Local Businesses" },
  { value: "50+", label: "Active Deals" },
  { value: "Monthly", label: "Community Events" },
  { value: "500+", label: "5-Star Reviews" },
];

const values = [
  { title: "Community First", desc: "Every feature we build starts with the question: does this help our neighbors connect?" },
  { title: "Local Discovery", desc: "We spotlight hidden gems so you can explore beyond the big chains." },
  { title: "Trust & Quality", desc: "Real reviews from real residents. No paid placements, no bias." },
];

const About = () => {
  return (
    <div className="pt-20 bg-background">
      <PageHeader
        image="https://images.unsplash.com/photo-1582407947092-50b8aba1c062?w=1920&h=800&fit=crop"
        className="min-h-[60vh] [&>div]:min-h-[60vh]"
        children={
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              About Cypress <span className="text-gold">LocalLink</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              This community resource hub connects Cypress, Texas residents with local businesses, non-profits, support services, and civic programs.
            </p>
          </div>
        }
      />

      {/* Stats */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <GlassCard glow hover3d className="p-8 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold font-display mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">What Drives Us</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">
                Our Values
              </h2>
            </div>
          </ScrollFadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <GlassCard glow hover3d className="p-8 h-full">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn>
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">The Challenge</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Why We Built LocalLink
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                In suburban communities like Cypress, discovering quality local businesses can be challenging. National chains dominate visibility, while neighborhood gems remain hidden.
              </p>
              <div className="space-y-4">
                {[
                  "Finding reliable local services without a centralized directory",
                  "Trusting business quality without community feedback",
                  "Discovering special offers and deals from local establishments",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold font-bold text-sm">{i + 1}</span>
                    </div>
                    <p className="text-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden depth-shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=500&fit=crop"
                    alt="Cypress community"
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gold/10 border border-gold/20 -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 -z-10" />
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6 bg-muted overflow-visible">
        <div className="max-w-5xl mx-auto overflow-visible">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">Our Solution</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">
                A Digital Ecosystem for Community
              </h2>
              <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
                LocalLink creates a vibrant platform where residents discover, evaluate, and support local businesses.
              </p>
            </div>
          </ScrollFadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-visible">
            {[
              { title: "Discover", desc: "Find local businesses easily with our comprehensive, searchable directory", img: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=300&fit=crop" },
              { title: "Evaluate", desc: "Read authentic community reviews from your Cypress neighbors", img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop" },
              { title: "Support", desc: "Shop local and strengthen the Cypress economy and community", img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=300&fit=crop" },
            ].map((item, i) => (
              <StaggerItem key={item.title} className="overflow-visible pt-2">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden depth-shadow group"
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-b from-muted to-muted-foreground/10" aria-hidden />
                    <img
                      src={item.img}
                      alt={item.title}
                      className="relative z-10 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/60 to-transparent z-20" />
                    <div className="absolute bottom-4 left-4 z-30">
                      <span className="bg-gold/90 text-primary font-bold text-xs px-3 py-1 rounded-full">
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 leading-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Text reveal */}
      <section className="py-28 px-6 bg-primary relative overflow-hidden">
        <FloatingOrbs className="opacity-10" />
        <div className="max-w-4xl mx-auto min-h-[30vh] flex items-center relative z-10">
          <TextReveal
            text="We believe every neighborhood deserves a digital main street where local businesses thrive and community connections flourish."
            className="text-2xl md:text-3xl font-display font-bold text-primary-foreground leading-snug justify-center text-center"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollFadeIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Explore?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Discover what makes Cypress special through our community-driven directory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/directory"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-navy-light transition-colors depth-shadow"
              >
                Browse Directory
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 border-2 border-border text-foreground px-8 py-4 rounded-full font-semibold hover:border-gold hover:text-gold transition-colors"
              >
                List Your Business
              </Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </div>
  );
};

export default About;
