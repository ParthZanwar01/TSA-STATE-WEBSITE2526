/**
 * References & Attributions page.
 * Documents all libraries, images, fonts, and copyrighted material used
 * in Cypress LocalLink, as required by the FBLA Coding & Programming rubric.
 */

import { PageHeader } from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import { ScrollFadeIn, StaggerChildren, StaggerItem } from '@/components/ScrollAnimations';
import { ExternalLink } from 'lucide-react';

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

      {/* Intro */}
      <ScrollFadeIn>
        <GlassCard className="p-6 md:p-8">
          <p className="text-muted-foreground leading-relaxed">
            Cypress LocalLink is built entirely on open-source software. The following pages document
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
