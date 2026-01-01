import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ScrollFadeIn } from '@/components/ScrollAnimations';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/AuthContext';
import { useEventStoreContext } from '@/contexts/EventStoreContext';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { ReCaptcha } from '@/components/ReCaptcha';
import { Calendar } from 'lucide-react';

const eventSchema = z.object({
  title: z.string().trim().min(2, 'Event title must be at least 2 characters').max(100, 'Title must be less than 100 characters'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().trim().min(1, 'Please enter event time'),
  location: z.string().trim().min(3, 'Please enter a valid location').max(200, 'Location must be less than 200 characters'),
  description: z.string().trim().max(500, 'Description must be less than 500 characters').optional().or(z.literal('')),
  submitterName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  submitterEmail: z.string().trim().email('Please enter a valid email address').max(255, 'Email too long'),
});

type EventForm = z.infer<typeof eventSchema>;

const initialForm: EventForm = {
  title: '', date: '', time: '', location: '', description: '',
  submitterName: '', submitterEmail: '',
};

const SubmitEvent = () => {
  const { user } = useAuth();
  const { addPending } = useEventStoreContext();
  const [form, setForm] = useState<EventForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof EventForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const navigate = useNavigate();

  const update = (field: keyof EventForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      toast({ title: 'Verification required', description: 'Please complete the CAPTCHA.', variant: 'destructive' });
      return;
    }
    const result = eventSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof EventForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof EventForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    addPending({
      title: form.title,
      date: form.date,
      time: form.time,
      location: form.location,
      description: form.description || undefined,
      submitterName: form.submitterName,
      submitterEmail: form.submitterEmail,
    });
    setSubmitted(true);
    toast({ title: 'Event submitted!', description: "We'll review and add it to the calendar shortly." });
  };

  if (!user) {
    return (
      <div className="pt-20 pb-16 bg-background min-h-screen flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Sign in required</h1>
          <p className="text-muted-foreground text-lg mb-8">
            You need an account to submit a community event. Sign in or create an account to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/login?redirect=${encodeURIComponent('/submit-event')}`}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-navy-light transition-colors depth-shadow"
            >
              Sign in
            </Link>
            <Link to="/" className="inline-flex items-center justify-center border border-border px-8 py-4 rounded-full font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pt-20 pb-16 bg-background min-h-screen flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Thank You!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Your event has been submitted. Our team will review it and add it to the community calendar shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-navy-light transition-colors depth-shadow"
            >
              View Events
            </Link>
            <button
              onClick={() => { setSubmitted(false); setForm(initialForm); setCaptchaToken(null); setCaptchaKey((k) => k + 1); }}
              className="inline-flex items-center justify-center border border-border px-8 py-4 rounded-full font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Submit Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const inputClass = (field: keyof EventForm) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all ${errors[field] ? 'border-destructive ring-1 ring-destructive/30' : 'border-border'}`;

  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <div className="relative overflow-hidden">
        <div className="bg-primary py-16 md:py-20 px-6 relative">
          <FloatingOrbs className="opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-light opacity-80" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-7xl mx-auto relative z-10 flex items-center gap-4"
          >
            <Calendar className="h-12 w-12 text-gold" />
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-2">
                Submit Community <span className="text-gold">Event</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg">Share your event with the Cypress community</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-10">
        <ScrollFadeIn>
          <GlassCard glow className="p-6 md:p-8 depth-shadow">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Event Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update('title', e.target.value)}
                  placeholder="e.g. Cypress Farmers Market"
                  className={inputClass('title')}
                />
                {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => update('date', e.target.value)}
                    min={minDate}
                    className={inputClass('date')}
                  />
                  {errors.date && <p className="text-destructive text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Time *</label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => update('time', e.target.value)}
                    placeholder="e.g. 10:00 AM"
                    className={inputClass('time')}
                  />
                  {errors.time && <p className="text-destructive text-xs mt-1">{errors.time}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Location *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => update('location', e.target.value)}
                  placeholder="e.g. Cypress Community Center"
                  className={inputClass('location')}
                />
                {errors.location && <p className="text-destructive text-xs mt-1">{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Description (optional)</label>
                <textarea
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  placeholder="Brief description of the event"
                  rows={3}
                  className={inputClass('description')}
                />
                {errors.description && <p className="text-destructive text-xs mt-1">{errors.description}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={form.submitterName}
                    onChange={(e) => update('submitterName', e.target.value)}
                    placeholder="Full name"
                    className={inputClass('submitterName')}
                  />
                  {errors.submitterName && <p className="text-destructive text-xs mt-1">{errors.submitterName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    value={form.submitterEmail}
                    onChange={(e) => update('submitterEmail', e.target.value)}
                    placeholder="you@email.com"
                    className={inputClass('submitterEmail')}
                  />
                  {errors.submitterEmail && <p className="text-destructive text-xs mt-1">{errors.submitterEmail}</p>}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Verify you&apos;re not a robot</p>
                <ReCaptcha key={captchaKey} onVerify={setCaptchaToken} size="compact" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.button
                  type="submit"
                  disabled={!captchaToken}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:bg-navy-light transition-colors depth-shadow disabled:opacity-70"
                >
                  Submit Event
                </motion.button>
                <button
                  type="button"
                  onClick={() => { setForm(initialForm); setErrors({}); setCaptchaToken(null); setCaptchaKey((k) => k + 1); }}
                  className="px-6 py-3.5 rounded-xl border border-border font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </GlassCard>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default SubmitEvent;
