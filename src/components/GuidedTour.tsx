import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface TourStep {
  target: string; // CSS selector
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    target: 'nav a[href="/"]',
    title: 'Welcome to Cypress LocalLink!',
    content: 'This is your community hub. Let\'s take a quick tour of the key features.',
    position: 'bottom',
  },
  {
    target: 'nav a[href="/directory"]',
    title: 'Business Directory',
    content: 'Browse 92+ local businesses across 10 categories. Use search and filters to find exactly what you need.',
    position: 'bottom',
  },
  {
    target: 'nav a[href="/map"]',
    title: 'Community Map',
    content: 'See all businesses plotted on an interactive map. Click any pin for details.',
    position: 'bottom',
  },
  {
    target: 'nav a[href="/events"]',
    title: 'Events Calendar',
    content: 'Stay up to date with community events. Switch between list and calendar views.',
    position: 'bottom',
  },
  {
    target: 'nav a[href="/submit"]',
    title: 'Submit Your Business',
    content: 'Own a local business? Submit it to be listed in our directory for free.',
    position: 'bottom',
  },
  {
    target: 'nav a[href="/login"]',
    title: 'Business Portal',
    content: 'Business owners can log in here to manage their listing information.',
    position: 'bottom',
  },
];

const TOUR_STORAGE_KEY = 'cypress-locallink-tour-seen';

export const GuidedTour = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [highlightRect, setHighlightRect] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Show tour on first visit
  useEffect(() => {
    const seen = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setIsActive(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const positionTooltip = useCallback(() => {
    const step = tourSteps[currentStep];
    const el = document.querySelector(step.target);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const padding = 8;

    setHighlightRect({
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    });

    const tooltipWidth = 340;
    const tooltipHeight = 180;
    const gap = 16;

    let top = 0;
    let left = 0;
    const pos = step.position || 'bottom';

    switch (pos) {
      case 'bottom':
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'top':
        top = rect.top - tooltipHeight - gap;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - gap;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + gap;
        break;
    }

    // Clamp to viewport
    left = Math.max(16, Math.min(left, window.innerWidth - tooltipWidth - 16));
    top = Math.max(16, Math.min(top, window.innerHeight - tooltipHeight - 16));

    setTooltipPos({ top, left });
  }, [currentStep]);

  useEffect(() => {
    if (!isActive) return;
    positionTooltip();
    window.addEventListener('resize', positionTooltip);
    window.addEventListener('scroll', positionTooltip);
    return () => {
      window.removeEventListener('resize', positionTooltip);
      window.removeEventListener('scroll', positionTooltip);
    };
  }, [isActive, currentStep, positionTooltip]);

  const next = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      endTour();
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  };

  const startTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  const step = tourSteps[currentStep];

  return (
    <>
      {/* Help Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={startTour}
        className="fixed bottom-6 right-24 z-[9997] w-12 h-12 rounded-2xl bg-navy-gradient text-gold flex items-center justify-center depth-shadow-lg hover:scale-110 transition-transform"
        title="Take a guided tour"
      >
        <HelpCircle className="w-6 h-6" />
      </motion.button>

      {/* Tour Overlay */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Backdrop with cutout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999]"
              onClick={endTour}
            >
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <mask id="tour-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <rect
                      x={highlightRect.left}
                      y={highlightRect.top}
                      width={highlightRect.width}
                      height={highlightRect.height}
                      rx="12"
                      fill="black"
                    />
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="rgba(0,0,0,0.6)"
                  mask="url(#tour-mask)"
                />
              </svg>
            </motion.div>

            {/* Highlight ring */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-[10000] pointer-events-none rounded-xl"
              style={{
                top: highlightRect.top,
                left: highlightRect.left,
                width: highlightRect.width,
                height: highlightRect.height,
                boxShadow: '0 0 0 3px hsl(40 55% 55%), 0 0 20px hsl(40 55% 55% / 0.3)',
              }}
            />

            {/* Tooltip */}
            <motion.div
              ref={tooltipRef}
              key={currentStep}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed z-[10001] w-[340px]"
              style={{ top: tooltipPos.top, left: tooltipPos.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-card border border-border rounded-2xl p-6 depth-shadow-lg">
                {/* Close */}
                <button
                  onClick={endTour}
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Progress dots */}
                <div className="flex items-center gap-1.5 mb-4">
                  {tourSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === currentStep
                          ? 'w-6 bg-gold'
                          : i < currentStep
                          ? 'w-2 bg-gold/40'
                          : 'w-2 bg-border'
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{step.content}</p>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={endTour}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    Skip tour
                  </button>
                  <div className="flex items-center gap-2">
                    {currentStep > 0 && (
                      <button
                        onClick={prev}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Back
                      </button>
                    )}
                    <button
                      onClick={next}
                      className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-navy-light transition-colors"
                    >
                      {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                      {currentStep < tourSteps.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Step counter */}
                <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
                  {currentStep + 1} of {tourSteps.length}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuidedTour;
