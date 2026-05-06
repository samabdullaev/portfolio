# Portfolio Migration — CLAUDE.md

## Project Overview

| Field | Value |
|-------|-------|
| **Owner** | Sam Abdullaev — Frontend Software Engineer |
| **Purpose** | Personal portfolio showcasing projects, blog, travel, certificates, mentorship, and more |
| **State** | Next.js app fully wired to Sanity CMS for content (home, about, projects, blog, journey, resources, travel, reviews, certificates, mentorship). The original static HTML reference site has been removed. Currently entering an audit/refactor cycle (Phase 7+) ahead of a public release of both repositories — keep secrets out of commits and route IDs/tokens through env vars. |
| **Sanity Studio** | Separate repo at `../portfolio-sanity` (project ID `p43tljnq`, dataset `production`). Schemas, seeders, and Studio config live there. |
| **Tech Stack** | Next.js 16.2, React 19, TypeScript, Tailwind v4, Sanity |
| **Design** | Light (#faf8f4) / Dark (#171717) theming, Inter font, responsive (5 breakpoints) |

---

## Current Site Directory Tree

```
site/
├── index.html                         ← Home (hero, socials, CTA)
├── about.html                         ← Bio, contributions, hobbies
├── blog.html                          ← 4 blog series, 23 articles
├── projects.html                      ← 3 categories, 14 projects
├── journey.html                       ← Monthly LinkedIn updates by year
├── resources.html                     ← Tool/platform recommendations
├── certificates.html                  ← Filterable cert grid + modal viewer
├── travel.html                        ← 10 countries + travel tips
├── reviews.html                       ← Yearly reviews (2021–2025)
├── mentorship.html                    ← Uzbek-language guidance articles
├── css/
│   ├── navbar.css                     ← Sticky nav, dropdowns, responsive
│   ├── hub.css                        ← Shared grid/card layout for hub pages
│   ├── project-detail.css             ← Detail page layout, gallery, modals
│   ├── resource-detail.css            ← Resource list items
│   ├── blog.css                       ← Blog series with collapsible sections (unused)
│   ├── journey.css                    ← Year-grouped card grid (unused)
│   ├── travel.css                     ← Circular highlight rings (unused)
│   ├── certificates.css               ← Filter bar + cert modal (unused)
│   └── mentorship.css                 ← Article card grid (unused)
├── projects/                          ← 14 detail pages
│   ├── codemaster.html, subject-test-platform.html, smart-resume-matcher.html, allmaths.html
│   ├── al-khorezmi.html, shirina.html, actyble.html, soffin.html, 4miles.html
│   ├── kinaie-ecom.html, kinaie-growth.html, joybormi.html, tech2.html, locus.html
├── resources/                         ← 11 detail pages
│   ├── programming-guides.html, telegram-channels.html, github.html
│   ├── interview-prep.html, problem-solving.html, system-design.html
│   ├── newsletters.html, video-learning.html, career-toolkit.html
│   ├── demos-showcases.html, portfolios-i-like.html
├── travel/                            ← 12 detail pages
│   ├── travel-tips.html, uzbekistan.html, uk.html, turkey.html, canada.html
│   ├── hungary.html, france.html, spain.html, switzerland.html
│   ├── netherlands.html, belgium.html
├── reviews/                           ← 5 detail pages
│   ├── 2021.html, 2022.html, 2023.html, 2024.html, 2025.html
└── assets/
    ├── profile.jpeg, Sam_Abdullaev_Resume.pdf
    ├── projects/       (14 images)
    ├── blog/           (24 images)
    ├── journey/        (30 monthly images)
    ├── resources/      (30+ images)
    ├── certificates/   (35+ images)
    ├── travel/         (11 images)
    └── mentorship/     (1+ images)
```

> **Note:** `blog.css`, `journey.css`, `travel.css`, `certificates.css`, `mentorship.css` exist but are **not linked** by any HTML file. All hub pages use `hub.css`; all detail pages use `project-detail.css` (+ `resource-detail.css` for resources).

---

## Page Descriptions

### Hub Pages (10 root HTML files)

| Page | Route | Content | Interactive Features |
|------|-------|---------|---------------------|
| `index.html` | `/` | Hero: profile photo, name, title, location, social tiles (LinkedIn/GitHub/Medium), Resume download, "Learn more" CTA | Theme toggle |
| `about.html` | `/about` | Bio (5 expandable paragraphs), profile photo (sticky on desktop), 7 contribution cards (linked), 8 hobby pills | Expand buttons with fade-in animation |
| `blog.html` | `/blog` | 4 series with card grids: SvelteKit+Sanity (10), Study Abroad (4), Professional Dev (3), UK Guide (6). Links to Medium | Show all / Show less grid toggle |
| `projects.html` | `/projects` | 3 categories: Personal (4), Freelance (7), Hackathon (3). Card grid with thumbnails | Show all / Show less |
| `journey.html` | `/journey` | Monthly updates grouped by year (2023–2026). Cards link to LinkedIn posts | Show all / Show less |
| `resources.html` | `/resources` | Tool/platform cards grouped by category (Tools, Personal, Career, Education, Technology) | Show all / Show less |
| `certificates.html` | `/certificates` | Filterable grid of 35+ certs. Cards with issuer, title, date. Click opens modal viewer | Filter buttons, certificate modal |
| `travel.html` | `/travel` | 10 country cards + travel tips card with thumbnail images | — |
| `reviews.html` | `/reviews` | 5 year cards (2021–2025) with gradient backgrounds | — |
| `mentorship.html` | `/mentorship` | Uzbek-language guidance articles published on Publink | — |

### Detail Pages (42 subpages)

| Type | Count | CSS Used | Template Features |
|------|-------|----------|-------------------|
| **Projects** (`projects/*.html`) | 14 | `project-detail.css` | Back link, category badge (color-coded), gallery (main image + thumbs), about text, features list, tech pills, metadata (year/timeline/role), links. Video modal for some. |
| **Resources** (`resources/*.html`) | 11 | `project-detail.css` + `resource-detail.css` | Back link, title, description, list of external links with name + description + arrow icon |
| **Travel** (`travel/*.html`) | 12 | `project-detail.css` | Back link, country title, gallery, highlights, tips |
| **Reviews** (`reviews/*.html`) | 5 | `project-detail.css` | Back link, year title, review content sections |

---

## Design System

### Colors (CSS Variables)

| Variable | Light | Dark |
|----------|-------|------|
| `--color-text` | `#222` | `#f0f0f0` |
| `--color-text-secondary` | `#6a6a6a` | `#a0a0a0` |
| `--color-bg` | `#faf8f4` | `#171717` |
| `--color-card` | `#fff` | `#222222` |
| `--color-border` | `#e3dfd5` | `#333333` |
| `--color-hover` | `#eeebe4` | `#2a2a2a` |

**Navbar tokens** (scoped to the sticky transparent navbar, tuned to match `--color-bg` so the backdrop blur doesn't shift hue): `--navbar-bg`, `--navbar-border`, `--navbar-shadow`, `--navbar-ease`.

**Accent colors:** Blue `#4285F4` (personal projects), Green `#34A853` (freelance), Gold `#b58b00` (hackathon), Indigo `#4f46e5` (mentorship)

### Typography
- **Primary:** Inter (400, 500, 600, 700, 800)
- **Blog headings:** Lora (serif) — in unused `blog.css`
- **Breakpoints:** 1100px, 900px, 768px, 600px, 500px

### JavaScript Patterns (all vanilla, inline `<script>` tags)
- **Theme toggle** — `localStorage` + `prefers-color-scheme` fallback (all pages)
- **Navbar dropdowns** — click-to-open, close-on-outside-click (all pages)
- **Expand buttons** — hide button, show sibling span with animation (about page)
- **Show all / Show less** — toggle `.expanded` class on `.card-grid` (hub pages)
- **Image gallery** — thumbnail click swaps main image (project details)
- **Video modal** — iframe in overlay, Escape/click-outside to close (project details)
- **Certificate modal** — image viewer with title/date, filter buttons (certificates page)

---

## Next.js Route & Component Mapping

### App Router Structure

```
src/
├── app/
│   ├── layout.tsx                     ← Root layout: Navbar, Footer, ThemeProvider, viewport theme-color
│   ├── page.tsx                       ← Home (Sanity-driven hero from `homePage` singleton)
│   ├── globals.css                    ← Tailwind + CSS variables + shared styles + navbar/drawer styles
│   ├── project-detail.css             ← Detail page styles (project, resource, travel, review)
│   ├── favicon.ico, icon.svg, icon.png, apple-icon.png ← Favicon kit
│   ├── manifest.webmanifest           ← PWA manifest
│   ├── about/page.tsx + about.css     ← About (Sanity `aboutPage` singleton)
│   ├── blog/page.tsx                  ← Blog hub
│   ├── projects/
│   │   ├── page.tsx                   ← Projects hub
│   │   └── [slug]/page.tsx            ← Project detail (uses `<MediaGallery>`: thumb-swap-inline + click-to-modal; thumbnail leads, gallery items follow — mixed `image | galleryVideo` with per-item `caption`)
│   ├── journey/page.tsx               ← Journey hub
│   ├── resources/
│   │   ├── page.tsx                   ← Resources hub (fetches `resourceTopic` with refs to `resource` | `resourceCategory`)
│   │   └── [slug]/page.tsx            ← Resource Category detail (only built for `resourceCategory` slugs; `resource` items link external)
│   ├── certificates/
│   │   ├── page.tsx                   ← Certificates hub (Airbnb-style issuer filter row + grouped/filtered modes)
│   │   ├── CertificatesContent.tsx    ← Client component: switches between "all" (per-issuer horizontal scroll) and "filtered" (1-col mobile / 4-col desktop grid) modes; cert image modal
│   │   └── certificates.css           ← Filtered-grid + cert modal styles
│   ├── travel/
│   │   ├── page.tsx                   ← Travel hub (`card-grid-filtered` — vertical full-width on mobile)
│   │   └── [slug]/page.tsx            ← Travel detail (uses `<MediaGallery>`: thumb-swap-inline + click-to-modal; thumbnail leads, gallery items follow, every image carries its own `caption`)
│   ├── reviews/
│   │   ├── page.tsx                   ← Reviews hub (`card-grid-filtered`; thumbnail covers, no year overlay)
│   │   └── [year]/page.tsx            ← Review detail (uses `<MediaGallery>`: thumb-swap-inline + click-to-modal; thumbnail leads, gallery items follow, every image carries its own `caption`)
│   └── mentorship/page.tsx            ← Mentorship hub (`card-grid-filtered`)
├── lib/
│   ├── constants.ts                   ← App-wide constants (`JOURNEY_START_YEAR`, `JOURNEY_START_MONTH`, `monthNumber()`)
│   ├── cn.ts                          ← `cn(...inputs)` = `twMerge(clsx(...))` — combine + dedupe Tailwind class names
│   ├── sanity-image-loader.ts         ← Custom `next/image` loader. Routes by hostname: Sanity URLs get `?w=<width>&q=<quality>&auto=format&fit=max` (Sanity serves webp/avif via Accept negotiation); external hosts (img.youtube.com, vumbnail.com) pass through. Wired in `next.config.ts` via `loader: "custom"` + `loaderFile` — opts the whole app out of Next.js's `/_next/image` proxy.
│   └── sanity/
│       ├── client.ts                  ← Sanity client + `sanityFetch` (env-driven via `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET`)
│       ├── types.ts                   ← Shared primitives (`SanityImage`, `SanitySlug`, `SanityProjectGalleryEntry`)
│       ├── index.ts                   ← Barrel re-exporting client + primitives so consumers can `import { sanityFetch } from "@/lib/sanity"`
│       └── queries/                   ← One file per content domain — GROQ strings + result types co-located so they evolve together
│           ├── home.ts, about.ts, projects.ts, blog.ts, journey.ts
│           └── resources.ts, certificates.ts, travel.ts, reviews.ts, mentorship.ts
├── data/                              ← Cross-page static data (page content stays in Sanity)
│   ├── navigation.ts                  ← Top-level nav structure (direct links + dropdowns)
│   └── social-icons.tsx               ← `SOCIAL_ICONS` map keyed by `homePage.socials[].platform`
└── components/                        ← (see Shared Components below)
```

### Shared Components

```
src/components/
├── layout/
│   ├── Navbar.tsx                     ← Sticky transparent navbar with backdrop blur, inline SA monogram, dropdowns, theme toggle, mobile drawer (Tailwind utilities throughout)
│   ├── Footer.tsx                     ← Copyright footer (Tailwind)
│   ├── HubPage.tsx                    ← Outer `<section>` wrapper for hub + system pages: max-w 1440, mx-auto, responsive padding. Used by 12 consumers; fixes the nested-`<main>` bug (layout.tsx already wraps children in `<main>`)
│   ├── HubHeader.tsx                  ← Hub page h1 + optional subtitle. text-3xl extrabold tracking-tight; subtitle is `ReactNode` for flexibility
│   ├── TopicSection.tsx               ← Section wrapper used inside hub pages (Projects categories, Blog series, Journey years, Resources topics, Certificates issuer groups). Optional title; rendered as h2 with responsive sizing (text-2xl → max-md:text-xl → max-sm:text-lg). data-testid="topic-section"
│   ├── CardGrid.tsx                   ← Card grid with `filtered={false|true}` mode. Default: 4-col → 2-col tablet → mobile horizontal-scroll-snap (children sized 80% wide, snap-start, hidden scrollbar). Filtered: 4-col → 2-col → 1-col vertical. Marker class `card-grid` / `card-grid-filtered` preserved for snapshot matching
│   ├── DetailPage.tsx                 ← Outer `<article>` for /projects/[slug], /resources/[slug], /travel/[slug], /reviews/[year]: max-w 640, mx-auto, responsive padding. Also fixes nested-`<main>` bug
│   ├── DetailBack.tsx                 ← Back link with arrow icon. Takes `href` + `label`; renders `<Link>` with hover-color transition
│   └── DetailSection.tsx              ← Section + optional h2 title. Used inside DetailPage for the lowercase section labels (about / features / technology / etc). data-testid="project-section"
├── ui/
│   ├── ThemeProvider.tsx              ← Dark/light mode context + localStorage
│   ├── HubCard.tsx                    ← Thumbnail + title + subtitle card
│   ├── FilterCardRow.tsx + .css       ← Reusable Airbnb-style filter row (logo cards w/ count, 2px solid 20px-radius ring on active, image-shrinks-via-padding so neighbors don't shift, URL-driven via search params, mobile horizontal scroll w/ rubber-band, cards always sized to 1/9-of-row so fewer items leave empty space rather than stretching). When active: `padding: 8px` (6px mobile), `var(--color-bg)` fills the gap, and the image's own `border-radius: 20px` matches the outer ring's radius so both curves read as the same shape — see Airbnb Services page (which uses `clip-path: inset(0 round 20px)` on the image). Used by Certificates, Resources, Blog, Journey, Projects. Note: the `.card-grid-filtered` grid layout (used both for filtered hub results and for non-filter pages like Reviews/Travel/Mentorship) lives in `globals.css`, not here.
│   ├── Modal.tsx + .css                ← Reusable Airbnb-style full-viewport modal: white surface, sticky 80px / 64px topbar (leading / centered title + counter / close), Esc-to-close, fade-in enter, instant close, body scroll-locked.
│   ├── MediaModal.tsx + .css           ← Image/video gallery modal built on `<Modal>`. Track-based slider with Airbnb's spring easing on desktop (JS-controlled translateX, prev/next buttons + keyboard arrows with shrink-on-press), and native `scroll-snap-type: x mandatory` on mobile (no nav arrows, free swipe + momentum, 28px gap between slots). Handles YouTube + Vimeo URLs (autoplay + timestamp). `MediaModalItem.caption` overrides the topbar title per item; falls back to the modal-level `title` prop.
│   ├── MediaGallery.tsx                ← Inline hero image + thumbnail strip that opens `<MediaModal>` on hero click. Thumb click swaps the inline hero (Option B "browse-then-expand"). Active thumb visual mirrors `FilterCardRow`: outer box stays the same size, image shrinks via padding, ring drawn with `box-shadow: inset` + `var(--color-bg)` filling the gap; the play-icon overlay on video thumbs is also inset on active so the ring and rounded corners aren't overlapped. Videos render a static preview frame (`img.youtube.com` for YouTube, `vumbnail.com` proxy for Vimeo) with a play overlay, then play full-size in the modal. Used by Reviews / Travel / Projects detail.
│   ├── ExpandText.tsx                 ← Expandable paragraph with animation
│   └── SocialTile.tsx                 ← Icon tile with brand-color hover
└── sections/
    ├── ContributionsBentoCreative.tsx ← About-page Contributions bento. 6 fixed slots in a 4×3 grid (`"a a b c" / "a a b d" / "e e e f"`), each slot rendering a different visual format: FeatureHero (LinkedIn), CommunityCard (UzTech), ContributionGraphCard (GitHub), QuoteCard (Publink), ArticlePreviewCard (Medium), CodeBracketsCard (LeetCode). LinkedIn pulls the 5 most recent `journeyUpdate` docs (with thumbnails + "Month N" labels derived from a journey-start of Oct 2023); Medium pulls the latest `blogArticle`. Slot mapping is by array order — reordering `aboutPage.contributions` swaps slots.
    └── HobbiesList.tsx                ← Hobby pills (props from `aboutPage.hobbies`)
```

---

## Sanity CMS Schema Plan

> Sanity Studio lives in a **separate repository**. Schemas below define the content model.

### Document Types

| Type | Description | Key Fields |
|------|-------------|------------|
| `homePage` | Home page content (singleton) | `name`, `title`, `subtitle`, `location`, `profileImage`, `socials[]` {platform, url, icon}, `resumeFile`, `ctaLinks[]` {label, url} |
| `aboutPage` | About page content (singleton) | `profileImage`, `bioParagraphs[]` {summary, expandedText}, `contributions[]` {title, description, url, tag, subtitle, channelName, channelStatus, activities[]}, `hobbies[]` {emoji, label}. Order of `contributions[]` maps to the 6 bento slots (LinkedIn → UzTech → GitHub → Publink → Medium → LeetCode). `tag` is shown in every slot; the others are only used by their specific slots (`subtitle` → Quote/Publink; `channelName`/`channelStatus`/`activities` → Community/UzTech). |
| `project` | Portfolio project. Membership in a category + display order both come from `projectCategory.projects[]` (containment) — there is no `category` or `order` field on the project itself. | `title`, `slug`, `description`, `about`, `features[]`, `techStack[]`, `thumbnail` (`image` with `caption`; hub card cover & first item in detail-page gallery), `gallery[]` (mixed: `image` items with `caption`, or `galleryVideo` items with `videoUrl` + `caption`), `liveUrl`, `githubUrl`. Captions show as the modal's per-item title. |
| `projectCategory` | Filter card on the Projects hub (Personal, Freelance, Hackathon). Owns its projects in display order via `projects[]`. D&D-orderable in Studio via `orderRank`. | `title`, `slug`, `logo`, `projects[]` → ref `project`, `orderRank` |
| `blogSeries` | Blog series grouping. `shortTitle` is the compact label shown on the filter card on `/blog` (falls back to `title`). D&D-orderable in Studio via `orderRank`. Article position inside the series IS the part number — rendered on the website as `Part ${i + 1}` from the array index. | `title`, `slug`, `shortTitle`, `logo`, `articles[]` → ref `blogArticle`, `orderRank` |
| `blogArticle` | Individual blog post. Studio sorts the flat list by `date desc` (newest-first). Inside `blogSeries.articles[]`, articles are listed oldest-first so Part 1 = chronological start. | `title`, `date` (date type, ISO YYYY-MM-DD), `externalUrl`, `thumbnail` |
| `resource` | Single external resource (tool/app/library) shown as a hub card with no detail page. Studio's "All Resources" list is sorted alphabetically by title — actual hub ordering on the website comes from each Resource Topic's `items[]` array. | `title`, `slug`, `subtitle`, `thumbnail`, `externalUrl` |
| `resourceCategory` | Curated category with its own detail page on `/resources/{slug}`. D&D-orderable in Studio via `orderRank`. Single-section pages = one entry in `sections[]`. | `title`, `slug`, `subtitle`, `thumbnail`, `sections[]` {label, items[] {name, desc, url}}, `orderRank` |
| `resourceTopic` | Hub-page grouping (e.g. Tools, Apps, Playbooks) — also acts as filter card on `/resources`. Holds an ordered array of references that can target either `resource` or `resourceCategory`. D&D-orderable in Studio via `orderRank`. | `title`, `slug`, `logo`, `orderRank`, `items[]` → ref `resource` \| `resourceCategory` |
| `certificate` | Certificate entry. Membership in an issuer + display order both come from `certificateIssuer.certificates[]` (containment) — there is no `issuer` ref or `order` field on the cert itself. Studio sorts the flat "All Certificates" list by `date desc`. | `title`, `date` (date type — month-precision sources use `YYYY-MM-01`), `image`, `verifyUrl` |
| `certificateIssuer` | Source that issued one or more certificates (e.g. Coursera, CS50, HackerRank). Filter card on `/certificates`. Owns its certificates in display order via `certificates[]`. D&D-orderable in Studio via `orderRank`. | `name`, `slug`, `logo`, `certificates[]` → ref `certificate`, `orderRank` |
| `travelDestination` | Travel country/location. D&D-orderable in Studio via `orderRank`. `placesToTravel[].city` uses a custom dropdown input (`components/CityInput.tsx`) populated from sibling `overview.citiesVisited` so editors pick from a known list. | `title`, `slug`, `flag`, `thumbnail` (`image` with `caption`; hub card cover & first item in detail-page gallery), `gallery[]` (`image` items, each with `caption`), `overview` {citiesVisited[], accommodation[]}, `placesToTravel[]` {city (dropdown), places[]}, `personalTips[]`, `sections[]`, `orderRank`. Captions show as the modal's per-item title. |
| `yearlyReview` | Yearly review. Sorted by `year desc` via `defaultOrdering` — no D&D needed. | `year`, `slug`, `thumbnail` (required — `image` with `caption` field; hub card cover & first item in detail-page gallery), `gallery[]` (`image` items, each with `caption`), `sections[]` {title, items[]}. Captions are shown as the modal's centered top-bar title per item. |
| `journeyUpdate` | Monthly journey entry published on LinkedIn. Single `date` field stores the publish date (1st of the month AFTER the recap month — Sam publishes once each month ends). Studio + website sort by `date desc`. Website derives the recap year for hub grouping via `recapYear()` and the "Month N" label via `monthNumber()`. | `title`, `date` (date type, publish date), `thumbnail`, `linkedInUrl` |
| `journeyYear` | Filter card on the Journey hub (one per year that has updates). Sorted by `year desc` via schema `orderings` — no D&D needed. | `year`, `slug`, `logo` |
| `mentorshipArticle` | Mentorship article. Studio + website sort by `date desc`. | `title`, `slug`, `task`, `date` (date type), `thumbnail`, `externalUrl` |
| `siteSettings` | Global settings (singleton) | `siteTitle`, `footerText`, `navLinks[]`, `socialLinks[]` |

**Phase 12 schema migration notes:**
- **Drag-and-drop ordering** via `@sanity/orderable-document-list`: 6 doc types gained an `orderRank` string field (lexicographically sorted) and lost their integer `order` field. Affected: `projectCategory`, `blogSeries`, `resourceTopic`, `certificateIssuer`, `travelDestination`, `resourceCategory`.
- **Date-based ordering** via `defaultOrdering` on the desk's `documentTypeList`: `certificate`, `blogArticle`, `mentorshipArticle`, `journeyUpdate` sort newest-first; `yearlyReview`, `journeyYear` sort by year desc.
- **Containment refactor**: parent docs own child IDs + ordering in an array, instead of children holding refs to parents. `projectCategory.projects[]` replaces `project.category`+`project.order`; `certificateIssuer.certificates[]` replaces `certificate.issuer`+`certificate.order`. The parent's array is the single source of truth for membership *and* display order.
- **Date type migration**: `certificate.date`, `blogArticle.date`, `mentorshipArticle.date` migrated from `string` → `date`. `journeyUpdate` consolidated `month` + `year` + `order` into a single `date` field (publish date semantics). Studio shows a date picker; website formats via `formatMonthYear` / `formatLongDate` in `src/lib/dates.ts`.
- **resourceCategory simplified**: dropped the legacy `sectionLabel + items[]` shape; everything flows through `sections[]`. Single-section pages just have one entry in `sections[]` with a label.
- **resource lost orderRank**: hub ordering for resources comes from each Resource Topic's `items[]`, not the resource doc. Studio's "All Resources" list now sorts alphabetically by title.
- **blogArticle.partNumber removed**: derived from index in `blogSeries.articles[]` (1-based).
- **Travel City dropdown**: `placesToTravel[].city` uses a custom `<CityInput>` component (`portfolio-sanity/components/CityInput.tsx`) that reads sibling `overview.citiesVisited[]` via Sanity's `useFormValue` hook and renders a `<Select>`. Disabled with hint when source array is empty.

---

## Roadmap

Phases 1–13 are complete. Phase 14 is code-complete; the only remaining work is dashboard-level (Sanity webhook config, Vercel env var, GitHub repo visibility flip) — see PLAN.md Phase 14 for the manual checklist.

| # | Phase | Scope | State |
|---|---|---|---|
| 7 | Cleanup & Audit | Read-only inventory: dead code, `"use client"` overuse, hardcoded data, sensitive data, naming, version cruft. Report → approve → execute | ✅ |
| 8 | Reorganize structure | Move static data, extract GROQ queries to `src/lib/sanity/queries/`, split `sanity-types.ts`, add `loading.tsx`/`error.tsx`, apply naming fixes | ✅ |
| 9 | Playwright E2E baseline | Per-route happy paths + critical interactions (filters, modals, theme toggle, mobile drawer). Becomes regression net for everything after | ✅ |
| 10 | Tailwind migration (hybrid) | Bucket components → migrate pure-utility + hybrid; retain CSS for keyframes / complex compounds, realigned to design tokens. Add `clsx` + `tailwind-merge` | ✅ |
| 11 | next/image migration | Custom Sanity loader, decide `sizes` per usage pattern, replace `<img>` site-wide | ✅ |
| 12 | Sanity Studio refactor (`../portfolio-sanity`) | Flat desk + `@sanity/icons` + orderable D&D plugin, containment refactor (drop `project.category`/`certificate.issuer`/`blogArticle.partNumber`, add `projects[]`/`certificates[]` arrays), inlined seeder data, AI gallery image restoration, date type migration, Travel City dropdown, simplified `resourceCategory`. Seeder split (fixtures vs example) folded into Phase 14. | ✅ |
| 13 | Performance + a11y | Skip link, ARIA audit (dropdowns, theme toggle, ExpandText), contrast audit (AA passing — kept), light/dark icon swap, animated state pages. Modal focus trap + lazy-load deferred to BACKLOG. | ✅ |
| 14 | Public repo prep + deploy | Env-ified Sanity IDs, `.env.example` for both repos, READMEs, LICENSE, OG image (auto-generated via ImageResponse), per-route metadata, on-demand revalidation webhook, Vercel Analytics + Speed Insights. Seeder split deferred to BACKLOG. **Manual final**: configure Sanity webhook + revalidate secret in Vercel, flip both repos public on GitHub. | 🟡 (code done, dashboards pending) |

See [PLAN.md](./PLAN.md) for the full task list with progress tracking and per-phase checklists.
