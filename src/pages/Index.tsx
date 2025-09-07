import { Suspense } from 'react';
import MorphScene from '@/components/MorphScene';
import { StickyReveal, TextReveal } from '@/components/ScrollAnimations';
import ScrollFeatures from '@/components/ScrollFeatures';

const Index = () => {
  return (
    <div className="relative bg-background">
      {/* ─── HERO (sticky with morph) ─── */}
      <StickyReveal>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* 3D Scene */}
        <div className="absolute inset-0">
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse-glow" />
              </div>
            }
          >
            <MorphScene />
          </Suspense>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-between pointer-events-none">
          <nav className="w-full px-8 py-6 flex items-center justify-between pointer-events-auto">
            <span className="font-mono text-sm tracking-widest text-primary text-glow">
              MORPH
            </span>
            <div className="flex gap-8 font-mono text-xs tracking-wider text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors duration-300">EXPLORE</a>
              <a href="#" className="hover:text-primary transition-colors duration-300">ABOUT</a>
              <a href="#" className="hover:text-primary transition-colors duration-300">CONTACT</a>
            </div>
          </nav>

          <div className="text-center px-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter gradient-text mb-4">
              MORPH
            </h1>
            <p className="font-mono text-sm md:text-base text-muted-foreground tracking-widest max-w-md mx-auto">
              SHAPES IN CONSTANT EVOLUTION
            </p>
          </div>

          <div className="w-full px-8 py-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span>SCROLL TO EXPLORE</span>
            <span className="text-primary animate-pulse-glow">● LIVE</span>
            <span>2026</span>
          </div>
        </div>
      </StickyReveal>

      {/* ─── TEXT REVEAL SECTION ─── */}
      <div className="min-h-screen flex items-center justify-center px-8">
        <TextReveal
          text="We don't animate shapes. We let mathematics breathe life into geometry — creating forms that feel alive, organic, and endlessly evolving."
          className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-4xl leading-tight justify-center text-center"
        />
      </div>

      {/* ─── FEATURE CARDS (slide in from sides) ─── */}
      <ScrollFeatures />

      {/* ─── CLOSING STICKY ─── */}
      <StickyReveal>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-8">
          <span className="font-mono text-xs tracking-[0.4em] text-primary text-glow mb-8">
            THE FUTURE IS FLUID
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter gradient-text mb-6">
            Experience It
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-md mb-12">
            Where code meets art. Where math meets beauty.
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </StickyReveal>
    </div>
  );
};

export default Index;
