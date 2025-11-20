import { useState } from 'react';
import { events } from '@/data/businessData';
import { Clock, MapPin, CalendarDays, List } from 'lucide-react';
import { StaggerChildren, StaggerItem } from '@/components/ScrollAnimations';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const Events = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Parse event dates for calendar highlighting
  const eventDates = events.map((ev) => new Date(ev.date + 'T00:00:00'));

  // Filter events for selected date
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
      <div className="bg-primary py-12 px-6 mb-8 relative overflow-hidden">
        <FloatingOrbs className="opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto relative z-10 flex items-end justify-between"
        >
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
              Community Events
            </h1>
            <p className="text-primary-foreground/70">What's happening in Cypress</p>
          </div>
          <div className="flex gap-1 bg-primary-foreground/10 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                view === 'list'
                  ? 'bg-primary-foreground text-primary'
                  : 'text-primary-foreground/70 hover:text-primary-foreground'
              )}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setView('calendar')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                view === 'calendar'
                  ? 'bg-primary-foreground text-primary'
                  : 'text-primary-foreground/70 hover:text-primary-foreground'
              )}
            >
              <CalendarDays className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
          </div>
        </motion.div>
      </div>

      {view === 'list' ? (
        <div className="max-w-4xl mx-auto px-6">
          <StaggerChildren className="space-y-4">
            {events.map((ev) => (
              <StaggerItem key={ev.id}>
                <EventCard ev={ev} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
            <GlassCard glow className="p-4 self-start">
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
                  className="mt-2 w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Show all events
                </button>
              )}
            </GlassCard>

            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                {selectedDate
                  ? `Events on ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : 'All Upcoming Events'}
              </h2>
              {filteredEvents.length > 0 ? (
                <StaggerChildren className="space-y-4">
                  {filteredEvents.map((ev) => (
                    <StaggerItem key={ev.id}>
                      <EventCard ev={ev} />
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              ) : (
                <GlassCard className="p-8 text-center">
                  <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No events on this date</p>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EventCard = ({ ev }: { ev: typeof events[0] }) => (
  <GlassCard glow hover3d className="p-6">
    <div className="flex items-center gap-6">
      <motion.div
        whileHover={{ scale: 1.1, rotateZ: -3 }}
        className="flex-shrink-0 w-16 h-16 bg-navy-gradient rounded-xl flex flex-col items-center justify-center"
      >
        <span className="text-2xl font-bold text-primary-foreground leading-none">{ev.day}</span>
        <span className="text-xs text-gold font-semibold">{ev.month}</span>
      </motion.div>
      <div>
        <h3 className="font-display text-lg font-bold text-foreground">{ev.title}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{ev.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{ev.location}</span>
          </div>
        </div>
      </div>
    </div>
  </GlassCard>
);

export default Events;
