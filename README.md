# Portfolio — samabdullaev.com

Personal portfolio of Sam Abdullaev, a Frontend Software Engineer based in
the UK. Hub-and-detail site covering projects, blog, journey, travel,
yearly reviews, certificates, mentorship, and resources — all CMS-driven
via Sanity.

## Tech stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **React 19** + TypeScript (strict)
- **Tailwind CSS v4**
- **Sanity** (headless CMS — schemas live in [portfolio-sanity](https://github.com/samabdullaev/portfolio-sanity))
- **Playwright** (E2E + visual regression)
- Deployed on **Vercel**

## Local setup

```bash
# Install dependencies
npm install

# Configure Sanity connection
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET

# Run dev server
npm run dev
```

The site reads content from a Sanity project at runtime. To run against
your own Sanity project, set up the [portfolio-sanity](https://github.com/samabdullaev/portfolio-sanity)
Studio + seeders first, then point the env vars at your project ID.

## Scripts

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run test:e2e` — Playwright suite
- `npm run test:e2e:ui` — Playwright UI mode
- `npm run test:e2e:update` — update visual snapshots

## Project structure

```
src/
├── app/                          Next.js App Router routes
│   ├── (hub pages)/              /projects, /blog, /journey, /resources,
│   │                             /travel, /reviews, /certificates,
│   │                             /mentorship, /about
│   ├── (detail pages)/           /projects/[slug], /resources/[slug],
│   │                             /travel/[slug], /reviews/[year]
│   ├── loading.tsx               Animated SA monogram + dots
│   ├── error.tsx                 Animated warning triangle
│   └── not-found.tsx             404 watermark
├── components/
│   ├── layout/                   HubPage, HubHeader, TopicSection, CardGrid,
│   │                             DetailPage, DetailBack, DetailSection,
│   │                             Navbar, Footer
│   ├── ui/                       FilterCardRow, Modal, MediaModal,
│   │                             MediaGallery, ThemeProvider, HubCard,
│   │                             SocialTile, ExpandText
│   └── sections/                 ContributionsBentoCreative, HobbiesList
├── lib/
│   ├── sanity/                   Client + per-domain GROQ queries
│   ├── dates.ts                  formatMonthYear / formatLongDate helpers
│   ├── constants.ts              Journey-month math, app-wide constants
│   ├── cn.ts                     clsx + tailwind-merge wrapper
│   └── sanity-image-loader.ts    Custom next/image loader (Sanity CDN)
└── data/                         Static cross-page data (navigation,
                                  social-icon SVGs)
```

## Architecture notes

- **Content model**: Every page is driven by Sanity GROQ queries. No
  hardcoded copy in code (besides hub-page heroes — backlogged for
  CMS-ification). Each content domain has its own query module under
  `src/lib/sanity/queries/`.
- **Image pipeline**: `src/lib/sanity-image-loader.ts` is a custom
  `next/image` loader that adds `?w=<n>&q=<n>&auto=format&fit=max` to
  Sanity URLs (lets the CDN serve WebP/AVIF) and passes through external
  hosts (img.youtube.com for YouTube thumbnails, vumbnail.com for Vimeo).
- **Theming**: Light/dark via a `data-theme` attribute on `<html>`,
  toggled by `ThemeProvider` and persisted to `localStorage`. Tailwind's
  `dark:` variant is mapped to this attribute via a `@custom-variant`
  declaration in `globals.css`.
- **Interactive surfaces** (FilterCardRow, MediaModal, MediaGallery) are
  built from scratch in CSS to match Airbnb's photo-tour interactions —
  spring easing on desktop, native scroll-snap on mobile.
- **Containment-based content relationships**: Project membership in a
  category is owned by `projectCategory.projects[]` (not a `category`
  field on the project). Same for `certificateIssuer.certificates[]`
  and `blogSeries.articles[]`. This keeps the parent's array as the
  single source of truth for membership + display order.

## Testing

Playwright covers per-route happy paths, key interactions (filters,
modals, theme toggle, mobile drawer), and full-page visual snapshots
for the heaviest CSS pages. The suite runs in chromium-desktop +
mobile-Pixel-7 projects against a local dev server.

## Deploy

Hosted on Vercel. Pushing to `main` triggers an automatic deploy.
Sanity content updates flow through via on-demand revalidation hooks.

## License

MIT — see [LICENSE](./LICENSE).

## Companion repo

Schemas + Studio config + content seeders live separately at
[samabdullaev/portfolio-sanity](https://github.com/samabdullaev/portfolio-sanity).
