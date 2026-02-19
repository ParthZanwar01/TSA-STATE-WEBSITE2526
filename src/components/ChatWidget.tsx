import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: QuickReply[];
}

interface QuickReply {
  label: string;
  responseText: string;
  followUp?: QuickReply[];
}

// ─── Decision tree: edit these to change the demo answers ───
const mainOptions: QuickReply[] = [
  {
    label: '🔍 How do I find a business?',
    responseText:
      'Great question! You can find businesses in two ways:\n\n1. **Business Directory** — Browse 92+ businesses, filter by category, and search by name.\n2. **Community Map** — See all businesses on an interactive map and click pins for details.\n\nWant to know more?',
    followUp: [
      {
        label: 'How do I use filters?',
        responseText:
          'On the Directory page, you\'ll see category pills at the top (Restaurant, Retail, Health & Fitness, etc.). Click any category to filter. Use the search bar to find businesses by name. You can combine both!',
      },
      {
        label: 'How does the map work?',
        responseText:
          'The Map page shows all businesses as pins on an interactive map. Click any pin to see the business name and rating. Use the sidebar to search, and click a business in the list to fly to its location on the map.',
      },
      { label: '← Back to main menu', responseText: '__MAIN_MENU__' },
    ],
  },
  {
    label: '📅 Tell me about events',
    responseText:
      'We keep you updated on what\'s happening in Cypress! The Events page shows upcoming community events with two views:\n\n• **List View** — Scrollable cards with dates, times, and locations\n• **Calendar View** — Visual calendar with highlighted event dates\n\nClick any date to see what\'s happening!',
    followUp: [
      {
        label: 'Can I submit an event?',
        responseText:
          'You can submit community events directly! Go to **Submit Event** in the navigation bar. Fill out the form with your event details and our team will review and add it to the calendar.',
      },
      { label: '← Back to main menu', responseText: '__MAIN_MENU__' },
    ],
  },
  {
    label: '🏢 I own a business',
    responseText:
      'Welcome, business owner! Here\'s how Cypress LocalLink helps you:\n\n• **Free Listing** — Submit your business to our directory at no cost\n• **My Submissions** — Log in to track your pending business and event submissions\n• **Community Visibility** — Get discovered by local residents\n\nWhat would you like to do?',
    followUp: [
      {
        label: 'How do I submit my business?',
        responseText:
          'Easy! Click **"Submit"** in the top navigation bar. Fill out the form with your business name, category, address, description, and contact info. Our team reviews submissions and your listing will go live shortly after approval.',
      },
      {
        label: 'How do I manage my listing?',
        responseText:
          'Click **"Login"** in the top navigation and sign in. Then go to **My Submissions** to see the status of your pending business and event submissions. Our team reviews all submissions before they go live.',
      },
      { label: '← Back to main menu', responseText: '__MAIN_MENU__' },
    ],
  },
  {
    label: '❓ What is Cypress LocalLink?',
    responseText:
      'Cypress LocalLink is a **community hub** for Cypress, Texas! We connect residents with:\n\n🏪 **92+ Local Businesses** across 10 categories\n🗺️ **Interactive Community Map**\n📅 **Local Events & Activities**\n⭐ **Authentic Reviews** from your neighbors\n\nOur mission is to help you discover, evaluate, and support local businesses.',
    followUp: [
      {
        label: 'Who built this?',
        responseText:
          'Cypress LocalLink was built with ❤️ for the Cypress community. We believe every neighborhood deserves a digital main street where local businesses thrive and community connections flourish. Visit the About page to learn more!',
      },
      {
        label: 'Is it free?',
        responseText:
          'Yes, 100% free! Browsing the directory, using the map, viewing events, and submitting your business are all completely free for everyone in the Cypress community.',
      },
      { label: '← Back to main menu', responseText: '__MAIN_MENU__' },
    ],
  },
  {
    label: '🗺️ How do I navigate the site?',
    responseText:
      'Here\'s a quick overview of the main pages:\n\n• **Home** — Featured businesses, events, and community highlights\n• **Directory** — Search and filter all 92+ businesses\n• **Map** — Interactive map with all business locations\n• **Events** — Upcoming community events with list & calendar views\n• **Submit** — Add your business to the directory\n• **Login** — Business owner portal\n\nYou can also click the **?** button for an interactive guided tour!',
    followUp: [
      {
        label: 'Start the guided tour',
        responseText: '__START_TOUR__',
      },
      { label: '← Back to main menu', responseText: '__MAIN_MENU__' },
    ],
  },
];

