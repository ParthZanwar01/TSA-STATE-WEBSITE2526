import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollFadeIn = ({ children, className = '' }: ScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -60]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y }}>
        {children}
      </motion.div>
    </div>
  );
};

export const ScrollScale = ({ children, className = '' }: ScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, scale }}>
        {children}
      </motion.div>
    </div>
  );
};

// Parallax section - content moves at different speed than scroll
export const ScrollParallax = ({ children, className = '', speed = 0.5 }: ScrollSectionProps & { speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

// 3D rotate on scroll
export const ScrollRotate3D = ({ children, className = '' }: ScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, 0, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX, opacity, scale, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  );
};

export const StickyReveal = ({ children, className = '' }: ScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [1, 1, 1, 0.88]);
  const rotateX = useTransform(scrollYProgress, [0.85, 1], [0, 8]);

  return (
    <div ref={ref} className={`h-[150vh] relative ${className}`}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ perspective: 1500 }}>
        <motion.div style={{ opacity, scale, rotateX }} className="w-full h-full">
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export const TextReveal = ({ text, className = '' }: { text: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  });

  const words = text.split(' ');

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
      })}
    </div>
  );
};

const Word = ({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [8, 0]);
  const blur = useTransform(progress, range, [4, 0]);

  return (
    <motion.span
      style={{ opacity, y, filter: blur.get() > 0.5 ? `blur(${blur}px)` : undefined }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
};

export const StaggerChildren = ({ children, className = '' }: ScrollSectionProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = '' }: ScrollSectionProps) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1, y: 0, scale: 1,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
