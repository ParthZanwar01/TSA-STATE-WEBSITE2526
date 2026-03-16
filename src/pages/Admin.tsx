/**
 * Admin dashboard: approve pending business submissions, edit and remove approved businesses.
 * Access restricted to users with role 'admin'.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthContext';
import { useBusinessStoreContext } from '@/contexts/BusinessStoreContext';
import { useEventStoreContext } from '@/contexts/EventStoreContext';
import { PageHeader } from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Check, X, Pencil, Trash2, Shield, Clock, MessageSquare, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getAllReviews, removeReviewById, type UserReview } from '@/hooks/useUserReviews';
import type { Business } from '@/data/businessData';
import { categories } from '@/data/businessData';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    pendingBusinesses,
    allBusinesses,
    approvePending,
    rejectPending,
    updateBusiness,
    removeBusiness,
    isApprovedId,
  } = useBusinessStoreContext();
  const {
    pendingEvents,
    approvePending: approveEvent,
    rejectPending: rejectEvent,
  } = useEventStoreContext();

  const [editBiz, setEditBiz] = useState<Business | null>(null);
  const [editForm, setEditForm] = useState<Partial<Business>>({});
  const [reviews, setReviews] = useState<UserReview[]>(() => getAllReviews());

  const refreshReviews = () => setReviews(getAllReviews());

  // Redirect non-admins to login
  if (user?.role !== 'admin') {
    navigate('/login', { replace: true });
    return null;
  }

  const handleApprove = (pendingId: string) => {
    approvePending(pendingId);
    toast({ title: 'Business approved', description: 'The business has been added to the directory.' });
  };

  const handleReject = (pendingId: string) => {
    rejectPending(pendingId);
    toast({ title: 'Business rejected', description: 'The submission has been removed.', variant: 'destructive' });
  };

  const openEdit = (biz: Business) => {
    setEditBiz(biz);
    setEditForm({ name: biz.name, category: biz.category, address: biz.address, description: biz.description, priceRange: biz.priceRange, phone: biz.phone });
  };

  const handleSaveEdit = () => {
    if (!editBiz) return;
    updateBusiness(editBiz.id, editForm);
    setEditBiz(null);
    toast({ title: 'Business updated', description: 'Changes have been saved.' });
  };

  const handleRemove = (id: string) => {
    if (!confirm('Remove this business from the directory? This cannot be undone.')) return;
    removeBusiness(id);
    toast({ title: 'Business removed', description: 'The business has been removed.', variant: 'destructive' });
  };

  const handleApproveEvent = (pendingId: string) => {
    approveEvent(pendingId);
    toast({ title: 'Event approved', description: 'The event has been added to the calendar.' });
  };

  const handleRejectEvent = (pendingId: string) => {
    rejectEvent(pendingId);
    toast({ title: 'Event rejected', description: 'The submission has been removed.', variant: 'destructive' });
  };

  const handleRemoveReview = (reviewId: string) => {
    if (!confirm('Remove this review? This cannot be undone.')) return;
    removeReviewById(reviewId);
    refreshReviews();
    toast({ title: 'Review removed', description: 'The review has been deleted.', variant: 'destructive' });
  };

  return (
    <div className="pt-14 pb-16 bg-background min-h-screen">
      <PageHeader
        image="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=600&fit=crop"
        children={
          <div className="flex items-center gap-4">
            <Shield className="h-12 w-12 text-gold flex-shrink-0" />
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-2">
                Admin <span className="text-gold">Dashboard</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg">Approve submissions and manage businesses</p>
            </div>
          </div>
        }
      />

      <div className="max-w-5xl mx-auto px-6 mt-10">
        <GlassCard glow className="p-6 md:p-8 depth-shadow">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="h-4 w-4" />
                Pending ({pendingBusinesses.length})
              </TabsTrigger>
              <TabsTrigger value="businesses" className="gap-2">
                All Businesses ({allBusinesses.length})
              </TabsTrigger>
              <TabsTrigger value="events" className="gap-2">
                <Calendar className="h-4 w-4" />
                Pending Events ({pendingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="reviews" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingBusinesses.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">No pending submissions.</p>
              ) : (
                pendingBusinesses.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-xl border border-border bg-muted/30 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-foreground text-lg">{p.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{p.category} · {p.address}</p>
                        <p className="text-sm text-muted-foreground mt-1">{p.description.slice(0, 120)}…</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Contact: {p.ownerName} · {p.ownerEmail}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Submitted {new Date(p.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          onClick={() => handleApprove(p.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(p.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              {pendingEvents.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">No pending event submissions.</p>
              ) : (
                pendingEvents.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-xl border border-border bg-muted/30 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-foreground text-lg">{p.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{p.date} · {p.time} at {p.location}</p>
                        {p.description && (
                          <p className="text-sm text-muted-foreground mt-1">{p.description.slice(0, 120)}{p.description.length > 120 ? '…' : ''}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          Contact: {p.submitterName} · {p.submitterEmail}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Submitted {new Date(p.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          onClick={() => handleApproveEvent(p.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleRejectEvent(p.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </TabsContent>

            <TabsContent value="businesses" className="space-y-4">
              {allBusinesses.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-border bg-muted/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-foreground text-lg">{b.name}</h3>
                      {isApprovedId(b.id) && (
                        <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">Submitted</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{b.category} · {b.address}</p>
                    <p className="text-sm text-muted-foreground">★ {b.rating} · {b.reviewCount} reviews</p>
                  </div>
                  {isApprovedId(b.id) && (
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => openEdit(b)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleRemove(b.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  )}
                  {!isApprovedId(b.id) && (
                    <span className="text-xs text-muted-foreground">Static listing (read-only)</span>
                  )}
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">No user-submitted reviews.</p>
              ) : (
                reviews.map((r) => {
                  const biz = allBusinesses.find((b) => b.id === r.businessId);
                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-xl border border-border bg-muted/30 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {biz ? biz.name : `Business ${r.businessId}`} · {r.author}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">★ {r.rating} · {r.date}</p>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.text}</p>
                      </div>
                      <div className="shrink-0">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveReview(r.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </TabsContent>
          </Tabs>
        </GlassCard>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editBiz} onOpenChange={(o) => !o && setEditBiz(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Business</DialogTitle>
          </DialogHeader>
          {editBiz && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <input
                  value={editForm.name ?? ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select
                  value={editForm.category ?? ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Address</label>
                <input
                  value={editForm.address ?? ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, address: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <input
                  value={editForm.phone ?? ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Price Range</label>
                <select
                  value={editForm.priceRange ?? ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, priceRange: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                >
                  <option value="$">$</option>
                  <option value="$$">$$</option>
                  <option value="$$$">$$$</option>
                  <option value="Free">Free</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <textarea
                  value={editForm.description ?? ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background resize-none"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditBiz(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
