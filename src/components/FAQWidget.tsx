import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'What is Cypress LocalLink?',
    answer: 'Cypress LocalLink is a community hub that connects Cypress, Texas residents with local businesses, events, and resources. Browse our directory, explore the map, and stay updated on community events.',
  },
  {
    category: 'Getting Started',
    question: 'How do I find a business?',
    answer: 'Head to the Business Directory page where you can search by name, filter by category, and browse 92+ local businesses. Click any card to flip it and see more details, or tap "View Full Profile" for the complete listing.',
  },
  {
    category: 'Getting Started',
    question: 'How do I use the community map?',
    answer: 'Visit the Map page to see all businesses plotted on an interactive map. Use the sidebar to search and filter, then click any business to center the map on its location. Click map pins for quick business details.',
  },
  {
    category: 'For Business Owners',
    question: 'How do I list my business?',
    answer: 'Click "Submit" in the navigation bar to access the submission form. Fill in your business details including name, category, address, and description. Our team will review and approve your listing.',
  },
  {
    category: 'For Business Owners',
    question: 'How do I manage my listing?',
    answer: 'Use the Business Portal by clicking "Login" in the top navigation. Once logged in, you can update your business information, hours, and other details. Business management features are coming soon!',
  },
  {
    category: 'Events',
    question: 'How do I find community events?',
    answer: 'Visit the Events page to see all upcoming events. You can switch between a list view and a calendar view. Click on any date in the calendar to see events happening that day.',
  },
  {
    category: 'Events',
    question: 'Can I submit my own event?',
    answer: 'Event submissions are coming soon! In the meantime, reach out to us through the contact information on the About page to have your community event featured.',
  },
  {
    category: 'General',
    question: 'Is Cypress LocalLink free to use?',
    answer: 'Yes! Browsing the directory, using the map, and viewing events is completely free for all Cypress residents. Business listings are also free of charge.',
  },
  {
    category: 'General',
    question: 'How do I take the website tour?',
    answer: 'Click the "?" help button in the bottom-right corner of the screen to launch an interactive guided tour that walks you through all the key features of the website.',
  },
];

const categories = [...new Set(faqs.map(f => f.category))];

export const FAQWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredFaqs = faqs.filter(f => f.category === activeCategory);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, type: 'spring' }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-24 z-[9998] w-14 h-14 rounded-2xl flex items-center justify-center depth-shadow-lg hover:scale-110 transition-transform',
          isOpen ? 'bg-destructive text-destructive-foreground' : 'bg-gold text-primary'
        )}
        title="Frequently Asked Questions"
      >
        {isOpen ? '×' : '?'}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-[9998] w-[380px] max-h-[70vh] bg-card border border-border rounded-2xl depth-shadow-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-navy-gradient p-5 flex-shrink-0">
              <h3 className="font-display text-lg font-bold text-primary-foreground">
                Frequently Asked <span className="text-gold">Questions</span>
              </h3>
              <p className="text-primary-foreground/60 text-xs mt-1">Find answers to common questions</p>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1 p-3 border-b border-border overflow-x-auto flex-shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredFaqs.map((faq, i) => {
                const globalIndex = faqs.indexOf(faq);
                const isItemOpen = openIndex === globalIndex;
                return (
                  <div key={globalIndex} className="rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isItemOpen ? null : globalIndex)}
                      className="w-full flex items-start gap-3 p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="flex-1 text-sm font-medium text-foreground leading-snug">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: isItemOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 mt-0.5"
                      >
                        <span className="text-muted-foreground">∨</span>
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isItemOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FAQWidget;
