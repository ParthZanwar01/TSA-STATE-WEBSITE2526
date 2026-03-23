/**
 * References & Attributions page.
 * Documents all libraries, images, fonts, and copyrighted material used
 * in Cypress LocalLink, as required by the FBLA Coding & Programming rubric.
 */

import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import { ScrollFadeIn, StaggerChildren, StaggerItem } from '@/components/ScrollAnimations';
import { ExternalLink, CheckCircle2, BookOpen, Code2, Lightbulb } from 'lucide-react';

interface RefEntry {
  name: string;
  version?: string;
  purpose: string;
  license: string;
  url: string;
}

const frameworks: RefEntry[] = [
  { name: 'React', version: '18.3.1', purpose: 'Core UI framework', license: 'MIT', url: 'https://react.dev' },
  { name: 'TypeScript', version: '5.8.3', purpose: 'Static type system', license: 'Apache 2.0', url: 'https://www.typescriptlang.org' },
  { name: 'Vite', version: '5.4.19', purpose: 'Build tool & dev server', license: 'MIT', url: 'https://vitejs.dev' },
  { name: 'React Router DOM', version: '6.30.1', purpose: 'Client-side routing', license: 'MIT', url: 'https://reactrouter.com' },
  { name: 'TanStack Query', version: '5.83.0', purpose: 'Async state management', license: 'MIT', url: 'https://tanstack.com/query' },
];

const ui: RefEntry[] = [
  { name: 'Tailwind CSS', version: '3.4.17', purpose: 'Utility-first CSS styling', license: 'MIT', url: 'https://tailwindcss.com' },
  { name: 'Framer Motion', version: '11.18.2', purpose: 'Animations & page transitions', license: 'MIT', url: 'https://www.framer.com/motion' },
  { name: 'Shadcn/UI', purpose: 'Accessible headless UI component library', license: 'MIT', url: 'https://ui.shadcn.com' },
  { name: 'Radix UI', purpose: 'Unstyled accessible UI primitives (used by Shadcn)', license: 'MIT', url: 'https://www.radix-ui.com' },
  { name: 'Lucide React', version: '0.462.0', purpose: 'Icon set', license: 'ISC', url: 'https://lucide.dev' },
  { name: 'Sonner', version: '1.7.4', purpose: 'Toast notifications', license: 'MIT', url: 'https://sonner.emilkowal.ski' },
  { name: 'next-themes', version: '0.3.0', purpose: 'Dark / light theme management', license: 'MIT', url: 'https://github.com/pacocoursey/next-themes' },
  { name: 'Recharts', version: '2.15.4', purpose: 'Charts in Reports page', license: 'MIT', url: 'https://recharts.org' },
  { name: 'Embla Carousel', version: '8.6.0', purpose: 'Carousel / slider component', license: 'MIT', url: 'https://www.embla-carousel.com' },
  { name: 'Vaul', version: '0.9.9', purpose: 'Drawer component', license: 'MIT', url: 'https://vaul.emilkowal.ski' },
];

const data: RefEntry[] = [
  { name: 'sql.js', version: '1.14.0', purpose: 'SQLite compiled to WebAssembly — used for client-side review persistence', license: 'MIT', url: 'https://sql.js.org' },
  { name: 'Zod', version: '3.25.76', purpose: 'Schema-based form validation', license: 'MIT', url: 'https://zod.dev' },
  { name: 'React Hook Form', version: '7.61.1', purpose: 'Form state management', license: 'MIT', url: 'https://react-hook-form.com' },
  { name: '@hookform/resolvers', version: '3.10.0', purpose: 'Zod adapter for React Hook Form', license: 'MIT', url: 'https://github.com/react-hook-form/resolvers' },
  { name: 'date-fns', version: '3.6.0', purpose: 'Date formatting utilities', license: 'MIT', url: 'https://date-fns.org' },
];

