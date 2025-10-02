import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

const TiltCard = ({ children, className = '', intensity = 15, glare = true }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((0.5 - y) * intensity);
    setRotateY((x - 0.5) * intensity);
    setGlarePos({ x: x * 100, y: y * 100 });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(212,168,67,0.15) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
