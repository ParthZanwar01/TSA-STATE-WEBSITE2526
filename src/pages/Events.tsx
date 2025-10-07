import { events } from '@/data/businessData';
import { Clock, MapPin } from 'lucide-react';
import { StaggerChildren, StaggerItem, ScrollFadeIn } from '@/components/ScrollAnimations';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';

const Events = () => {
  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <div className="bg-primary py-12 px-6 mb-8 relative overflow-hidden">
        <FloatingOrbs className="opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
            Community Events
          </h1>
          <p className="text-primary-foreground/70">What's happening in Cypress</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <StaggerChildren className="space-y-4">
          {events.map((ev) => (
            <StaggerItem key={ev.id}>
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
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
};

export default Events;
