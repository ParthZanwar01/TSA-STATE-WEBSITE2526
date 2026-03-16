/**
 * Accessibility statement for Cypress LocalLink.
 * Documents ARIA labels, high-contrast mode, keyboard navigation, and design rationale.
 */

import { PageHeader } from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import { ScrollFadeIn } from '@/components/ScrollAnimations';
import { CheckCircle2 } from 'lucide-react';

const Accessibility = () => {
  return (
    <div className="pt-14 pb-16 bg-background min-h-screen">
      <PageHeader
        image="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1920&h=600&fit=crop"
        children={
          <div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3">
              Accessibility <span className="text-gold">Statement</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Our commitment to inclusive design and usability for all users
            </p>
          </div>
        }
      />

      <div className="max-w-3xl mx-auto px-6 mt-10 space-y-8">
        <ScrollFadeIn>
          <GlassCard glow className="p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Design Rationale</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cypress LocalLink is designed with accessibility in mind. Our user journey starts with a
              search and discovery hub—users land on a homepage that surfaces featured businesses,
              deals, and events—then drill down into categories, individual businesses, or the map.
              Navigation is consistent across all pages, with clear labels and logical flow.
            </p>
          </GlassCard>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <GlassCard glow className="p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Accessibility Features</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" aria-hidden />
                <div>
                  <strong className="text-foreground">ARIA labels & landmarks</strong>
                  <p className="text-muted-foreground text-sm mt-1">
                    Navigation, main content, and interactive elements use proper ARIA attributes
                    (aria-label, aria-describedby, role) so screen readers can interpret structure
                    and purpose.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" aria-hidden />
                <div>
                  <strong className="text-foreground">High-contrast mode</strong>
                  <p className="text-muted-foreground text-sm mt-1">
                    A high-contrast theme toggle increases contrast between text and backgrounds for
                    users with low vision. Accessible via the navigation bar or footer.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" aria-hidden />
                <div>
                  <strong className="text-foreground">Skip-to-content link</strong>
                  <p className="text-muted-foreground text-sm mt-1">
                    Keyboard users can skip the navigation and jump directly to the main content on
                    each page.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" aria-hidden />
                <div>
                  <strong className="text-foreground">Keyboard navigation</strong>
                  <p className="text-muted-foreground text-sm mt-1">
                    All interactive elements—links, buttons, forms, filters—are focusable and operable
                    via keyboard. Focus states are visually indicated.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" aria-hidden />
                <div>
                  <strong className="text-foreground">Semantic HTML</strong>
                  <p className="text-muted-foreground text-sm mt-1">
                    Headings, landmarks (nav, main, footer), and form labels follow semantic structure
                    for assistive technologies.
                  </p>
                </div>
              </li>
            </ul>
          </GlassCard>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <GlassCard glow className="p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Feedback</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to improving accessibility. If you encounter barriers or have
              suggestions, please contact us at support@locallink.com.
            </p>
          </GlassCard>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default Accessibility;
