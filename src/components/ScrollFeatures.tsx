import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    label: 'FORM',
    title: 'Fluid Geometry',
    description: 'Every vertex shifts in real-time, driven by layered noise fields that create organic, never-repeating shapes.',
  },
  {
    label: 'COLOR',
    title: 'Living Gradient',
    description: 'Colors flow across the surface using fresnel shading and time-based blending — cyan, violet, and magenta in constant flux.',
  },
  {
    label: 'MOTION',
    title: 'Infinite Evolution',
    description: 'No keyframes. No loops. The morph is generative — always moving, always unique, always alive.',
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [index % 2 === 0 ? -100 : 100, 0, 0, index % 2 === 0 ? -100 : 100]
  );

  return (
    <motion.div ref={ref} style={{ opacity, x }} className="py-32">
      <div className={`flex flex-col ${index % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}>
        <span className="font-mono text-xs tracking-[0.3em] text-primary text-glow mb-4">
          {feature.label}
        </span>
        <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
          {feature.title}
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
          {feature.description}
        </p>
        <div className="mt-8 h-px w-24 bg-gradient-to-r from-primary via-secondary to-accent" />
      </div>
    </motion.div>
  );
};

const ScrollFeatures = () => {
  return (
    <div className="relative px-8 md:px-16 max-w-5xl mx-auto">
      {features.map((feature, i) => (
        <FeatureCard key={feature.label} feature={feature} index={i} />
      ))}
    </div>
  );
};

export default ScrollFeatures;
