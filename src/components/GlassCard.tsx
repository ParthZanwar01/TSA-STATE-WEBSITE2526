import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover3d?: boolean;
}

const GlassCard = ({ children, className = '', glow = false, hover3d = false }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hover3d ? { y: -6, rotateX: 2, rotateY: -2 } : { y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        relative rounded-2xl
        bg-card/60 backdrop-blur-xl
        border border-border/50
        shadow-[0_8px_32px_-8px_hsl(var(--navy)/0.12)]
        hover:shadow-[0_16px_48px_-12px_hsl(var(--gold)/0.15)]
        hover:border-gold/20
        transition-shadow duration-500
        ${glow ? 'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-gold/5 before:to-transparent before:pointer-events-none' : ''}
        ${className}
      `}
      style={hover3d ? { perspective: 1000, transformStyle: 'preserve-3d' as const } : undefined}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
