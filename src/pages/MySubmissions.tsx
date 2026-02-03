/**
 * My Submissions: shows logged-in user's pending business and event submissions.
 * Business Portal / manage listing - users can track their submissions.
 */

import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthContext';
import { useBusinessStoreContext } from '@/contexts/BusinessStoreContext';
import { useEventStoreContext } from '@/contexts/EventStoreContext';
import { PageHeader } from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Clock, PlusCircle } from 'lucide-react';
import { ScrollFadeIn } from '@/components/ScrollAnimations';

const MySubmissions = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { pendingBusinesses } = useBusinessStoreContext();
  const { pendingEvents } = useEventStoreContext();

  if (loading) {
    return (
      <div className="pt-20 pb-16 bg-background min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground animate-pulse">Loading…</span>
      </div>
    );
  }

  if (!user) {
    navigate('/login?redirect=/my-submissions', { replace: true });
    return null;
  }

  const userEmail = user.email?.toLowerCase();
  const myPendingBusinesses = pendingBusinesses.filter((p) => p.ownerEmail?.toLowerCase() === userEmail);
  const myPendingEvents = pendingEvents.filter((p) => p.submitterEmail?.toLowerCase() === userEmail);
  const hasAny = myPendingBusinesses.length > 0 || myPendingEvents.length > 0;

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <PageHeader
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&h=600&fit=crop"
        children={
          <div className="flex items-center gap-4">
            <FileText className="h-12 w-12 text-gold flex-shrink-0" />
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-2">
                My <span className="text-gold">Submissions</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg">Track your business and event submissions</p>
            </div>
          </div>
        }
      />

      <div className="max-w-4xl mx-auto px-6 mt-10">
        <ScrollFadeIn>
          {!hasAny ? (
            <GlassCard glow className="p-12 text-center depth-shadow">
              <p className="text-muted-foreground text-lg mb-6">
                You don&apos;t have any pending submissions yet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/submit"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-navy-light transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  Submit a Business
                </Link>
                <Link
                  to="/submit-event"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-full font-semibold text-foreground hover:border-gold transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  Submit an Event
                </Link>
              </div>
            </GlassCard>
          ) : (
            <div className="space-y-8">
              {myPendingBusinesses.length > 0 && (
                <section>
                  <h2 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gold" />
                    Pending Businesses
                  </h2>
                  <div className="space-y-3">
                    {myPendingBusinesses.map((p) => (
                      <GlassCard key={p.id} glow className="p-4 depth-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{p.name}</h3>
                            <p className="text-sm text-muted-foreground">{p.category} · {p.address}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Submitted {new Date(p.submittedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold">
                            Pending review
                          </span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </section>
              )}
              {myPendingEvents.length > 0 && (
                <section>
                  <h2 className="font-display font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gold" />
                    Pending Events
                  </h2>
                  <div className="space-y-3">
                    {myPendingEvents.map((p) => (
                      <GlassCard key={p.id} glow className="p-4 depth-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{p.title}</h3>
                            <p className="text-sm text-muted-foreground">{p.date} · {p.time} at {p.location}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Submitted {new Date(p.submittedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold">
                            Pending review
                          </span>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </section>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  to="/submit"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-full font-semibold text-foreground hover:border-gold transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  Submit Another Business
                </Link>
                <Link
                  to="/submit-event"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-full font-semibold text-foreground hover:border-gold transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  Submit Another Event
                </Link>
              </div>
            </div>
          )}
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default MySubmissions;
