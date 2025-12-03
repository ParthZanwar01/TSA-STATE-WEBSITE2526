import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import GuidedTour from './GuidedTour';
import FAQWidget from './FAQWidget';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />
      <GuidedTour />
      <FAQWidget />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <main>
            <Outlet />
          </main>
        </PageTransition>
      </AnimatePresence>
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <span className="font-display text-lg font-bold">
                  Cypress <span className="text-gold">Local</span>Link
                </span>
              </div>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">
                Connecting the Cypress, Texas community with local businesses, events, and resources.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gold text-sm tracking-wider uppercase">Explore</h4>
              <div className="space-y-2">
                <Link to="/directory" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Business Directory</Link>
                <Link to="/map" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Community Map</Link>
                <Link to="/events" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Events</Link>
                <Link to="/about" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">About</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gold text-sm tracking-wider uppercase">Community</h4>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">
                Whether you're a business owner or a local explorer, Cypress LocalLink is your home for community connection.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/40">
            © 2026 Cypress LocalLink. Made with ❤️ for the Cypress community.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
