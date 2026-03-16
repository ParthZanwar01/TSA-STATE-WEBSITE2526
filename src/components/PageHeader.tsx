/**
 * Reusable page header with background image and parallax scroll effect.
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PageHeaderProps {
  title?: React.ReactNode;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1582407947092-50b8aba1c062?w=1920&h=600&fit=crop';

export const PageHeader = ({ title, subtitle, image = DEFAULT_IMAGE, children, className = '' }: PageHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} data-page-header className={`relative overflow-hidden -mt-14 pt-14 ${className}`}>
      <div className="relative py-12 md:py-16 px-6 min-h-[180px] flex items-center">
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0 -inset-y-[15%] -inset-x-[5%] w-[110%] h-[130%]"
          style={{ y, scale }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-navy-light/85" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto relative z-10 w-full"
        >
          {children ?? (
            <>
              {title && (
                <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-primary-foreground/80 text-lg">{subtitle}</p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};
