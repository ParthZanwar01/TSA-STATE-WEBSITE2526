import { useState, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MorphScene from '@/components/MorphScene';
import { useAuth } from '@/hooks/AuthContext';

const baseNavLinks = [
  { label: 'About', path: '/about' },
  { label: 'Directory', path: '/directory' },
  { label: 'Map', path: '/map' },
  { label: 'Events', path: '/events' },
  { label: 'Submit', path: '/submit' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navLinks = [
    ...baseNavLinks,
    ...(user ? [{ label: 'My Favorites', path: '/favorites' }] : []),
    ...(user?.role === 'admin' ? [{ label: 'Admin', path: '/admin' }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - use anchor to avoid white screen on client-side nav to home */}
        <a href="/" className="flex items-center gap-2 relative text-inherit no-underline hover:opacity-90 transition-opacity">
          <div className="font-display">
            <span className="text-lg font-bold text-primary">Cypress</span>
            <span className="text-lg font-bold text-gold"> Local</span>
            <span className="text-lg font-bold text-primary">Link</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-gold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 bg-primary text-primary-foreground hover:bg-navy-light"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 bg-primary text-primary-foreground hover:bg-navy-light"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-sm font-medium text-foreground"
          whileTap={{ scale: 0.9 }}
        >
          {open ? 'Close' : 'Menu'}
        </motion.button>
      </div>

      {/* Mobile menu with morph background */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden relative overflow-hidden"
        >
          {/* Morph blob background */}
          <div className="absolute inset-0 z-0">
            <Suspense fallback={null}>
              <MorphScene
                color1={[0.1, 0.16, 0.29]}
                color2={[0.83, 0.66, 0.33]}
                color3={[0.3, 0.1, 0.5]}
                size={2.5}
                interactive={false}
              />
            </Suspense>
          </div>
          <div className="absolute inset-0 bg-primary/75 backdrop-blur-sm z-[1]" />
          <div className="relative z-10 px-6 py-6 space-y-1">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block text-sm font-medium py-3 px-3 rounded-lg transition-all ${
                    location.pathname === link.path
                      ? 'text-gold bg-gold/10'
                      : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