const mapping: RefEntry[] = [
  { name: 'Leaflet', version: '1.9.4', purpose: 'Interactive map library', license: 'BSD 2-Clause', url: 'https://leafletjs.com' },
  { name: 'react-leaflet', version: '4.2.1', purpose: 'React bindings for Leaflet', license: 'Hippocratic 3.0', url: 'https://react-leaflet.js.org' },
  { name: 'OpenStreetMap', purpose: 'Map tile data — © OpenStreetMap contributors', license: 'ODbL', url: 'https://www.openstreetmap.org/copyright' },
];

const threeD: RefEntry[] = [
  { name: '@react-three/fiber', version: '8.18.0', purpose: 'React renderer for Three.js — powers the 3D morph blob background', license: 'MIT', url: 'https://docs.pmnd.rs/react-three-fiber' },
  { name: '@react-three/drei', version: '9.122.0', purpose: 'Helper components for react-three-fiber', license: 'MIT', url: 'https://github.com/pmndrs/drei' },
  { name: 'Three.js', version: '0.160.x', purpose: '3D graphics library', license: 'MIT', url: 'https://threejs.org' },
];

const security: RefEntry[] = [
  { name: 'react-google-recaptcha', version: '3.1.0', purpose: 'Google reCAPTCHA v2 widget — bot prevention on Submit Business and Login forms', license: 'MIT', url: 'https://github.com/dozoisch/react-google-recaptcha' },
  { name: 'Google reCAPTCHA', purpose: 'Bot-detection service by Google LLC', license: 'Google Terms of Service', url: 'https://developers.google.com/recaptcha' },
];

const media = [
  {
    name: 'Unsplash',
    description: 'All photography used for business listings, page headers, and the home page hero image.',
    license: 'Unsplash License (free to use, no attribution required)',
    url: 'https://unsplash.com/license',
    notable: [
      'Business listing photos — various Unsplash photographers',
      'Restaurant & café imagery',
      'Retail & storefront photography',
    ],
  },
];

const Section = ({ title, entries }: { title: string; entries: RefEntry[] }) => (
  <ScrollFadeIn>
    <GlassCard glow className="p-6 md:p-8">
      <h2 className="font-display text-xl font-bold text-foreground mb-5">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-semibold text-foreground">Name</th>
              <th className="pb-2 pr-4 font-semibold text-foreground hidden sm:table-cell">Version</th>
              <th className="pb-2 pr-4 font-semibold text-foreground">Purpose</th>
              <th className="pb-2 font-semibold text-foreground hidden md:table-cell">License</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.name} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="py-3 pr-4">
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline font-medium inline-flex items-center gap-1"
                  >
                    {e.name}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </td>
                <td className="py-3 pr-4 text-muted-foreground hidden sm:table-cell">{e.version ?? '—'}</td>
                <td className="py-3 pr-4 text-foreground/80">{e.purpose}</td>
                <td className="py-3 text-muted-foreground hidden md:table-cell">{e.license}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  </ScrollFadeIn>
);

