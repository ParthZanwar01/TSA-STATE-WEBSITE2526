# Cypress LocalLink

**TSA 2025–2026 Webmaster Competition**

A full-featured local business discovery web application for Cypress, Texas. Helps community members find, review, and support small local businesses.

Live demo: https://tsa-cypress-locallink.netlify.app

---

## Topic Requirements — Feature Checklist

All six required features from the Byte-Sized Business Boost prompt are implemented:

| # | Required Feature | Where to Find It |
|---|---|---|
| 1 | Sort businesses by category | Directory page → category filter buttons (Food, Retail, Services, etc.) |
| 2 | Allow users to leave reviews or ratings | Business Detail page → "Leave a Review" (sign-in required); star rating + text form |
| 3 | Sort businesses by reviews or ratings | Directory page → Sort dropdown → "Highest Rating" / "Most Reviews" |
| 4 | Save / bookmark favorite businesses | Business Detail page → heart icon; view all at `/favorites` |
| 5 | Display special deals or coupons | Home page → Deals & Coupons section; also surfaced on Events page |
| 6 | Verification step to prevent bot activity | Submit Business form → Google reCAPTCHA v2; Login / Sign-Up form → Google reCAPTCHA v2 |

---

## Language Selection Rationale

**Language:** TypeScript (superset of JavaScript)
**Framework:** React 18 with Vite

TypeScript was chosen over plain JavaScript because its static type system catches errors at compile time rather than runtime, which is critical for a data-driven application with complex business objects, review schemas, and filter logic. Strict typing via `zod` inference ensures form validation and data models stay in sync throughout the codebase.

React was selected because its component model enables modular, reusable UI — each page, card, and form is an isolated unit that can be developed and tested independently. Vite provides near-instant hot module replacement during development and an optimized production build. Together, this stack represents the current industry standard for interactive, high-performance web applications.

---

## Architecture & Program Modularity

```
src/
├── pages/          # Route-level components (one file per page)
├── components/     # Reusable UI components (GlassCard, Navbar, ChatWidget…)
│   └── ui/         # Shadcn/Radix primitive wrappers
├── contexts/       # React Context providers (BusinessStore, EventStore)
├── hooks/          # Custom hooks (useAuth, useFavorites, useUserReviews)
├── lib/            # Utilities: sqlite.ts, sanitize.ts, utils.ts
├── data/           # Static seed data (businesses, events, deals)
└── types/          # Shared TypeScript interfaces (db.ts, etc.)
```

Key modularity decisions:
- **Context + custom hooks** separate data access from UI rendering
- **SQLite persistence layer** (`src/lib/sqlite.ts`) is completely decoupled from components
- **Sanitization utilities** (`src/lib/sanitize.ts`) are reused across review and business submission flows
- **Zod schemas** colocated with their forms provide single-source-of-truth validation

---

## Data Structures & Storage

- **Business and Event records** are stored as typed objects (`Business`, `Event`) in arrays, with O(1) lookup by ID via `Map`-backed context
- **User reviews** persist across sessions using **SQL.js** (SQLite compiled to WebAssembly), stored in IndexedDB — a proper relational store with a `reviews` table and indexed `businessId` column
- **Favorites** are stored as a `Set<string>` of business IDs in `localStorage`, serialized to JSON
- **Authentication state** (demo accounts) is managed in `localStorage` with session tokens

---

## User Experience Design

**Design rationale:** A glassmorphism aesthetic with a navy/gold palette reflects Cypress's professional community character. Framer Motion animations provide spatial context (pages slide in directionally). The primary user journey is:

> Home → Category filter → Directory → Flip card preview → Business Detail → Review / Favorite

**Accessibility features:**
- Skip-to-main-content link
- Semantic HTML landmarks (`<main>`, `<nav>`, `<section>`)
- ARIA labels on all icon-only buttons (heart, gallery arrows)
- High-contrast mode toggle (Accessibility settings page)
- Keyboard-navigable forms and navigation menus
- All images include descriptive `alt` text

See the in-app **Accessibility** page (`/accessibility`) for full documentation.

---

## Intelligent Features

- **Smart search** on Directory: searches business name, description, category, and address simultaneously
- **Flip-card previews** in Directory: hover/tap to reveal rating, price, and quick-action buttons without leaving the listing
- **Calendar / List view toggle** on Events page
- **Customizable Reports** page (`/reports`): filter by category, rating, date range; export to CSV
- **AI Chat Widget**: context-aware assistant that answers questions about businesses shown on screen

