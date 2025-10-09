import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Directory', path: '/directory' },
  { label: 'Map', path: '/map' },
  { label: 'Events', path: '/events' },
  { label: 'Submit', path: '/submit' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isHome ? 'bg-transparent' : 'bg-card/95 backdrop-blur-md border-b border-border'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-navy-gradient flex items-center justify-center">
            <MapPin className="w-4 h-4 text-gold" />
          </div>
          <div className="font-display">
            <span className={`text-lg font-bold ${isHome ? 'text-primary-foreground' : 'text-primary'}`}>Cypress</span>
            <span className="text-lg font-bold text-gold"> Local</span>
            <span className={`text-lg font-bold ${isHome ? 'text-primary-foreground' : 'text-primary'}`}>Link</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-gold'
                  : isHome
                  ? 'text-primary-foreground/80 hover:text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/directory"
            className="p-2 rounded-full transition-colors duration-200 hover:bg-muted/30"
          >
            <Search className={`w-4 h-4 ${isHome ? 'text-primary-foreground/80' : 'text-muted-foreground'}`} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
        >
          {open ? (
            <X className={`w-5 h-5 ${isHome ? 'text-primary-foreground' : 'text-foreground'}`} />
          ) : (
            <Menu className={`w-5 h-5 ${isHome ? 'text-primary-foreground' : 'text-foreground'}`} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-b border-border/30 px-6 py-6 space-y-3 relative overflow-hidden"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582407947092-50b8aba1c062?w=800&h=600&fit=crop)' }}
          />
          <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm" />
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`relative z-10 block text-sm font-medium py-2 ${
                location.pathname === link.path ? 'text-gold' : 'text-primary-foreground/80 hover:text-primary-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
