import { motion } from 'framer-motion';

interface FloatingOrbProps {
  className?: string;
  color?: string;
  size?: string;
  delay?: number;
  duration?: number;
}

const FloatingOrb = ({
  className = '',
  color = 'gold',
  size = 'w-64 h-64',
  delay = 0,
  duration = 20,
}: FloatingOrbProps) => {
  const colorMap: Record<string, string> = {
    gold: 'bg-gold/20',
    navy: 'bg-navy/30',
    accent: 'bg-secondary/20',
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${colorMap[color] || colorMap.gold} ${size} ${className}`}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 15, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
};

export const FloatingOrbs = ({ className = '' }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <FloatingOrb color="gold" size="w-72 h-72" className="-top-20 -right-20" delay={0} duration={25} />
    <FloatingOrb color="navy" size="w-96 h-96" className="-bottom-32 -left-32" delay={3} duration={30} />
    <FloatingOrb color="accent" size="w-56 h-56" className="top-1/3 right-1/4" delay={5} duration={22} />
  </div>
);

export default FloatingOrb;