---

## Input Validation

Validation is applied at both syntactic and semantic levels using **Zod** schemas:

- Phone numbers: must match 10-digit US format
- URLs: must include `http://` or `https://` protocol prefix
- Addresses: must include a street number (rejects P.O. boxes and vague entries)
- Business descriptions: minimum 20 characters, maximum 500; rejects nonsense strings
- Reviews: minimum 10 characters; HTML/script tags are stripped via `sanitize.ts`
- reCAPTCHA token: must be non-null before any form submission is processed

Error messages appear inline beneath the relevant field with motion transitions.

---

## Run Locally

```sh
npm install
npm run dev
# Opens at http://localhost:8080
```

### Demo Credentials

| Email | Password | Role |
|---|---|---|
| demo@locallink.com | demo123 | Standard user |
| admin@locallink.com | admin123 | Admin (access /admin) |

> **Note for presentation:** The database is client-side (IndexedDB). Pre-load demo reviews by logging in and submitting reviews on a few business pages before presenting. All submitted data persists across page refreshes within the same browser session.

### Build for Production

```sh
npm run build
npm run preview   # Preview production build locally
```

---

## Libraries & Templates Used

| Library | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| TypeScript | 5.8.3 | Static typing |
| Vite | 5.4.19 | Build tool and dev server |
| `@vitejs/plugin-react-swc` | 3.11.0 | Fast React transforms via SWC |
| Tailwind CSS | 3.4.17 | Utility-first CSS |
| Framer Motion | 11.18.2 | Animations and page transitions |
| Zod | 3.25.76 | Schema-based form validation |
| React Hook Form | 7.61.1 | Form state management |
| `@hookform/resolvers` | 3.10.0 | Zod adapter for React Hook Form |
| React Router DOM | 6.30.1 | Client-side routing |
| TanStack Query | 5.83.0 | Async state management |
| sql.js | 1.14.0 | SQLite compiled to WebAssembly (review persistence) |
| Leaflet + react-leaflet | 1.9.4 / 4.2.1 | Interactive business map |
| `react-google-recaptcha` | 3.1.0 | Google reCAPTCHA v2 bot prevention |
| Shadcn/UI (Radix UI) | various | Accessible headless UI primitives |
| Lucide React | 0.462.0 | Icon set |
| `@react-three/fiber` + drei | 8.18 / 9.122 | Three.js 3D morph background |
| Recharts | 2.15.4 | Charts in Reports page |
| Sonner | 1.7.4 | Toast notifications |
| next-themes | 0.3.0 | Dark/light mode |
| date-fns | 3.6.0 | Date formatting |
| Embla Carousel | 8.6.0 | Carousel component |

---

## Open-Source & Copyright Attribution

- **Business photos:** [Unsplash](https://unsplash.com) — free to use under the [Unsplash License](https://unsplash.com/license)
- **Map tiles:** [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors — © OpenStreetMap, available under the Open Database License (ODbL)
- **Leaflet map library:** © 2010–2024 Vladimir Agafonkin, BSD 2-Clause License
- **Shadcn/UI components:** MIT License, built on [Radix UI](https://www.radix-ui.com/) primitives (MIT License)
- **Google reCAPTCHA:** Google LLC — [Terms of Service](https://policies.google.com/terms)
- **Fonts:** Inter and system fonts via browser defaults
- All other libraries listed above are open-source under MIT or Apache 2.0 licenses

---

## How This Program Addresses the Topic

The "Byte-Sized Business Boost" prompt asks for a tool that helps users **discover and support small, local businesses**. Cypress LocalLink addresses this by:

1. **Discovery** — A searchable, filterable Directory with category buttons and smart keyword search makes finding relevant local businesses fast and intuitive
2. **Community trust signals** — User reviews and star ratings (persisted in SQLite) let residents share authentic experiences, helping others make informed choices
3. **Loyalty** — The Favorites system lets users save businesses they love and return to them easily
4. **Promotion** — Deals & Coupons surface special offers, giving small businesses a marketing channel within the app
5. **Growth** — The Submit Business form (with reCAPTCHA) lets business owners add their listings, keeping the directory community-maintained
6. **Integrity** — Google reCAPTCHA v2 on both sign-up and business submission forms prevents spam and fake reviews, maintaining data quality

---

## License

MIT
