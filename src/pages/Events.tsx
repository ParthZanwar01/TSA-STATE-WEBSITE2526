import { useState } from 'react';
import { events } from '@/data/businessData';
import { StaggerChildren, StaggerItem, ScrollFadeIn } from '@/components/ScrollAnimations';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const Events = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const eventDates = events.map((ev) => new Date(ev.date + 'T00:00:00'));

  const filteredEvents = selectedDate
    ? events.filter((ev) => {
        const evDate = new Date(ev.date + 'T00:00:00');
        return (
          evDate.getFullYear() === selectedDate.getFullYear() &&
          evDate.getMonth() === selectedDate.getMonth() &&
          evDate.getDate() === selectedDate.getDate()
        );
      })
    : events;

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="bg-primary py-16 md:py-20 px-6 relative">
          <FloatingOrbs className="opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-light opacity-80" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3">
                  Community <span className="text-gold">Events</span>
                </h1>
                <p className="text-primary-foreground/70 text-lg">What's happening in Cypress, Texas</p>
                <p className="text-gold/80 text-sm mt-2 font-medium">{events.length} upcoming events</p>
              </div>
              <div className="flex gap-1 bg-primary-foreground/10 rounded-xl p-1.5 backdrop-blur-sm border border-primary-foreground/10">
                <button
                  onClick={() => setView('list')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    view === 'list'
                      ? 'bg-primary-foreground text-primary shadow-md'
                      : 'text-primary-foreground/70 hover:text-primary-foreground'
                  )}
                >
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    view === 'calendar'
                      ? 'bg-primary-foreground text-primary shadow-md'
                      : 'text-primary-foreground/70 hover:text-primary-foreground'
                  )}
                >
                  <span className="hidden sm:inline">Calendar</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-10 px-6">
        {view === 'list' ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            <ScrollFadeIn>
              <GlassCard glow className="p-5 self-start depth-shadow sticky top-24">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Calendar</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="p-3 pointer-events-auto rounded-lg border border-border"
                  modifiers={{ event: eventDates }}
                  modifiersClassNames={{
                    event: 'bg-gold/20 text-gold font-bold rounded-full',
                  }}
                />
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate(undefined)}
                    className="mt-3 w-full text-sm text-muted-foreground hover:text-gold transition-colors font-medium"
                  >
                    ← Show all events
                  </button>
                )}
              </GlassCard>
            </ScrollFadeIn>
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {selectedDate
                  ? `Events on ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : 'All Upcoming Events'}
              </h2>
              {filteredEvents.length > 0 ? (
                <StaggerChildren className="space-y-5">
                  {filteredEvents.map((ev, i) => (
                    <StaggerItem key={ev.id}>
                      <EventCard ev={ev} index={i} />
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              ) : (
                <GlassCard className="p-12 text-center">
                  <p className="text-muted-foreground text-lg">No events on this date</p>
                  <p className="text-muted-foreground/60 text-sm mt-1">Try selecting a different date</p>
                </GlassCard>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
              <ScrollFadeIn>
                <GlassCard glow className="p-5 self-start depth-shadow">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="p-3 pointer-events-auto"
                    modifiers={{ event: eventDates }}
                    modifiersClassNames={{
                      event: 'bg-gold/20 text-gold font-bold rounded-full',
                    }}
                  />
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(undefined)}
                      className="mt-3 w-full text-sm text-muted-foreground hover:text-gold transition-colors font-medium"
                    >
                      ← Show all events
                    </button>
                  )}
                </GlassCard>
              </ScrollFadeIn>

              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {selectedDate
                    ? `Events on ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                    : 'All Upcoming Events'}
                </h2>
                {filteredEvents.length > 0 ? (
                  <StaggerChildren className="space-y-5">
                    {filteredEvents.map((ev, i) => (
                      <StaggerItem key={ev.id}>
                        <EventCard ev={ev} index={i} />
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                ) : (
                  <GlassCard className="p-12 text-center">
                    <p className="text-muted-foreground text-lg">No events on this date</p>
                    <p className="text-muted-foreground/60 text-sm mt-1">Try selecting a different date</p>
                  </GlassCard>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ ev, index }: { ev: typeof events[0]; index: number }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ duration: 0.2 }}
  >
    <GlassCard glow hover3d className="p-6 md:p-8">
      <div className="flex items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.1, rotateZ: -5 }}
          className="flex-shrink-0 w-18 h-18 md:w-20 md:h-20 bg-navy-gradient rounded-2xl flex flex-col items-center justify-center depth-shadow"
        >
          <span className="text-2xl md:text-3xl font-bold text-primary-foreground leading-none font-display">{ev.day}</span>
          <span className="text-xs text-gold font-semibold tracking-wider uppercase">{ev.month}</span>
        </motion.div>
        <div className="flex-1">
          <h3 className="font-display text-lg md:text-xl font-bold text-foreground">{ev.title}</h3>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>{ev.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>{ev.location}</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

export default Events;
