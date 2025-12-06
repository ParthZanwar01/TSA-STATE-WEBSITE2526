# Cypress LocalLink

A local business directory web app for Cypress, Texas. Built for the FBLA 2025–2026 Coding & Programming competition (Byte-Sized Business Boost prompt).

## Features

- **Business Directory** – Browse businesses by category with filters and sorting (Name A–Z, Highest Rating, Most Reviews)
- **Reviews & Ratings** – View and leave reviews (logged-in users). Sort businesses by rating or number of reviews
- **Favorites** – Save favorite businesses; requires login
- **Deals & Coupons** – Display special deals and coupons on the home page
- **Map** – View business locations on an interactive map
- **Submit Business** – Business owners can submit listings; Google reCAPTCHA v2
- **Login / Sign Up** – User accounts with demo login (demo@locallink.com / demo123); Google reCAPTCHA v2

## Tech Stack

- **React 18** + Vite + TypeScript
- **Tailwind CSS** – Styling
- **Framer Motion** – Animations
- **Leaflet / react-leaflet** – Map
- **Zod** – Form validation
- **localStorage** – Auth and favorites (no backend)

## Run Locally

```sh
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build

```sh
npm run build
npm run preview   # preview production build
```

## Project Structure

- `src/pages/` – Route components (Index, Directory, BusinessDetail, MapPage, Events, About, SubmitBusiness, BusinessLogin, Favorites)
- `src/components/` – Reusable UI (Navbar, Layout, GlassCard, ChatWidget, FAQWidget, etc.)
- `src/data/businessData.ts` – Static business, event, and deal data
- `src/hooks/` – useAuth, useFavorites, useUserReviews

## License

MIT
