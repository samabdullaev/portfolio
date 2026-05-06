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
- [x] Blog filter cards: SvelteKit+Sanity (Svelte flame + Sanity-style block), Study Abroad (passport + globe + airplane), Professional Dev (laptop + chart + notebook), UK Guide (red double-decker bus + tea + Big-Ben tower)
- [x] Resources filter cards: 8 topic icons (Tools, Apps, Programming, Career, Education, Newsletters, Showcases, Portfolios — props vary per topic)
- [x] Certificates filter cards: 9 issuer icons keyed to the platform's subject matter (CS50 = academic pillar+chalkboard+books, Python Institute = python snake+scroll+laptop, HackerRank = terminal+green chevron+hex badge, Awards & Hackathons = trophy+medal+scroll, Coursera = laptop+headphones+notepad, FreeCodeCamp = campfire+laptop+log stool, Forage = briefcase+laptop+clipboard, LinkedIn Learning = navy tablet+graduation cap+mug, Springpod = sapling+magnifier+book). Thematic only — no logo reproduction.
- [x] Add new April 2026 journeyUpdate entry (`journey-2026-04`, "April 2026: Iteration") + matching thumbnail mapping in `images.seeder.ts` (auto-bumps `order` since entries[] is reverse-chronological)
- [x] Active filter card image radius bumped from 12px → 20px (matches the outer ring's 20px radius so both curves read as the same shape). Padding and structural design preserved (2px border, 20px outer radius, 8px desktop / 6px mobile padding). `var(--color-bg)` fills the active gap so the curve is visible against the white-bg AI icons.

## Phase 6.11: About-page Contributions bento
- [x] Replace the 2-col `ContributionsGrid` on `/about` with `ContributionsBentoCreative` — a 4×3 bento (`"a a b c" / "a a b d" / "e e e f"`) where each slot renders its own visual format instead of the uniform icon+title+description.
- [x] Slot renderers (each tied to a specific platform by array order):
  - **a — FeatureHero (LinkedIn, 2×2)**: cream card, two-column inner layout. Left: `SOCIAL` tag + bold "Monthly journey on LinkedIn." headline + description. Right: a `Recent posts` panel showing the 5 most-recent `journeyUpdate` docs (real thumbnail + title + "Month N" derived from a journey-start of Oct 2023, e.g. April 2026 = Month 31). Green pulsing "Live" indicator next to the panel header.
  - **b — CommunityCard (UzTech, 1×2)**: cream card. `COMMUNITY` tag, 5 colourful gradient avatar circles with white person-silhouette SVGs, 3 activity pills (Events / Training / Projects) with status dots that cycle green on a stagger, title, description, and a Telegram-style channel-preview footer at the bottom (Telegram-blue circle + paper-plane SVG + `@UzTechUK` + green pulsing "Active community" dot).
  - **c — ContributionGraphCard (GitHub, 1×1)**: dark slate card (only non-cream slot — "code editor" reads instantly). `CODE` tag + a mock 5×7 contribution-graph grid in GitHub-style greens.
  - **d — QuoteCard (Publink, 1×1)**: cream card. Big serif `❞` quote-mark watermark in the top-right, `WRITING` tag, title, optional `subtitle` (e.g. "Uzbek mentorship").
  - **e — ArticlePreviewCard (Medium, 3×1 banner)**: cream card. Inline `WRITING` tag + black avatar dot, big Lora-serif "Medium" headline, description, "Read more →" CTA. On the right: a tilted mock article tile showing a black-gradient thumbnail with a white serif "M" + the latest `blogArticle` title + date. On mobile the tile becomes a peek (absolutely positioned with negative offsets so the card's `overflow: hidden` crops most of it — only a sliver shows in the bottom-right corner).
  - **f — CodeBracketsCard (LeetCode, 1×1)**: cream card. `PRACTICE` tag + giant mono `{ }` watermark.
- [x] Sanity schema additions on `aboutPage.contributions[]`: `tag` (uppercase pill, every slot), `subtitle` (Quote slot), `channelName` / `channelStatus` / `activities[]` (Community slot). Removed `emoji` (no slot rendered it after the bento redesign).
- [x] Drop `Kompas` contribution (programme stopped 2 years ago) — patched out of the live document, removed from the singletons seeder, and the bento now sizes to 6 slots.
- [x] Singleton documents (`homePage`, `aboutPage`, `siteSettings`) gained `preview` blocks so Sanity Studio shows readable titles + media instead of the raw object dump.
- [x] About page opts into ISR with `export const revalidate = 3600` so newly-published `journeyUpdate` and `blogArticle` docs surface in the bento within an hour without a redeploy.

---

> **Phases 7–14 — Cleanup, refactor & public-release prep**
>
> Sequential, each phase lands as a discrete commit set. The Playwright baseline (Phase 9) becomes the regression net for everything after. Schema mutations during Phase 12 imply matching CLAUDE.md updates to the schema table.

## Phase 7: Cleanup & Audit (read-only first)
- [x] Inventory dead code — unused exports, components, CSS classes, leftover JSON files
- [x] Inventory `"use client"` directives — flag any that don't actually need browser APIs / state
- [x] Inventory hardcoded data — what's static, where it currently lives, where it should live (`src/data/` cross-page, `src/lib/constants.ts` app-wide, file-top single-use)
- [x] Inventory sensitive data — any committed `.env*`, hardcoded tokens, personal info that should be Sanity-driven, anything to env-ify before public release
- [x] Naming consistency check — PascalCase components, camelCase utils, kebab-case routes, slug-style file names
- [x] Version audit — flag legacy patterns from earlier Next.js / React / Sanity versions; check for old terminology in code/comments
- [x] Report findings; user approves before any deletion or moves

## Phase 8: Reorganize structure
- [x] Delete dead code identified in audit (`src/components/ui/CardGrid.tsx`)
- [x] Move static data per audit (`src/data/navigation.ts`, `src/data/social-icons.tsx`, `src/lib/constants.ts` for `JOURNEY_START_*` + `monthNumber`)
- [x] Env-ify Sanity client — `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET`; create `.env.local` (gitignored) and `.env.example` (committed)
- [x] Extract GROQ queries to `src/lib/sanity/queries/{home,about,projects,blog,journey,resources,certificates,travel,reviews,mentorship}.ts` — query strings + result types co-located per domain
- [x] Move shared Sanity primitives (`SanityImage`, `SanitySlug`, `SanityProjectGalleryEntry`) to `src/lib/sanity/types.ts`; delete `src/lib/sanity-types.ts`
- [x] Move client + `sanityFetch` to `src/lib/sanity/client.ts`; add `src/lib/sanity/index.ts` barrel so existing `from "@/lib/sanity"` imports still resolve; delete `src/lib/sanity.ts`
- [x] Update all 14 page files to consume the new query modules; remove every inline `interface ... { ... }` shape that duplicates a query result type
- [x] Add root `loading.tsx`, `error.tsx`, and `not-found.tsx` (Next.js cascades these to all child segments — per-route overrides only when copy needs to differ)
- [x] Naming corrections from audit — none needed (audit confirmed conventions are consistent)
- [x] Type check + dev-server smoke test (about + projects render clean, no console errors)
- [x] Update CLAUDE.md component/route table to reflect new `src/lib/sanity/` structure

## Phase 9: Playwright E2E baseline
- [x] Install `@playwright/test` + chromium binary; add `playwright.config.ts` (chromium 1280×720 desktop project + Pixel-7 mobile project; reuses existing dev server on :3000)
- [x] Add npm scripts: `test:e2e`, `test:e2e:ui`, `test:e2e:update`
- [x] Per-route happy-path tests in `e2e/`:
  - `home.spec.ts` — hero, profile photo, socials, actions
  - `about.spec.ts` — bio, bento, hobbies, expand button
  - `hubs.spec.ts` — parametrised over all 8 hubs (heading + first card/chip + no broken images)
  - `details.spec.ts` — one project / travel / review / resource-category detail
- [x] Critical interactions:
  - `filters.spec.ts` — Certificates / Projects / Journey filter chips update URL + narrow the visible grid
  - `interactions.spec.ts` — theme toggle persists across reload; MediaModal opens, navigates, closes on Esc
  - `navbar.mobile.spec.ts` — burger drawer opens, link click navigates (mobile-only project)
- [x] Visual snapshots — `snapshots.spec.ts` with full-page baselines for `/`, `/about`, `/projects`, `/blog`, `/certificates` (the routes that take the heaviest CSS load and will get migrated in Phase 10). Stored under `e2e/snapshots.spec.ts-snapshots/` and committed; `*.png` allowlist in `.gitignore` covers them.
- [x] Baseline run: 26/26 tests pass in ~12s
- [ ] CI hook deferred until deploy host is decided in Phase 14

## Phase 10: Tailwind migration (hybrid)
- [x] Inventory components into three buckets: **pure utilities** (Footer, HobbiesList, SocialTile, ExpandText, HubCard), **hybrid** (Hero, hub chrome, card grids, detail chrome, Navbar), **CSS-stays** (bento system, MediaModal slider, Modal, FilterCardRow)
- [x] Migrate pure-utility components: 5 components, 1 commit each
- [x] Migrate hybrid components: 5 surfaces via 7 new shared layout components (HubPage, HubHeader, TopicSection, CardGrid, DetailPage, DetailBack, DetailSection)
- [x] Realign retained CSS to design tokens (audit confirmed `var(--color-*)` used everywhere chrome lives; hardcoded values are intentional brand/mockup colors). Bonus find: dropped dead certificates.css.
- [x] Add `clsx` + `tailwind-merge` with `src/lib/cn.ts` helper; refactor Navbar + MediaGallery conditionals
- [x] Visual regression check after each cluster — all 38 tests pass at every commit
- [x] **Snap-to-defaults policy**: Tailwind default scale, accept 1-2px diffs, no leading-normal workarounds (saved as memory)
- [x] **Marker class strategy → end-of-phase test refactor**: preserved class names as test hooks during migration, then refactored 7 e2e specs to data-testid + semantic locators (`getByRole`, `getByText`) and dropped marker classes. Zero class-based locators remain.
- [x] **Dark mode infrastructure**: `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))` so Tailwind `dark:` maps to project's data-theme attribute
- [x] **CRITICAL**: wrap base styles in `@layer base { ... }` so Tailwind utilities can override anchor `color: inherit` (caught when Resume button rendered as featureless rectangle in dark mode; fix also restored LinkedIn brand color silently broken since SocialTile migration)
- [x] Bug fixes uncovered during migration: nested `<main>` (4 hub + 4 detail pages), broken `.btn-secondary` reference in error.tsx + not-found.tsx, broken `.hub-card-*` references in Reviews + Certificates after HubCard migration

**Outcomes**: globals.css 962 → 99 lines (-90%), project-detail.css deleted (-400 lines), certificates.css deleted (-10 lines). 14 commits. All 38 Playwright tests pass throughout.

## Phase 11: next/image migration
- [ ] Add custom Sanity image loader (`src/lib/sanity-image-loader.ts`) for the Sanity CDN
- [ ] Decide default `sizes` per usage pattern (hub thumbnail, detail hero, gallery thumb, avatar, bento media)
- [ ] Replace `<img>` site-wide with `next/image`
- [ ] Remove `eslint-disable @next/next/no-img-element` comments
- [ ] Verify hub + detail page Lighthouse LCP improvement vs Phase 9 baseline

## Phase 12: Sanity Studio refactor (`../portfolio-sanity` repo)
- [ ] Build desk structure with 7 groups: Pages / Projects / Blog / Resources / Certificates / Travel / Reviews / Journey / Mentorship
- [ ] Migrate `string` date fields to `date` type — `certificate.date`, `blogArticle.date`, `mentorshipArticle.date`
- [ ] Decide per-doc-type ordering strategy:
  - **Drag-and-drop** (small, intentional): `projectCategory`, `blogSeries`, `resourceTopic`, `certificateIssuer`, `journeyYear`, `travelDestination`, `yearlyReview`
  - **Date-based default sort** (drop `order` entirely): `certificate`, `blogArticle`, `journeyUpdate`
- [ ] Install `@sanity/orderable-document-list` and configure for D&D types
- [ ] Set `defaultOrdering: [{ field: 'date', direction: 'desc' }]` per date-sorted doc type for newest-first
- [ ] Schema add/remove/edit as discovered during refactor (planned: `order` field removal where date-sort replaces it; field-type migration for date fields; any new fields to support better ordering or grouping)
- [ ] Seeder split:
  - `seed/fixtures/` — **gitignored**, real-data backup; refresh via `sanity dataset export production`
  - `seed/example/` — **committed**, 1–2 placeholder docs per type so a stranger can fork and see Studio work end-to-end
  - Seed runner reads either directory via flag (`--from fixtures` / `--from example`)
- [ ] Update CLAUDE.md schema table to reflect any field/type changes
- [ ] Update PLAN.md schema-related sections (Phase 5, 6.5–6.11) only if field renames break historical accuracy

## Phase 13: Performance + a11y polish
- [ ] Run `next build` + bundle analyzer; record baseline numbers
- [ ] Lighthouse per route (light + dark mode); record baseline
- [ ] Modal focus trap + focus restoration on close
- [ ] Skip-to-content link in root layout
- [ ] ARIA label audit (icon-only buttons, modal close, theme toggle, social tiles)
- [ ] Contrast audit on `--color-text-secondary` against `--color-bg` (both modes); adjust tokens if needed
- [ ] Lazy-load offscreen card grids and images
- [ ] Re-run bundle analyzer + Lighthouse; compare to baseline; document deltas

## Phase 14: Public repo prep + deploy
- [ ] Sweep both repos for `.env*`, hardcoded tokens, personal data not surfaced via Sanity
- [ ] Create `.env.example` in both repos (var names only, no values)
- [ ] `.gitignore` audit — build outputs, OS junk (`.DS_Store`), IDE configs, `seed/fixtures/`
- [ ] Move Sanity project ID + dataset name to env vars (currently `p43tljnq` / `production` — public-readable but env-driven for hygiene)
- [ ] Write README for portfolio repo (tech stack, local setup, env vars, screenshots, deploy)
- [ ] Write README for portfolio-sanity repo (Studio setup, seeding via `seed/example/`, schema groups)
- [ ] Add `LICENSE` (MIT) to both repos
- [ ] Configure Vercel deployment for portfolio
- [ ] Set up Sanity webhook for on-demand revalidation (rolls in leftover Phase 6 ISR item)
- [ ] Add `<head>` metadata + per-route `generateMetadata` + OG images
- [ ] Final QA: full light/dark across pages, responsive at all 5 breakpoints, broken links / images
- [ ] Flip both repositories to public
