/**
 * TSA Webmaster Reference Page.
 * Contains: Plan of Work, Student Copyright Checklist,
 * References & Image Citations, and Open-Source Library Attributions.
 */

import { PageHeader } from '@/components/PageHeader';
import GlassCard from '@/components/GlassCard';
import { ScrollFadeIn } from '@/components/ScrollAnimations';
import { CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

/* ── WORK LOG DATA ─────────────────────────────────────── */
const workLog = [
  { date: '12/10/2025', task: 'Design a wireframe for the website',            time: '5 Hours',  members: 'S.C, A.D, P.Z', comments: 'Initial layout and UI/UX flow established.' },
  { date: '12/15/2025', task: 'Research and select color palette & assets',    time: '3 Hours',  members: 'S.C, A.D, P.Z', comments: 'Ensured all images used are copyright-free or CC.' },
  { date: '01/05/2026', task: 'Set up HTML structure and CSS grid',             time: '8 Hours',  members: 'S.C, A.D, P.Z', comments: 'Built the responsive framework for the homepage.' },
  { date: '01/20/2026', task: 'Implement navigation and sub-pages',             time: '5 Hours',  members: 'S.C, A.D, P.Z', comments: 'Linked all internal pages and tested navigation menus.' },
  { date: '02/02/2026', task: 'Browser compatibility & accessibility testing',  time: '1 Hour',   members: 'S.C, A.D, P.Z', comments: 'Verified site works on Chrome, Safari, and mobile.' },
  { date: '02/05/2026', task: 'Final audit of Plan of Work & citations',        time: '1 Hour',   members: 'S.C, A.D, P.Z', comments: 'Finalized the LEAP requirements and site bibliography.' },
];

/* ── IMAGE CITATION DATA ────────────────────────────────── */
const mapAssets = [
  { name: 'Leaflet JavaScript Library',    credit: 'Leaflet contributors.',       url: 'https://leafletjs.com',                                              license: 'BSD 2-Clause' },
  { name: 'OpenStreetMap Tiles & Data',    credit: 'OpenStreetMap contributors.', url: 'https://www.openstreetmap.org',                                      license: 'ODbL' },
  { name: 'Leaflet Marker Icon',           credit: 'Leaflet v1.9.4.',             url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',        license: 'BSD 2-Clause' },
  { name: 'Leaflet Marker Icon 2x',        credit: 'Leaflet v1.9.4.',             url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',     license: 'BSD 2-Clause' },
  { name: 'Leaflet Marker Shadow',         credit: 'Leaflet v1.9.4.',             url: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',      license: 'BSD 2-Clause' },
];

const businessImages = [
  { file: 'business-hardware-store.jpg',   url: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a' },
  { file: 'business-mexican-vibrant.jpg',  url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47' },
  { file: 'business-pool-indoor.jpg',      url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7' },
  { file: 'business-artisan-crafts.jpg',   url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261' },
  { file: 'business-bbq-spread.jpg',       url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd' },
  { file: 'business-salon-modern.jpg',     url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035' },
  { file: 'business-dental-friendly.jpg',  url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09' },
  { file: 'business-burger-gourmet.jpg',   url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' },
  { file: 'business-chiropractic-room.jpg',url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1' },
  { file: 'business-car-restoration.jpg',  url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc' },
  { file: 'business-gym-modern.jpg',       url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48' },
  { file: 'business-yoga-studio.jpg',      url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597' },
  { file: 'business-coffee-shop.jpg',      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb' },
  { file: 'business-pizza-authentic.jpg',  url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002' },
  { file: 'business-sushi-platter.jpg',    url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c' },
  { file: 'business-steakhouse-premium.jpg',url:'https://images.unsplash.com/photo-1600891964092-4316c288032e' },
  { file: 'business-spa-luxury.jpg',       url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874' },
  { file: 'business-bookstore-cozy.jpg',   url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66' },
  { file: 'business-pet-grooming-pro.jpg', url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7' },
  { file: 'business-landscaping-pro.jpg',  url: 'https://images.unsplash.com/photo-1558904541-efa843a96f01' },
];

const additionalImages = [
  { file: 'business-brunch-patio.jpg',    url: 'https://unsplash.com/photos/VIzZEKOBwQU' },
  { file: 'business-artisan-pizza.jpg',   url: 'https://unsplash.com/photos/8qDTh2VuY2E' },
  { file: 'business-coffee-barista.jpg',  url: 'https://unsplash.com/photos/i_14ssnvvG8'  },
  { file: 'business-crossfit-action.jpg', url: 'https://unsplash.com/photos/CFHR72opVe0'  },
  { file: 'business-barbershop.jpg',      url: 'https://unsplash.com/photos/KiksfXfT5k0'  },
  { file: 'business-spa-candles.jpg',     url: 'https://unsplash.com/photos/fRhI-lZr-3o'  },
  { file: 'business-accounting-pro.jpg',  url: 'https://unsplash.com/photos/nfTA8pdaq9A'  },
  { file: 'business-plant-nursery.jpg',   url: 'https://unsplash.com/photos/LWzoJS50s0o'  },
  { file: 'business-garden-center.jpg',   url: 'https://unsplash.com/photos/AbNOsW8N-Po'  },
];

const boardwalkImages = [
  { file: 'boardwalk/category-dining.jpg',    url: 'https://unsplash.com/s/photos/restaurant-dining' },
  { file: 'boardwalk/category-waterfront.jpg',url: 'https://unsplash.com/photos/t-kaF_EptLE'         },
  { file: 'boardwalk/category-play.jpg',      url: 'https://unsplash.com/s/photos/playground'        },
  { file: 'boardwalk/category-nightlife.jpg', url: 'https://unsplash.com/s/photos/nightlife'         },
  { file: 'boardwalk/lifestyle-sunset.jpg',   url: 'https://unsplash.com/photos/ZzLzuZOtARU'         },
  { file: 'hero-cypress-main.jpg',            url: 'https://unsplash.com/photos/ZzLzuZOtARU'         },
  { file: 'gallery-community.jpg',            url: 'https://unsplash.com/s/photos/community-gathering'},
  { file: 'grid-pattern.png',                 url: 'https://unsplash.com'                            },
  { file: 'community-map-clean.png',          url: 'https://unsplash.com'                            },
];

/* ── OPEN SOURCE LIBS ───────────────────────────────────── */
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
  { name: 'sql.js',               version: '1.14.0',  purpose: 'SQLite compiled to WebAssembly (review storage)',license: 'MIT',          url: 'https://sql.js.org' },
  { name: 'Zod',                  version: '3.25.76', purpose: 'Schema-based form validation',                   license: 'MIT',          url: 'https://zod.dev' },
  { name: 'React Hook Form',      version: '7.61.1',  purpose: 'Form state management',                          license: 'MIT',          url: 'https://react-hook-form.com' },
  { name: 'Leaflet',              version: '1.9.4',   purpose: 'Interactive map library',                        license: 'BSD 2-Clause', url: 'https://leafletjs.com' },
  { name: 'react-leaflet',        version: '4.2.1',   purpose: 'React bindings for Leaflet',                     license: 'Hippocratic',  url: 'https://react-leaflet.js.org' },
  { name: '@react-three/fiber',   version: '8.18.0',  purpose: '3D morph background (Three.js renderer)',        license: 'MIT',          url: 'https://docs.pmnd.rs/react-three-fiber' },
  { name: 'react-google-recaptcha',version:'3.1.0',   purpose: 'Google reCAPTCHA v2 bot prevention',             license: 'MIT',          url: 'https://github.com/dozoisch/react-google-recaptcha' },
  { name: 'Recharts',             version: '2.15.4',  purpose: 'Charts in Reports page',                         license: 'MIT',          url: 'https://recharts.org' },
  { name: 'TanStack Query',       version: '5.83.0',  purpose: 'Async state management',                         license: 'MIT',          url: 'https://tanstack.com/query' },
  { name: 'date-fns',             version: '3.6.0',   purpose: 'Date formatting utilities',                      license: 'MIT',          url: 'https://date-fns.org' },
];

/* ── SMALL HELPERS ──────────────────────────────────────── */
const Pill = ({ yes }: { yes: boolean }) => (
  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${yes ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
    {yes ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
    {yes ? 'YES' : 'NO'}
  </span>
);

const ImageTable = ({ rows }: { rows: { file: string; url: string }[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-border text-left">
          <th className="pb-2 pr-4 font-semibold text-foreground">File</th>
          <th className="pb-2 font-semibold text-foreground">Source URL</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.file} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
            <td className="py-2 pr-4 font-mono text-muted-foreground">{r.file}</td>
            <td className="py-2">
              <a href={r.url} target="_blank" rel="noopener noreferrer"
                className="text-gold hover:underline inline-flex items-center gap-1 break-all">
                {r.url}<ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ── PAGE ───────────────────────────────────────────────── */
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

      {/* ── 1. PLAN OF WORK ── */}
      <ScrollFadeIn>
        <GlassCard glow className="p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-1">Technology Student Association — Plan of Work</h2>
          <p className="text-sm text-muted-foreground mb-6">Advisor signature: <span className="italic text-foreground">Juan Lopez</span></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground rounded-t-lg">
                  <th className="px-3 py-2.5 text-left font-semibold rounded-tl-lg">Date</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Task</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Time</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Team Members</th>
                  <th className="px-3 py-2.5 text-left font-semibold rounded-tr-lg">Comments</th>
                </tr>
              </thead>
              <tbody>
                {workLog.map((row, i) => (
                  <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-muted/30' : ''}`}>
                    <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{row.date}</td>
                    <td className="px-3 py-3 text-foreground">{row.task}</td>
                    <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{row.time}</td>
                    <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{row.members}</td>
                    <td className="px-3 py-3 text-foreground/80">{row.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </ScrollFadeIn>

      {/* ── 2. COPYRIGHT CHECKLIST ── */}
      <ScrollFadeIn>
        <GlassCard glow className="p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-1">Student Copyright Checklist</h2>
          <p className="text-xs text-muted-foreground mb-6 italic">For students to complete and advisors to verify</p>

          <div className="space-y-6">
            {/* Q1 */}
            <div className="border border-border/60 rounded-xl p-4">
              <p className="font-semibold text-foreground mb-2">
                1. Does your solution integrate any type of music and/or sound? <Pill yes={false} />
              </p>
              <p className="text-sm text-muted-foreground">No music or sound is used in this application. Proceeding to question 2.</p>
            </div>

            {/* Q2 */}
            <div className="border border-border/60 rounded-xl p-4 space-y-3">
              <p className="font-semibold text-foreground">
                2. Does your solution integrate any graphics/videos? <Pill yes={true} />
              </p>
              <p className="font-medium text-foreground text-sm">
                Are the graphics/videos copyrighted, registered and/or trademarked? <Pill yes={true} />
              </p>
              <div className="bg-muted/40 rounded-lg p-3 text-sm text-foreground/80">
                <strong>2B applied:</strong> All graphics are royalty-free (Unsplash License) or created from open-licensed assets. Full citations are provided in the References &amp; Image Citations section below. Written permission was obtained from Emily Heineman (Caldwell Companies) for Towne Lake and boardwalk photography. Permission emails are documented on this page.
              </div>
            </div>

            {/* Q3 */}
            <div className="border border-border/60 rounded-xl p-4">
              <p className="font-semibold text-foreground mb-2">
                3. Does your solution use another's thoughts or research? <Pill yes={false} />
              </p>
              <p className="text-sm text-muted-foreground">All written content is original. No external research or third-party text is incorporated.</p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border border-border/60 rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Student Initials</p>
                <p className="font-semibold text-foreground text-lg">S.C, P.Z, A.D</p>
              </div>
              <div className="border border-border/60 rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Chapter Advisor Signature</p>
                <p className="font-semibold text-foreground text-lg italic">Juan Lopez</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </ScrollFadeIn>

      {/* ── 3. PERMISSION DOCUMENTATION ── */}
      <ScrollFadeIn>
        <GlassCard glow className="p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Permission Documentation</h2>
          <p className="text-sm text-muted-foreground mb-5">Written permission obtained from Caldwell Companies for use of Towne Lake and boardwalk imagery.</p>
          <div className="space-y-4 text-sm">
            <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">Parth Zanwar → Emily Heineman</span>
                <span className="text-xs text-muted-foreground">Fri, Nov 14, 2025, 5:20 PM</span>
              </div>
              <p className="text-foreground/80 leading-relaxed">Hi! My name is Parth, and I hope you're doing well. My team and I are students at Cypress Ranch High School, and we're currently working on a school project. I was wondering if I could have permission to use a few of your images — they would be incredibly helpful in bringing our project to life. Thank you so much for your time, and please let me know if that would be alright! Best, Parth</p>
            </div>
            <div className="bg-gold/5 rounded-xl p-4 border border-gold/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">Emily Heineman (eheineman@caldwellcos.com) → Parth</span>
                <span className="text-xs text-muted-foreground">Nov 15, 2025, 12:37 PM</span>
              </div>
              <p className="text-foreground/80 leading-relaxed">"Hi - yes you can use Towne Lake pictures from our website. Thank you for checking!"</p>
              <p className="text-xs text-muted-foreground mt-1 italic">Sent from my iPhone</p>
            </div>
            <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">Parth Zanwar → Emily Heineman</span>
                <span className="text-xs text-muted-foreground">Nov 29, 2025, 7:21 PM</span>
              </div>
              <p className="text-foreground/80 leading-relaxed">Hi Emily, Thank you again for granting permission to use the Towne Lake pictures from your website. I was also wondering if we could use some of the pictures and videos from the boardwalk site for our project as well? Best, Parth</p>
            </div>
            <div className="bg-gold/5 rounded-xl p-4 border border-gold/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">Emily Heineman (eheineman@caldwellcos.com) → Parth</span>
                <span className="text-xs text-muted-foreground">Nov 30, 2025, 6:38 PM</span>
              </div>
              <p className="text-foreground/80 leading-relaxed">"Hi Parth, if they are on our website, you may use them. Thanks for asking. Emily"</p>
              <p className="text-xs text-muted-foreground mt-1 italic">Sent from my iPhone</p>
            </div>
          </div>
        </GlassCard>
      </ScrollFadeIn>

      {/* ── 4. IMAGE CITATIONS ── */}
      <ScrollFadeIn>
        <GlassCard glow className="p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">References and Image Citations</h2>
          <p className="text-sm text-muted-foreground mb-6">All images, icons, and map assets were sourced from royalty-free or openly licensed platforms. All assets are used strictly for educational purposes as part of a Technology Student Association Webmaster competition project. No commercial use is intended.</p>

          {/* Map assets */}
          <h3 className="font-semibold text-foreground mb-3">Map and Geospatial Assets</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">Asset</th>
                  <th className="pb-2 pr-4 font-semibold text-foreground">Credit</th>
                  <th className="pb-2 pr-4 font-semibold text-foreground hidden md:table-cell">License</th>
                  <th className="pb-2 font-semibold text-foreground">URL</th>
                </tr>
              </thead>
              <tbody>
                {mapAssets.map(a => (
                  <tr key={a.name} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-foreground">{a.name}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{a.credit}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground hidden md:table-cell">{a.license}</td>
                    <td className="py-2.5">
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline inline-flex items-center gap-1 text-xs break-all">
                        {a.url}<ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Unsplash notice */}
          <div className="bg-muted/40 rounded-xl p-4 mb-5 text-sm">
            <strong className="text-foreground">Unsplash Image Platform</strong> — <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">unsplash.com</a>
            <p className="text-muted-foreground mt-1">License: Unsplash License. Permits free use for commercial and noncommercial purposes. No attribution required; attribution provided here for educational documentation compliance.</p>
          </div>

          <h3 className="font-semibold text-foreground mb-3">Business & Application Images</h3>
          <p className="text-xs text-muted-foreground mb-3">Used across Index, Directory, Events, Deals, Favorites, and About pages.</p>
          <ImageTable rows={businessImages} />

          <h3 className="font-semibold text-foreground mt-6 mb-3">Additional Business & Lifestyle Images</h3>
          <p className="text-xs text-muted-foreground mb-3">Used for mock data, category pages, and UI illustrations.</p>
          <ImageTable rows={additionalImages} />

          <h3 className="font-semibold text-foreground mt-6 mb-3">Boardwalk, Hero &amp; UI Assets</h3>
          <p className="text-xs text-muted-foreground mb-3">Used on Index, About, and mock data sections. Boardwalk/Towne Lake images used with written permission from Caldwell Companies (see Permission Documentation above).</p>
          <ImageTable rows={boardwalkImages} />
        </GlassCard>
      </ScrollFadeIn>

      {/* ── 5. OPEN SOURCE LIBRARIES ── */}
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
