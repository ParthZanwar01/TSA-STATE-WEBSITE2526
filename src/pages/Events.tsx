import { useState } from 'react';
import { events as staticEvents, type Event } from '@/data/businessData';
import { useEventStoreContext } from '@/contexts/EventStoreContext';
import { ScrollFadeIn } from '@/components/ScrollAnimations';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { Calendar } from '@/components/ui/calendar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { List, CalendarDays, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const getEventsForDate = (events: Event[], date: Date): Event[] => {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  return events.filter((ev) => {
    const evDate = new Date(ev.date + 'T00:00:00');
    return evDate.getFullYear() === y && evDate.getMonth() === m && evDate.getDate() === d;
  });
};

function DayContent({
  date,
  events,
  ...props
}: {
  date: Date;
  displayMonth: Date;
  activeModifiers: Record<string, boolean>;
  events: Event[];
}) {
  const dayEvents = getEventsForDate(events, date);
  const dayNum = date.getDate();

  return (
    <div className="flex flex-col w-full h-full min-h-0 p-1.5 text-left overflow-hidden">
      <span className="text-sm font-medium flex-shrink-0">{dayNum}</span>
      {dayEvents.length > 0 && (
        <div className="flex-1 min-h-0 overflow-hidden mt-0.5 space-y-0.5">
          {dayEvents.slice(0, 3).map((ev) => (
            <div
              key={ev.id}
              className="text-[10px] leading-tight truncate bg-gold/20 text-foreground rounded px-1 py-0.5"
              title={`${ev.title} — ${ev.time} at ${ev.location}`}
            >
              {ev.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
            <span className="text-[10px] text-muted-foreground">+{dayEvents.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}

const Events = () => {
  const { approvedEvents } = useEventStoreContext();
  const events = [...staticEvents, ...approvedEvents];
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const [view, setView] = useState<'list' | 'calendar'>('calendar');

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
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3">
                Community <span className="text-gold">Events</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg">What&apos;s happening in Cypress, Texas</p>
              <p className="text-gold/80 text-sm mt-2 font-medium">{events.length} upcoming events</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-10 px-6">
        <ScrollFadeIn>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <Link
                to="/submit-event"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-navy-light transition-colors depth-shadow"
              >
                <Plus className="h-4 w-4" />
                Submit Event
              </Link>
              <ToggleGroup
                type="single"
                value={view}
                onValueChange={(v) => v && setView(v as 'list' | 'calendar')}
                variant="outline"
              >
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4 mr-2" />
                  List
                </ToggleGroupItem>
                <ToggleGroupItem value="calendar" aria-label="Calendar view">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Calendar
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <GlassCard glow className="p-6 md:p-8 depth-shadow overflow-x-auto">
              {view === 'list' ? (
                <ul className="space-y-4">
                  {sortedEvents.map((ev) => (
                    <li
                      key={ev.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center min-w-[3rem] py-1 px-2 rounded bg-primary/10 text-primary font-semibold text-sm">
                          <span>{ev.month}</span>
                          <span className="text-lg leading-tight">{ev.day}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{ev.title}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {ev.time} · {ev.location}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Calendar
                  mode="single"
                  showOutsideDays
                  className="p-3 w-full"
                  classNames={{
                    row: "flex w-full mt-2 h-[5.5rem]",
                    cell: "flex-1 min-w-0 h-[5.5rem] p-1 align-top",
                    day: cn(
                      "h-full min-h-0 w-full p-1.5 font-normal flex flex-col items-stretch rounded-lg border border-border bg-card shadow-sm hover:border-gold/40 hover:shadow-md transition-all overflow-hidden"
                    ),
                  }}
                  components={{
                    DayContent: (props) => <DayContent {...props} events={events} />,
                  }}
                />
              )}
            </GlassCard>
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default Events;