const WELCOME_MSG: ChatMessage = {
  id: 'welcome',
  type: 'bot',
  text: "👋 Hi there! I'm your Cypress LocalLink assistant. How can I help you today?",
  options: mainOptions,
};

let msgId = 0;
const nextId = () => `msg-${++msgId}`;

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasUnread, setHasUnread] = useState(false);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Nudge after 5s if not opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setHasUnread(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const addBotMessage = (text: string, options?: QuickReply[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), type: 'bot', text, options },
      ]);
    }, 600 + Math.random() * 400);
  };

  const handleQuickReply = (reply: QuickReply) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: nextId(), type: 'user', text: reply.label },
    ]);

    if (reply.responseText === '__MAIN_MENU__') {
      addBotMessage("Sure! What else would you like to know?", mainOptions);
    } else if (reply.responseText === '__START_TOUR__') {
      addBotMessage("Starting the guided tour for you! 👋", mainOptions[4].followUp);
      window.dispatchEvent(new CustomEvent('start-guided-tour'));
    } else {
      addBotMessage(reply.responseText, reply.followUp);
    }
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    setMessages((prev) => [...prev, { id: nextId(), type: 'user', text }]);

    // Simple keyword matching for free-text (demo only)
    const lower = text.toLowerCase();
    if (lower.includes('business') || lower.includes('directory') || lower.includes('find')) {
      addBotMessage(mainOptions[0].responseText, mainOptions[0].followUp);
    } else if (lower.includes('event') || lower.includes('calendar')) {
      addBotMessage(mainOptions[1].responseText, mainOptions[1].followUp);
    } else if (lower.includes('submit') || lower.includes('list') || lower.includes('owner')) {
      addBotMessage(mainOptions[2].responseText, mainOptions[2].followUp);
    } else if (lower.includes('what') || lower.includes('about') || lower.includes('who')) {
      addBotMessage(mainOptions[3].responseText, mainOptions[3].followUp);
    } else if (lower.includes('map') || lower.includes('navigate') || lower.includes('tour') || lower.includes('guided')) {
      if (lower.includes('start') || lower.includes('launch') || lower.includes('take') || lower.includes('run') || lower.includes('begin')) {
        addBotMessage("Starting the guided tour for you! 👋", mainOptions[4].followUp);
        window.dispatchEvent(new CustomEvent('start-guided-tour'));
      } else {
        addBotMessage(mainOptions[4].responseText, mainOptions[4].followUp);
      }
    } else {
      addBotMessage(
        "I'm not sure about that yet, but here are some topics I can help with! 😊",
        mainOptions
      );
    }
  };

  // Simple markdown-like bold rendering
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Chat Toggle */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        onClick={() => { setIsOpen(!isOpen); setHasUnread(false); }}
        className={cn(
          'fixed bottom-6 right-6 z-[9998] w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform',
          isOpen ? 'bg-primary' : 'bg-gold'
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <X className="w-7 h-7 text-primary-foreground" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-primary font-semibold text-sm">Chat</motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center"
          >
            <span className="text-[10px] font-bold text-destructive-foreground">1</span>
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-28 right-6 z-[9998] w-[400px] h-[560px] max-h-[80vh] bg-card border border-border rounded-3xl depth-shadow-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-navy-gradient px-6 py-5 flex items-center gap-3 flex-shrink-0">
              <div className="flex-1">
                <h3 className="font-display text-base font-bold text-primary-foreground">Cypress LocalLink</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-primary-foreground/60 text-xs">Online now</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMessages([WELCOME_MSG]);
                    msgId = 0;
                  }}
                  className="text-primary-foreground/40 hover:text-primary-foreground text-xs transition-colors"
                >
                  Restart
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground transition-colors"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn('flex', msg.type === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div className={cn('max-w-[85%]')}>
                    <div
                      className={cn(
                        'rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line',
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-muted text-foreground rounded-bl-md'
                      )}
                    >
                      {renderText(msg.text)}
                    </div>

                    {/* Quick replies */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1.5">
                        {msg.options.map((opt, i) => (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            onClick={() => handleQuickReply(opt)}
                            className="flex items-center gap-2 text-left text-sm px-3.5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted hover:border-gold/30 transition-all group"
                          >
                            <span className="flex-1 text-foreground">{opt.label}</span>
                            <span className="text-muted-foreground group-hover:text-gold transition-colors">→</span>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-end gap-2"
                >
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border flex-shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a question..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center hover:bg-navy-light transition-colors disabled:opacity-40"
                >
                  Send
                </motion.button>
              </form>
              <p className="text-[10px] text-muted-foreground/40 text-center mt-2">
                Powered by Cypress LocalLink
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
