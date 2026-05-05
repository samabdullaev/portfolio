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
- [x] Create all document type schemas (homePage, aboutPage, siteSettings, project, projectCategory, blogSeries, blogArticle, resource, resourceCategory, resourceTopic, certificate, certificateIssuer, travelDestination, yearlyReview, journeyUpdate, journeyYear, mentorshipArticle)
- [x] Build seeder system (`pnpm seed up/down [name]`)
- [x] Populate all content from static site into Sanity (text + image uploads)
- [x] Migrate Resources hub to mixed-type model: `resource` (external links) + `resourceCategory` (curated detail pages) referenced by `resourceTopic` (hub groupings)

## Phase 6: Sanity Integration (this repo)
- [x] Add `@sanity/client` + create `src/lib/sanity.ts` with `sanityFetch` helper
- [x] Add `src/lib/sanity-types.ts` with manual TypeScript shapes
- [x] Wire up all pages to fetch from Sanity (home, about, projects, blog, journey, resources, travel, reviews, certificates, mentorship)
- [x] Remove `src/data/` JSON files and `src/app/api/` routes
- [ ] Set up ISR or on-demand revalidation

## Phase 6.5: Reusable filter pattern across hub pages
- [x] Introduce `certificateIssuer` document with logo + slug; migrate `certificate.issuer` from free-text string to a reference
- [x] Build reusable `<FilterCardRow>` component (`src/components/ui/FilterCardRow.{tsx,css}`) cloning Airbnb Services' filter row — exact dimensions (153×192 / 107×148), 20px ring active state with image-shrinks-via-padding, grid distribution on desktop, fixed-width horizontal scroll on mobile, URL search param-driven, elastic rubber-band overscroll
- [x] Always reserve at least 9 columns (`Math.max(items.length, 9)`) so fewer items don't stretch to fill the row
- [x] Wire Certificates hub (`?issuer=<slug>`) — uses `certificateIssuer` docs as filter cards
- [x] Add `slug` + `logo` to `resourceTopic`; wire Resources hub (`?topic=<slug>`)
- [x] Add `shortTitle` + `logo` to `blogSeries`; wire Blog hub (`?series=<slug>`)
- [x] Introduce `journeyYear` document; wire Journey hub (`?year=<slug>`) — matched against `journeyUpdate.year` by number
- [x] Introduce `projectCategory` document; wire Projects hub (`?category=<slug>`) — matched against `project.category` string by slug
- [x] Remove obsolete `<TopicSection>` component (replaced by FilterCardRow + plain grid)
- [x] Remove "Show All / Show Less" buttons from all hub pages (filter pattern supersedes them)
- [x] Add seeders: `certificate-issuers`, `blog-series-images`, `journey-years`, `project-categories`

## Phase 6.6: Reviews / Travel / Mentorship redesign
- [x] Move `.card-grid-filtered` rules from `FilterCardRow.css` into `globals.css` so any page can use them without importing the filter component
- [x] Reviews: replace gradient cover with `thumbnail` (required image) + `gallery` (image array); render with `<Gallery>` on the detail page; remove year overlay on hub cards (year already shown in title)
- [x] Travel: add `gallery` (image array) to `travelDestination`; render with `<Gallery>` on the detail page
- [x] Switch Reviews / Travel / Mentorship hub grids to `card-grid-filtered` (4-col desktop / 2-col tablet / vertical full-width on mobile) — same shape as filtered hub pages
- [x] Delete dead `reviews.seeder.ts` (read from a `src/data/reviews.json` that no longer exists; user uploads through Studio)
- [x] Drop unused `.hub-card-year` styles from `globals.css`

## Phase 6.7: Projects detail-page gallery + video items
- [x] Replace `galleryItem` (image+video wrapper) with `galleryVideo` (videoUrl + optional label); make `project.gallery` a mixed array of `image | galleryVideo` so the MCP can auto-add image items
- [x] Update detail page: thumbnail leads the `<Gallery>`, gallery entries follow (images + YouTube/Vimeo videos discriminated by `_type`)
- [x] Generate relevant screen mockups + photo references for all 14 projects (1–2 each)
- [x] Move JoyBormi YouTube + Tech 2 Vimeo hackathon recordings into the gallery as `galleryVideo` items (also kept as `liveUrl` so the "Visit Website" button stays present — single, consistent action button)
- [ ] Modal polish (deferred — current YouTube modal works; UX refinements come later)

