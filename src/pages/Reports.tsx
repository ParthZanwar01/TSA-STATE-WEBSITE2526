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
import { FileText, Download, RefreshCw } from 'lucide-react';
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

  const toggleSection = (key: ReportSection) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredBusinesses = useMemo(() => {
    let list = allBusinesses;
    if (category) list = list.filter((b) => b.category === category);
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'reviews') list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [allBusinesses, category, sortBy]);

  const [reviewsKey, setReviewsKey] = useState(0);
  const reviews = useMemo(() => getAllReviews(), [reviewsKey]);

  const refreshData = () => setReviewsKey((k) => k + 1);

  const favoriteBusinesses = useMemo(
    () => allBusinesses.filter((b) => favorites.includes(b.id)),
    [allBusinesses, favorites]
  );

  const exportCSV = () => {
    const lines: string[] = [];

    if (sections.businesses) {
      lines.push('BUSINESSES');
      lines.push('Name,Category,Address,Rating,Reviews,Price Range');
      filteredBusinesses.forEach((b) => {
        lines.push(`"${b.name}","${b.category}","${b.address}",${b.rating},${b.reviewCount},"${b.priceRange}"`);
      });
      lines.push('');
    }

    if (sections.reviews) {
      lines.push('REVIEWS');
      lines.push('Business ID,Author,Rating,Date,Text');
      reviews.forEach((r) => {
        const safe = (s: string) => `"${(s || '').replace(/"/g, '""')}"`;
        lines.push(`${r.businessId},${safe(r.author)},${r.rating},${r.date},${safe(r.text)}`);
      });
      lines.push('');
    }

    if (sections.favorites && user) {
      lines.push('FAVORITES');
      lines.push('Business ID,Name,Category');
      favoriteBusinesses.forEach((b) => {
        lines.push(`"${b.id}","${b.name}","${b.category}"`);
      });
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cypress-locallink-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasAnySection = sections.businesses || sections.reviews || (sections.favorites && user);

  return (
    <div className="pt-20 pb-16 bg-background min-h-screen print:pt-0 print:pb-0">
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
                      <span className="text-sm">Reviews ({reviews.length})</span>
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
                    variant="outline"
                    onClick={exportCSV}
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
                        <thead className="bg-muted/50 sticky top-0">
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
                          Showing 50 of {filteredBusinesses.length}. Export CSV for full list.
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
                        <thead className="bg-muted/50 sticky top-0">
                          <tr>
                            <th className="text-left p-3">Author</th>
                            <th className="text-left p-3">Rating</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-left p-3">Review</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews.slice(0, 30).map((r) => (
                            <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                              <td className="p-3 font-medium">{r.author}</td>
                              <td className="p-3">★ {r.rating}</td>
                              <td className="p-3 text-muted-foreground">{r.date}</td>
                              <td className="p-3 text-muted-foreground line-clamp-1 max-w-xs print:line-clamp-none print:max-w-none print:whitespace-normal">{r.text}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {reviews.length > 30 && (
                        <p className="text-xs text-muted-foreground p-3 border-t border-border print:hidden">
                          Showing 30 of {reviews.length}. Export CSV for full list.
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
