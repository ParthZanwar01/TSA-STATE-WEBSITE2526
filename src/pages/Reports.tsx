/**
 * Customizable reports: businesses, reviews, favorites.
 * Users select sections to include, apply filters, and view or export to CSV.
 */

import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useBusinessStoreContext } from '@/contexts/BusinessStoreContext';
import { useFavorites } from '@/hooks/useFavorites';
import { getAllReviews } from '@/hooks/useUserReviews';
import { PageHeader } from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollFadeIn } from '@/components/ScrollAnimations';
import { FileText, RefreshCw, Download } from 'lucide-react';
import { categories } from '@/data/businessData';

type ReportSection = 'businesses' | 'reviews' | 'favorites';

const Reports = () => {
  const { user } = useAuth();
  const { allBusinesses } = useBusinessStoreContext();
  const { favorites } = useFavorites(user?.id ?? null);
  const [sections, setSections] = useState<Record<ReportSection, boolean>>({
    businesses: true,
    reviews: true,
    favorites: !!user,
  });
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'reviews'>('name');
  const [minRating, setMinRating] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [minReviewRating, setMinReviewRating] = useState<string>('');
  const [reviewSort, setReviewSort] = useState<'date-desc' | 'date-asc' | 'rating-desc' | 'rating-asc'>('date-desc');

  const toggleSection = (key: ReportSection) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredBusinesses = useMemo(() => {
    let list = allBusinesses;
    if (category) list = list.filter((b) => b.category === category);
    const minR = minRating ? Number(minRating) : 0;
    if (minR > 0) list = list.filter((b) => b.rating >= minR);
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'reviews') list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [allBusinesses, category, sortBy, minRating]);

  const parseReviewDate = (dateStr: string): number => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  };

  const [reviewsKey, setReviewsKey] = useState(0);
  const reviews = useMemo(() => getAllReviews(), [reviewsKey]);

  const filteredReviews = useMemo(() => {
    let list = reviews;
    if (dateFrom) {
      const from = new Date(dateFrom).getTime();
      list = list.filter((r) => parseReviewDate(r.date) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo + 'T23:59:59').getTime();
      list = list.filter((r) => parseReviewDate(r.date) <= to);
    }
    const minR = minReviewRating ? Number(minReviewRating) : 0;
    if (minR > 0) list = list.filter((r) => r.rating >= minR);
    list = [...list];
    if (reviewSort === 'date-desc') list.sort((a, b) => parseReviewDate(b.date) - parseReviewDate(a.date));
    else if (reviewSort === 'date-asc') list.sort((a, b) => parseReviewDate(a.date) - parseReviewDate(b.date));
    else if (reviewSort === 'rating-desc') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => a.rating - b.rating);
    return list;
  }, [reviews, dateFrom, dateTo, minReviewRating, reviewSort]);

  const refreshData = () => setReviewsKey((k) => k + 1);

  const escapeCsv = (value: string | number): string => {
    const s = String(value);
    if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const exportCsv = () => {
    const rows: string[] = [];
    const nl = '\r\n';
    rows.push(`Cypress LocalLink Report,Generated ${new Date().toISOString().slice(0, 10)}${nl}`);

    if (sections.businesses && filteredBusinesses.length > 0) {
      rows.push('Businesses');
      rows.push(['Name', 'Category', 'Rating', 'Review Count', 'Address'].map(escapeCsv).join(','));
      filteredBusinesses.forEach((b) => {
        rows.push([b.name, b.category, b.rating, b.reviewCount, b.address ?? ''].map(escapeCsv).join(','));
      });
      rows.push(nl);
    }

    if (sections.reviews && filteredReviews.length > 0) {
      rows.push('Reviews');
      rows.push(['Author', 'Rating', 'Date', 'Review'].map(escapeCsv).join(','));
      filteredReviews.forEach((r) => {
        rows.push([r.author, r.rating, r.date, r.text].map(escapeCsv).join(','));
      });
      rows.push(nl);
    }

    if (sections.favorites && user && favoriteBusinesses.length > 0) {
      rows.push('Favorites');
      rows.push(['Name', 'Category', 'Rating', 'Address'].map(escapeCsv).join(','));
      favoriteBusinesses.forEach((b) => {
        rows.push([b.name, b.category, b.rating, b.address ?? ''].map(escapeCsv).join(','));
      });
    }

    const csv = rows.join(nl);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `locallink-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const favoriteBusinesses = useMemo(
    () => allBusinesses.filter((b) => favorites.includes(b.id)),
    [allBusinesses, favorites]
  );

  const hasAnySection = sections.businesses || sections.reviews || (sections.favorites && user);

  return (
    <div className="pt-14 pb-16 bg-background min-h-screen print:pt-0 print:pb-0">
      {/* Print-only title */}
      <h1 className="hidden print:block text-xl font-bold mb-4 px-6 pt-6">
        Cypress LocalLink – Report ({new Date().toLocaleDateString()})
      </h1>
      <div className="print:hidden">
        <PageHeader
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=600&fit=crop"
          children={
            <div className="flex items-center gap-4">
              <FileText className="h-12 w-12 text-gold flex-shrink-0" />
              <div>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-2">
                  Custom <span className="text-gold">Reports</span>
                </h1>
                <p className="text-primary-foreground/70 text-lg">
                  View and export data on businesses, reviews, and favorites
                </p>
              </div>
            </div>
          }
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        <ScrollFadeIn>
          <GlassCard glow className="p-6 md:p-8 depth-shadow print:!bg-white print:!shadow-none print:!border-gray-200">
            {/* Customization controls - hidden when printing */}
            <div className="mb-8 p-5 rounded-xl border border-border bg-muted/30 print:hidden">
              <h2 className="font-display font-bold text-foreground text-lg mb-4">Report options</h2>
              <div className="flex flex-wrap gap-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Include sections</p>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={sections.businesses}
                        onCheckedChange={() => toggleSection('businesses')}
                      />
                      <span className="text-sm">Businesses ({filteredBusinesses.length})</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={sections.reviews}
                        onCheckedChange={() => toggleSection('reviews')}
                      />
                      <span className="text-sm">Reviews ({filteredReviews.length})</span>
                    </label>
                    {user && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={sections.favorites}
                          onCheckedChange={() => toggleSection('favorites')}
                        />
                        <span className="text-sm">Favorites ({favoriteBusinesses.length})</span>
                      </label>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Business filters</p>
                  <div className="flex flex-col gap-2">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value="">All categories</option>
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value="">Min rating (all)</option>
                      <option value="1">1+ stars</option>
                      <option value="2">2+ stars</option>
                      <option value="3">3+ stars</option>
                      <option value="4">4+ stars</option>
                      <option value="5">5 stars only</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value="name">Sort by name</option>
                      <option value="rating">Sort by rating</option>
                      <option value="reviews">Sort by review count</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Review filters & date range</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm w-full"
                        placeholder="From"
                      />
                      <span className="text-muted-foreground text-sm">to</span>
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-border bg-background text-sm w-full"
                        placeholder="To"
                      />
                    </div>
                    <select
                      value={minReviewRating}
                      onChange={(e) => setMinReviewRating(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value="">Min review rating (all)</option>
                      <option value="1">1+ stars</option>
                      <option value="2">2+ stars</option>
                      <option value="3">3+ stars</option>
                      <option value="4">4+ stars</option>
                      <option value="5">5 stars only</option>
                    </select>
                    <select
                      value={reviewSort}
                      onChange={(e) => setReviewSort(e.target.value as typeof reviewSort)}
                      className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                    >
                      <option value="date-desc">Sort: newest first</option>
                      <option value="date-asc">Sort: oldest first</option>
                      <option value="rating-desc">Sort: highest rating</option>
                      <option value="rating-asc">Sort: lowest rating</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-end gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    onClick={refreshData}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </Button>
                  <Button
                    variant="default"
                    onClick={exportCsv}
                    disabled={!hasAnySection}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </div>

            {/* Report preview */}
            {!hasAnySection && (
              <p className="text-muted-foreground py-8 text-center">Select at least one section to view or export.</p>
            )}
            {hasAnySection && (
              <div className="space-y-8 print:space-y-6">
                {sections.businesses && (
                  <section>
                    <h3 className="font-display font-bold text-foreground text-lg mb-4">Businesses</h3>
                    <div className="max-h-64 overflow-auto rounded-lg border border-border print:max-h-none print:overflow-visible print:border-0">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 z-10 bg-muted">
                          <tr>
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Category</th>
                            <th className="text-left p-3">Rating</th>
                            <th className="text-left p-3">Reviews</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBusinesses.slice(0, 50).map((b) => (
                            <tr key={b.id} className="border-t border-border hover:bg-muted/30">
                              <td className="p-3 font-medium">{b.name}</td>
                              <td className="p-3 text-muted-foreground">{b.category}</td>
                              <td className="p-3">★ {b.rating}</td>
                              <td className="p-3">{b.reviewCount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredBusinesses.length > 50 && (
                        <p className="text-xs text-muted-foreground p-3 border-t border-border print:hidden">
                          Showing 50 of {filteredBusinesses.length}.
                        </p>
                      )}
                    </div>
                  </section>
                )}
                {sections.reviews && (
                  <section>
                    <h3 className="font-display font-bold text-foreground text-lg mb-4">Reviews</h3>
                    <div className="max-h-64 overflow-auto rounded-lg border border-border print:max-h-none print:overflow-visible print:border-0">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 z-10 bg-muted">
                          <tr>
                            <th className="text-left p-3">Author</th>
                            <th className="text-left p-3">Rating</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-left p-3">Review</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReviews.slice(0, 30).map((r) => (
                            <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                              <td className="p-3 font-medium">{r.author}</td>
                              <td className="p-3">★ {r.rating}</td>
                              <td className="p-3 text-muted-foreground">{r.date}</td>
                              <td className="p-3 text-muted-foreground line-clamp-1 max-w-xs print:line-clamp-none print:max-w-none print:whitespace-normal">{r.text}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredReviews.length > 30 && (
                        <p className="text-xs text-muted-foreground p-3 border-t border-border print:hidden">
                          Showing 30 of {filteredReviews.length}.
                        </p>
                      )}
                    </div>
                  </section>
                )}
                {sections.favorites && user && (
                  <section>
                    <h3 className="font-display font-bold text-foreground text-lg mb-4">Favorites</h3>
                    <div className="rounded-lg border border-border overflow-hidden print:border-0">
                      {favoriteBusinesses.length === 0 ? (
                        <p className="p-6 text-muted-foreground text-center">No favorites saved yet.</p>
                      ) : (
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-3">Name</th>
                              <th className="text-left p-3">Category</th>
                              <th className="text-left p-3">Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            {favoriteBusinesses.map((b) => (
                              <tr key={b.id} className="border-t border-border hover:bg-muted/30">
                                <td className="p-3 font-medium">{b.name}</td>
                                <td className="p-3 text-muted-foreground">{b.category}</td>
                                <td className="p-3">★ {b.rating}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </section>
                )}
              </div>
            )}
          </GlassCard>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default Reports;