## Phase 6.8: Reusable Airbnb-style modal
- [x] Build `<Modal>` primitive (`src/components/ui/Modal.{tsx,css}`) — full-viewport white surface, sticky topbar (80px desktop / 64px mobile), Esc + click-to-close, body scroll-locked, gentle fade-in enter, instant close (no exit animation by user preference)
- [x] Build `<MediaModal>` (`src/components/ui/MediaModal.{tsx,css}`) on top of `<Modal>` — track-based slider with Airbnb's spring easing (`linear(...)` curve, 450ms) and shrink-on-press effect on prev/next + keyboard arrows; mobile uses native `scroll-snap-type: x mandatory` + `overflow-x: auto` for momentum-driven free swipe (no nav arrows). 28px gap between slots. Handles YouTube + Vimeo embed conversion.
- [x] Wire Certificates page to use `<MediaModal>`; delete the old inline `cert-modal-*` CSS

## Phase 6.9: Reviews + Travel + Projects → MediaGallery + per-image captions
- [x] Build `<MediaGallery>` (`src/components/ui/MediaGallery.tsx`) — inline hero + thumbnail strip with Option B interaction: thumb click swaps the inline hero, hero click opens `<MediaModal>` at the active index. Modal navigation also updates the inline `activeIndex` so closing returns to the last image viewed.
- [x] Active-thumb visual mirrors `FilterCardRow`: `box-sizing: border-box` + `padding: 4px` + `box-shadow: inset 0 0 0 2px var(--color-text)` + `var(--color-bg)` fills the gap; image inside has its own `border-radius: 4px` so the curve survives the padding. Outer dimensions stay 80×52 — no neighbour shift.
- [x] `MediaGallery` handles videos uniformly with images: video thumbs/heros render a static preview frame (`img.youtube.com` for YouTube, `vumbnail.com` for Vimeo) with a play overlay, then play full-size inside `<MediaModal>` (no auto-play in the inline view). YouTube + Vimeo embed conversion handled in `MediaModal`. Active-state padding/ring also pads the play-icon overlay so it stays within the image bounds and inherits the rounded corner.
- [x] Add `caption` field to every image in `yearlyReview`, `travelDestination`, and `project` (`thumbnail` + `gallery[]` items). Rename `galleryVideo.label` → `caption` for consistency. All editable in Studio.
- [x] `<MediaModal>` `<MediaModal>` derives the topbar title from `items[index].caption` (falls back to the modal-level `title` prop for usages like Certificates that don't use per-item captions). Iframe sized via `:has(iframe)` rule that stretches the frame to viewport-fitted 16:9 instead of shrinking with the image-style content fit.
- [x] Reviews / Travel / Projects detail pages all swap `<Gallery>` → `<MediaGallery>` and pull captions from Sanity
- [x] Seed captions for all 5 review thumbnails + gallery items, all 11 travel destinations + gallery items, and all 14 projects + gallery items (incl. JoyBormi YouTube + Tech 2 Vimeo videos)

## Phase 6.10: AI-generated isometric filter icons + curve match
- [x] Generate Airbnb-style isometric icons via Sanity's `mcp__Sanity__generate_image`. Prompt template: 1:1 canvas, isometric-left orientation, soft ambient lighting from top-right, satin/semi-matte materials, octane-style 3D rendering on plain white bg, no text/numbers/words. Same template reused across pages.
- [x] Project filter cards: Personal (laptop+plant+notebooks), Freelance (briefcase+document+pen), Hackathon (trophy+code-bracket+lightning)
- [x] Journey filter cards: 2023 (airplane+globe+passport — travel), 2024 (textbooks+maple leaf — Concordia exchange), 2025 (graduation cap+diploma+briefcase — graduation/job hunt), 2026 (calendar+pencil+growth chart — planning/momentum)
- [x] Active filter card image radius bumped from 12px → 20px (matches the outer ring's 20px radius so both curves read as the same shape). Padding and structural design preserved (2px border, 20px outer radius, 8px desktop / 6px mobile padding). `var(--color-bg)` fills the active gap so the curve is visible against the white-bg AI icons.

## Phase 7: Polish & Deploy
- [ ] Add `<head>` metadata + OG images for all pages
- [ ] Add `next/image` optimization for all images
- [ ] Lazy-load offscreen card grids and images
- [ ] Test full light/dark mode across all pages
- [ ] Test responsive layout at all 5 breakpoints
- [ ] Run Lighthouse audit and fix performance issues
- [ ] Configure deployment (Vercel)
- [ ] Set up Sanity webhook for on-demand revalidation