const References = () => (
  <div className="pt-14 pb-16 bg-background min-h-screen">
    <PageHeader
      image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=600&fit=crop"
      children={
        <div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3">
            References &amp; <span className="text-gold">Attributions</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            All libraries, tools, and media used in Cypress LocalLink
          </p>
        </div>
      }
    />

    <div className="max-w-4xl mx-auto px-6 mt-10 space-y-8">

      {/* ── PROGRAM DOCUMENTATION ── */}

      {/* How the program addresses the topic */}
      <ScrollFadeIn>
        <GlassCard glow className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <Lightbulb className="w-6 h-6 text-gold flex-shrink-0" aria-hidden />
            <h2 className="font-display text-xl font-bold text-foreground">How This Program Addresses the Topic</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-5">
            The 2025–2026 FBLA Coding &amp; Programming topic is <strong className="text-foreground">Byte-Sized Business Boost</strong> — build
            a tool that helps users discover and support small, local businesses in their community.
            Cypress LocalLink addresses every required feature:
          </p>
          <ul className="space-y-4">
            {[
              {
                feature: 'Sort businesses by category',
                how: 'The Directory page provides one-click category filter buttons (Restaurant, Retail, Health & Fitness, Beauty & Spa, Automotive, Services, Non-Profit, Entertainment, and more). Clicking any category instantly filters the 92 listed businesses.',
                where: '/directory',
                label: 'Go to Directory',
              },
              {
                feature: 'Allow users to leave reviews or ratings',
                how: 'On any Business Detail page, signed-in users see a "Leave a Review" button that opens an inline star-rating selector (1–5 stars) and text area. Reviews are saved to a local SQLite database (via sql.js / IndexedDB) and immediately appear in the review list.',
                where: '/directory',
                label: 'Browse businesses',
              },
              {
                feature: 'Sort businesses by reviews or ratings',
                how: 'The Directory page Sort dropdown offers "Highest Rating" and "Most Reviews" options. Selecting either re-orders all visible businesses in real time.',
                where: '/directory',
                label: 'Go to Directory',
              },
              {
                feature: 'Save / bookmark favorite businesses',
                how: 'Every business card and detail page shows a heart icon. Clicking it bookmarks the business (stored in localStorage). All saved businesses are collected on the My Favorites page.',
                where: '/favorites',
                label: 'View Favorites',
              },
              {
                feature: 'Display special deals or coupons',
                how: 'The home page features a "Deals & Coupons" section showing active promotions from local businesses. The Events page also surfaces time-limited offers alongside community events.',
                where: '/',
                label: 'View Deals on Home',
              },
              {
                feature: 'Verification step to prevent bot activity',
                how: 'Google reCAPTCHA v2 is embedded in both the Submit Business form and the Login / Sign-Up form. A valid CAPTCHA token is required before either form can be submitted, blocking automated bot submissions.',
                where: '/submit',
                label: 'View Submit Form',
              },
            ].map(({ feature, how, where, label }) => (
              <li key={feature} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden />
                <div>
                  <strong className="text-foreground">{feature}</strong>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{how}</p>
                  <Link to={where} className="text-xs text-gold hover:underline mt-1 inline-block">{label} →</Link>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>
      </ScrollFadeIn>

      {/* How to use the program */}
      <ScrollFadeIn>
        <GlassCard glow className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <BookOpen className="w-6 h-6 text-gold flex-shrink-0" aria-hidden />
            <h2 className="font-display text-xl font-bold text-foreground">How to Use Cypress LocalLink</h2>
          </div>
          <ol className="space-y-4 list-none">
            {[
              { step: '1', title: 'Browse the Directory', desc: 'Navigate to the Directory page. Use the category buttons to filter by business type, or type in the search bar to find a specific business by name, description, or address. Use the Sort dropdown to order by name, rating, or number of reviews.' },
              { step: '2', title: 'View a Business', desc: 'Click any business card (or tap the "Details" button on the flip side) to open its detail page. Here you can see photos, hours, location, deals, and community reviews.' },
              { step: '3', title: 'Leave a Review', desc: 'Create an account or sign in (demo@locallink.com / demo123). On any Business Detail page, click "Leave a Review," select a star rating, write your comment (minimum 10 characters), and submit.' },
              { step: '4', title: 'Save Favorites', desc: 'Click the heart icon on any business card or detail page to bookmark it. Visit My Favorites from the navbar to see all your saved businesses.' },
              { step: '5', title: 'Explore the Map', desc: 'The Map page shows all businesses plotted on an interactive OpenStreetMap. Click any pin to see business info and link to its detail page.' },
              { step: '6', title: 'View Deals & Events', desc: 'The home page Deals section and the Events page list active promotions and community events. Toggle between calendar and list view on the Events page.' },
              { step: '7', title: 'Generate Reports', desc: 'The Reports page lets you filter businesses by category, minimum rating, and sort order, then export the results as a CSV file for data analysis.' },
              { step: '8', title: 'Submit Your Business', desc: 'Business owners can add their listing via the Submit page. Complete the form (name, category, address, description, contact info) and pass the reCAPTCHA verification to submit.' },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex gap-4">
                <span className="w-7 h-7 rounded-full bg-gold/20 text-gold font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{step}</span>
                <div>
                  <strong className="text-foreground">{title}</strong>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </GlassCard>
      </ScrollFadeIn>

      {/* Language selection rationale */}
      <ScrollFadeIn>
        <GlassCard glow className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <Code2 className="w-6 h-6 text-gold flex-shrink-0" aria-hidden />
            <h2 className="font-display text-xl font-bold text-foreground">Language &amp; Technology Selection</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <div>
              <strong className="text-foreground">TypeScript (superset of JavaScript)</strong>
              <p className="mt-1">TypeScript was chosen over plain JavaScript because its static type system catches errors at compile time rather than runtime. For a data-driven app with complex business objects, review schemas, and filter logic, strict typing via Zod inference ensures that data models and validation stay in sync throughout the entire codebase — eliminating a major class of bugs before the program ever runs.</p>
            </div>
            <div>
              <strong className="text-foreground">React 18 + Vite</strong>
              <p className="mt-1">React's component model enables a modular, reusable architecture — each page, card, and form is an isolated unit that can be developed, tested, and maintained independently. This directly satisfies the rubric's modularity requirement. Vite provides near-instant hot module replacement during development and an optimized production bundle. Together they represent the current industry standard for high-performance interactive web applications.</p>
            </div>
            <div>
              <strong className="text-foreground">sql.js (SQLite compiled to WebAssembly)</strong>
              <p className="mt-1">User reviews need to persist across page reloads without a backend server. sql.js provides a full relational SQLite database running in the browser via WebAssembly, stored in IndexedDB. This demonstrates advanced data structure usage (relational tables, indexed queries) while keeping the application fully standalone — a key rubric requirement.</p>
            </div>
            <div>
              <strong className="text-foreground">Tailwind CSS + Framer Motion</strong>
              <p className="mt-1">Tailwind enables rapid, consistent styling through utility classes without requiring separate CSS files. Framer Motion adds production-quality animations (page transitions, scroll reveals, interactive card effects) that enhance the user journey and demonstrate advanced UI knowledge beyond basic HTML/CSS.</p>
            </div>
          </div>
        </GlassCard>
      </ScrollFadeIn>

      {/* Divider */}
      <ScrollFadeIn>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground font-medium">Open-Source Attributions</span>
          <div className="flex-1 h-px bg-border" />
        </div>
      </ScrollFadeIn>

      {/* Intro */}
      <ScrollFadeIn>
        <GlassCard className="p-6 md:p-8">
          <p className="text-muted-foreground leading-relaxed">
            Cypress LocalLink is built entirely on open-source software. The following tables document
            every library, framework, media source, and third-party service used in the application,
            in compliance with the FBLA Coding &amp; Programming event guidelines which require
            documentation of all copyrighted or open-source material.
          </p>
        </GlassCard>
      </ScrollFadeIn>

      {/* Sections */}
      <Section title="Core Framework & Language" entries={frameworks} />
      <Section title="UI Components & Styling" entries={ui} />
      <Section title="Data, Forms & Validation" entries={data} />
      <Section title="Mapping" entries={mapping} />
      <Section title="3D Graphics (Morph Background)" entries={threeD} />
      <Section title="Security — Bot Prevention" entries={security} />

      {/* Media */}
      <ScrollFadeIn>
        <GlassCard glow className="p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-5">Photography & Media</h2>
          <StaggerChildren className="space-y-6">
            {media.map((m) => (
              <StaggerItem key={m.name}>
                <div className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      {m.name}
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{m.license}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{m.description}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {m.notable.map((n) => (
                      <li key={n} className="text-sm text-foreground/70">{n}</li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </GlassCard>
      </ScrollFadeIn>

      {/* Footer note */}
      <ScrollFadeIn>
        <p className="text-center text-sm text-muted-foreground pb-4">
          All trademarks and registered trademarks are property of their respective owners.
          This project is submitted for educational purposes as part of the FBLA 2025–2026
          Coding &amp; Programming competition.
        </p>
      </ScrollFadeIn>

    </div>
  </div>
);

export default References;
