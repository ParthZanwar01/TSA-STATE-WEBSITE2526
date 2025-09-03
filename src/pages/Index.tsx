import { Suspense } from 'react';
import MorphScene from '@/components/MorphScene';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* 3D Scene */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary animate-pulse-glow" />
          </div>
        }
      >
        <MorphScene />
      </Suspense>

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between pointer-events-none">
        {/* Nav */}
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

        {/* Center text */}
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter gradient-text mb-4">
            MORPH
          </h1>
          <p className="font-mono text-sm md:text-base text-muted-foreground tracking-widest max-w-md mx-auto">
            SHAPES IN CONSTANT EVOLUTION
          </p>
        </div>

        {/* Bottom info */}
        <div className="w-full px-8 py-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>DRAG TO INTERACT</span>
          <span className="text-primary animate-pulse-glow">● LIVE</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
