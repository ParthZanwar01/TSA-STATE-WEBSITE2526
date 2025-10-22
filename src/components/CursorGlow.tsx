import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorGlow = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, [role="button"], [data-magnetic]');
      setHovering(!!interactive);
    };

    const hide = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseleave', hide);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseleave', hide);
    };
  }, [visible, x, y]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      {/* Outer glow */}
      <motion.div
        className="rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          backgroundColor: hovering
            ? 'hsla(40, 65%, 52%, 0.15)'
            : 'hsla(40, 65%, 52%, 0.08)',
          boxShadow: hovering
            ? '0 0 40px 10px hsla(40, 65%, 52%, 0.2)'
            : '0 0 20px 5px hsla(40, 65%, 52%, 0.1)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* Inner dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          width: hovering ? 6 : 4,
          height: hovering ? 6 : 4,
          backgroundColor: hovering
            ? 'hsla(40, 65%, 52%, 0.9)'
            : 'hsla(40, 65%, 52%, 0.6)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </motion.div>
  );
};

export default CursorGlow;
