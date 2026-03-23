/**
 * TSA Webmaster Reference Page.
 * Contains: Required TSA Documents, Framework Statement, and Open-Source Library Attributions.
 */

import { PageHeader } from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import { ScrollFadeIn } from '@/components/ScrollAnimations';
import { ExternalLink } from 'lucide-react';

interface LibEntry { name: string; version?: string; purpose: string; license: string; url: string; }
const libraries: LibEntry[] = [
  { name: 'React',                version: '18.3.1',  purpose: 'Core UI framework',                              license: 'MIT',          url: 'https://react.dev' },
  { name: 'TypeScript',           version: '5.8.3',   purpose: 'Static type system',                             license: 'Apache 2.0',   url: 'https://www.typescriptlang.org' },
  { name: 'Vite',                 version: '5.4.19',  purpose: 'Build tool & dev server',                        license: 'MIT',          url: 'https://vitejs.dev' },
  { name: 'React Router DOM',     version: '6.30.1',  purpose: 'Client-side routing',                            license: 'MIT',          url: 'https://reactrouter.com' },
  { name: 'Tailwind CSS',         version: '3.4.17',  purpose: 'Utility-first CSS styling',                      license: 'MIT',          url: 'https://tailwindcss.com' },
  { name: 'Framer Motion',        version: '11.18.2', purpose: 'Animations & page transitions',                  license: 'MIT',          url: 'https://www.framer.com/motion' },
  { name: 'Shadcn/UI',            purpose: 'Accessible headless UI components',                                   license: 'MIT',          url: 'https://ui.shadcn.com' },
  { name: 'Radix UI',             purpose: 'Unstyled accessible UI primitives',                                   license: 'MIT',          url: 'https://www.radix-ui.com' },
  { name: 'Lucide React',         version: '0.462.0', purpose: 'Icon set',                                       license: 'ISC',          url: 'https://lucide.dev' },
  { name: 'sql.js',               version: '1.14.0',  purpose: 'SQLite compiled to WebAssembly (review storage)', license: 'MIT',         url: 'https://sql.js.org' },
  { name: 'Zod',                  version: '3.25.76', purpose: 'Schema-based form validation',                   license: 'MIT',          url: 'https://zod.dev' },
  { name: 'React Hook Form',      version: '7.61.1',  purpose: 'Form state management',                          license: 'MIT',          url: 'https://react-hook-form.com' },
  { name: 'Leaflet',              version: '1.9.4',   purpose: 'Interactive map library',                        license: 'BSD 2-Clause', url: 'https://leafletjs.com' },
  { name: 'react-leaflet',        version: '4.2.1',   purpose: 'React bindings for Leaflet',                     license: 'Hippocratic',  url: 'https://react-leaflet.js.org' },
  { name: '@react-three/fiber',   version: '8.18.0',  purpose: '3D morph background (Three.js renderer)',        license: 'MIT',          url: 'https://docs.pmnd.rs/react-three-fiber' },
  { name: 'react-google-recaptcha', version: '3.1.0', purpose: 'Google reCAPTCHA v2 bot prevention',             license: 'MIT',          url: 'https://github.com/dozoisch/react-google-recaptcha' },
  { name: 'TanStack Query',       version: '5.83.0',  purpose: 'Async state management',                         license: 'MIT',          url: 'https://tanstack.com/query' },
  { name: 'date-fns',             version: '3.6.0',   purpose: 'Date formatting utilities',                      license: 'MIT',          url: 'https://date-fns.org' },
];

const References = () => (
  <div className="pt-14 pb-16 bg-background min-h-screen">
    <PageHeader
      image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=600&fit=crop"
      children={
        <div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-3">
            Reference <span className="text-gold">Page</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            TSA Webmaster — Plan of Work, Copyright Checklist &amp; Citations
          </p>
        </div>
      }
    />

    <div className="max-w-4xl mx-auto px-6 mt-10 space-y-10">

      {/* ── REQUIRED PDF DOWNLOADS ── */}
      <ScrollFadeIn>
        <GlassCard className="p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Required TSA Documents</h2>
          <p className="text-sm text-muted-foreground mb-5">The following documents are required by the TSA Webmaster event guidelines and are available as PDF downloads.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/Webmaster Work Log.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm hover:bg-navy-light transition-colors depth-shadow"
            >
              <ExternalLink className="w-4 h-4" />
              View Work Log (PDF)
            </a>
            <a
              href="/Webmaster Copyright Checklist.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border border-border px-5 py-3 rounded-xl font-semibold text-sm text-foreground hover:bg-muted transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Copyright Checklist (PDF)
            </a>
          </div>
        </GlassCard>
      </ScrollFadeIn>

      {/* ── FRAMEWORK STATEMENT ── */}
      <ScrollFadeIn>
        <GlassCard className="p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Framework Statement</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This website was built using <strong className="text-foreground">React 18 + Vite + TypeScript</strong> as the core framework.
            All components, pages, layouts, styling (Tailwind CSS), and logic were designed and written entirely by the team —
            <strong className="text-foreground"> no pre-built templates or themes were used</strong>. The UI component library (Shadcn/UI)
            provides unstyled accessible primitives that were fully customized with our own design system (navy/gold color palette,
            glassmorphism cards, typography, animations). No content management system (CMS) such as WordPress, Joomla, or Drupal was used.
          </p>
        </GlassCard>
      </ScrollFadeIn>

      {/* ── OPEN SOURCE LIBRARIES ── */}
      <ScrollFadeIn>
        <GlassCard glow className="p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-5">Open-Source Libraries &amp; Frameworks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">Library</th>
                  <th className="pb-2 pr-4 font-semibold text-foreground hidden sm:table-cell">Version</th>
                  <th className="pb-2 pr-4 font-semibold text-foreground">Purpose</th>
                  <th className="pb-2 font-semibold text-foreground hidden md:table-cell">License</th>
                </tr>
              </thead>
              <tbody>
                {libraries.map(l => (
                  <tr key={l.name} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-2.5 pr-4">
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium inline-flex items-center gap-1">
                        {l.name}<ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground hidden sm:table-cell">{l.version ?? '—'}</td>
                    <td className="py-2.5 pr-4 text-foreground/80">{l.purpose}</td>
                    <td className="py-2.5 text-muted-foreground hidden md:table-cell">{l.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <p className="text-center text-xs text-muted-foreground pb-4">
          All trademarks and registered trademarks are property of their respective owners.
          This project is submitted for educational purposes as part of the TSA 2025–2026 Webmaster competition.
        </p>
      </ScrollFadeIn>

    </div>
  </div>
);

export default References;
