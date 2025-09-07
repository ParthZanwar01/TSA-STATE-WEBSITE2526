import { events } from '@/data/businessData';
import { Clock, MapPin } from 'lucide-react';
import { StaggerChildren, StaggerItem, ScrollFadeIn } from '@/components/ScrollAnimations';

const Events = () => {
  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <div className="bg-primary py-12 px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
            Community Events
          </h1>
          <p className="text-primary-foreground/70">What's happening in Cypress</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <StaggerChildren className="space-y-4">
          {events.map((ev) => (
            <StaggerItem key={ev.id}>
              <div className="flex items-center gap-6 bg-card rounded-xl p-6 border border-border card-hover">
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-xl flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground leading-none">{ev.day}</span>
                  <span className="text-xs text-gold font-semibold">{ev.month}</span>
                </div>
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
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
};

export default Events;
