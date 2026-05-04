# Portfolio Migration — Task List

## Phase 1: Foundation
- [x] Replace existing `globals.css` with portfolio design system (CSS variables, Inter font, light/dark tokens)
- [x] Create `ThemeProvider.tsx` — client component with `localStorage` + system preference detection
- [x] Create `Navbar.tsx` — sticky nav, logo link, dropdown menus (Writing/Life/Learning), active states, theme toggle, mobile responsive with fixed dropdowns
- [x] Create `Footer.tsx` — centered copyright text
- [x] Update `layout.tsx` — wrap children with ThemeProvider, Navbar, Footer; flex column with `min-height: 100dvh`
- [x] Set up Tailwind v4 theme tokens to match CSS variables (colors, fonts, breakpoints)

## Phase 2: Home & About Pages
- [x] Create `src/app/page.tsx` — hero section: profile photo, name, title, location, social tiles, resume download, CTA button
- [x] Create `SocialTile.tsx` — icon tile with brand-color hover (LinkedIn blue, GitHub neutral, Medium neutral)
- [x] Create `src/app/about/page.tsx` — about page with bio, contributions, hobbies
- [x] Create about-row layout — side-by-side (text left, sticky photo right), mobile stacks photo first
- [x] Create `ExpandText.tsx` — paragraph with inline expand button, fade-in animation for hidden content
- [x] Create `ContributionsGrid.tsx` — 2-column grid of linked cards with emoji + title + description
- [x] Create `HobbiesList.tsx` — flex-wrap pill list with emoji + label

## Phase 3: Hub Pages
- [x] Create `CardGrid.tsx` — reusable grid (4 → 2 → 1 col) with "Show all / Show less" toggle, configurable initial count
- [x] Create `HubCard.tsx` — thumbnail (16:9) + title + optional subtitle/meta
- [x] Create `src/app/projects/page.tsx` — 3 category sections (Personal/Freelance/Hackathon), each with CardGrid
- [x] Create `src/app/blog/page.tsx` — 4 series sections with CardGrid. Articles link to external Medium URLs
- [x] Create `src/app/journey/page.tsx` — year-grouped sections with CardGrid. Cards link to LinkedIn
- [x] Create `src/app/resources/page.tsx` — category-grouped sections with CardGrid
- [x] Create `src/app/certificates/page.tsx` — filterable grid + modal viewer
- [x] Create `FilterBar.tsx` — pill-style filter buttons with active state (inline in certificates)
- [x] Create certificate `Modal.tsx` — image viewer overlay with title, date, close on Escape/click-outside (inline in certificates)
- [x] Create `src/app/travel/page.tsx` — country card grid with thumbnails
- [x] Create `src/app/reviews/page.tsx` — year cards with gradient backgrounds
- [x] Create `src/app/mentorship/page.tsx` — article card grid

## Phase 3.5: Hub Page Bug Fixes
- [x] Fix home page hero vertical centering
- [x] Fix Show All/Show Less button placement (desktop: in header, mobile: below grid) — projects, blog, journey, resources
- [x] Fix blog date badge design (pill-style tag)
- [x] Remove Show All from travel page
- [x] Remove Show All from reviews page + add year number on gradient cover
- [x] Fix resource category title prominence
- [x] Rewrite certificates page to match HTML design (grouped by issuer, no filter bar)

## Phase 4: Detail Pages
- [x] Create JSON data files (`src/data/projects.json`, `resources.json`, `travel.json`, `reviews.json`)
- [x] Create API routes (`src/app/api/projects/`, `resources/`, `travel/`, `reviews/`)
- [x] Create `project-detail.css` — port from HTML reference
- [x] Create `Gallery.tsx` — main image display + thumbnail strip, click to swap. Support video thumbnails
- [x] Create `VideoModal.tsx` — iframe overlay, autoplay on open, close on Escape/click-outside/close button
- [x] Create `src/app/projects/[slug]/page.tsx` — back link, category badge, gallery, about, features, tech pills, metadata, links
- [x] Create `src/app/resources/[slug]/page.tsx` — back link, title, description, resource list with external links
- [x] Create `src/app/travel/[slug]/page.tsx` — back link, country header, gallery, content sections
- [x] Create `src/app/reviews/[year]/page.tsx` — back link, year title, review content
- [x] Generate static params for all detail routes using `generateStaticParams()`

## Phase 5: Sanity Setup (separate repo `../portfolio-sanity`)
- [x] Initialize Sanity project with Studio (project ID `p43tljnq`, dataset `production`)
- [x] Create all document type schemas (homePage, aboutPage, siteSettings, project, blogSeries, blogArticle, resource, resourceCategory, resourceTopic, certificate, travelDestination, yearlyReview, journeyUpdate, mentorshipArticle)
- [x] Build seeder system (`pnpm seed up/down [name]`)
- [x] Populate all content from static site into Sanity (text + image uploads)
- [x] Migrate Resources hub to mixed-type model: `resource` (external links) + `resourceCategory` (curated detail pages) referenced by `resourceTopic` (hub groupings)

## Phase 6: Sanity Integration (this repo)
- [x] Add `@sanity/client` + create `src/lib/sanity.ts` with `sanityFetch` helper
- [x] Add `src/lib/sanity-types.ts` with manual TypeScript shapes
- [x] Wire up all pages to fetch from Sanity (home, about, projects, blog, journey, resources, travel, reviews, certificates, mentorship)
- [x] Remove `src/data/` JSON files and `src/app/api/` routes
- [ ] Set up ISR or on-demand revalidation

## Phase 7: Polish & Deploy
- [ ] Add `<head>` metadata + OG images for all pages
- [ ] Add `next/image` optimization for all images
- [ ] Lazy-load offscreen card grids and images
- [ ] Test full light/dark mode across all pages
- [ ] Test responsive layout at all 5 breakpoints
- [ ] Run Lighthouse audit and fix performance issues
- [ ] Configure deployment (Vercel)
- [ ] Set up Sanity webhook for on-demand revalidation
