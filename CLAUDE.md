# Portfolio Migration — CLAUDE.md

## Project Overview

| Field | Value |
|-------|-------|
| **Owner** | Sam Abdullaev — Frontend Software Engineer |
| **Purpose** | Personal portfolio showcasing projects, blog, travel, certificates, mentorship, and more |
| **Current State** | Static HTML/CSS/JS site in `site/` (50 HTML files, 9 CSS files, 150+ assets) |
| **Target State** | Next.js app (this repo) + Sanity CMS (separate repo) |
| **Tech Stack** | Next.js 16.2, React 19, TypeScript, Tailwind v4, Sanity |
| **Design** | Light (#fff7f3) / Dark (#171717) theming, Inter font, responsive (5 breakpoints) |

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
| `--color-bg` | `#fff7f3` | `#171717` |
| `--color-card` | `#fff` | `#222222` |
| `--color-border` | `#ebebeb` | `#333333` |
| `--color-hover` | `#f7f7f7` | `#2a2a2a` |

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
src/app/
├── layout.tsx                         ← Root layout: Navbar, Footer, ThemeProvider
├── page.tsx                           ← Home (hero)
├── about/page.tsx                     ← About
├── blog/page.tsx                      ← Blog hub
├── projects/
│   ├── page.tsx                       ← Projects hub
│   └── [slug]/page.tsx                ← Project detail
├── journey/page.tsx                   ← Journey hub
├── resources/
│   ├── page.tsx                       ← Resources hub
│   └── [slug]/page.tsx                ← Resource detail
├── certificates/page.tsx              ← Certificates hub
├── travel/
│   ├── page.tsx                       ← Travel hub
│   └── [slug]/page.tsx                ← Travel detail
├── reviews/
│   ├── page.tsx                       ← Reviews hub
│   └── [year]/page.tsx                ← Review detail
├── mentorship/page.tsx                ← Mentorship hub
└── globals.css                        ← Tailwind + CSS variables
```

### Shared Components

```
src/components/
├── layout/
│   ├── Navbar.tsx                     ← Sticky nav with dropdowns, theme toggle
│   └── Footer.tsx                     ← Copyright footer
├── ui/
│   ├── ThemeProvider.tsx              ← Dark/light mode context + localStorage
│   ├── CardGrid.tsx                   ← Reusable grid with "Show all" expansion
│   ├── HubCard.tsx                    ← Thumbnail + title + subtitle card
│   ├── Modal.tsx                      ← Shared modal (Escape, click-outside)
│   ├── Gallery.tsx                    ← Main image + thumbnail strip + video modal
│   ├── ExpandText.tsx                 ← Expandable paragraph with animation
│   ├── SocialTile.tsx                 ← Icon tile with brand-color hover
│   └── FilterBar.tsx                  ← Pill-style filter buttons (certificates)
└── sections/
    ├── HeroSection.tsx                ← Home page hero
    ├── AboutSection.tsx               ← Bio with photo + expand buttons
    ├── ContributionsGrid.tsx          ← Linked contribution cards
    └── HobbiesList.tsx                ← Hobby pills
```

---

## Sanity CMS Schema Plan

> Sanity Studio lives in a **separate repository**. Schemas below define the content model.

### Document Types

| Type | Description | Key Fields |
|------|-------------|------------|
| `homePage` | Home page content (singleton) | `name`, `title`, `subtitle`, `location`, `profileImage`, `socials[]` {platform, url, icon}, `resumeFile`, `ctaLinks[]` {label, url} |
| `aboutPage` | About page content (singleton) | `profileImage`, `bioParagraphs[]` {summary, expandedText}, `contributions[]` {emoji, title, description, url}, `hobbies[]` {emoji, label} |
| `project` | Portfolio project | `title`, `slug`, `category` (personal/freelance/hackathon), `description`, `about`, `features[]`, `techStack[]`, `gallery[]` {type, image/videoUrl}, `metadata` {year, timeline, role}, `links[]` {label, url}, `thumbnail`, `order` |
| `blogSeries` | Blog series grouping | `title`, `slug`, `partCount`, `articles[]` → ref `blogArticle`, `order` |
| `blogArticle` | Individual blog post | `title`, `slug`, `subtitle`, `date`, `externalUrl`, `thumbnail`, `partNumber` |
| `resourceCategory` | Resource grouping | `title`, `slug`, `description`, `thumbnail`, `icon`, `items[]` {name, description, url}, `order` |
| `certificate` | Certificate entry | `title`, `issuer`, `date`, `category`, `image`, `verifyUrl` |
| `travelDestination` | Travel country/location | `title`, `slug`, `thumbnail`, `flagEmoji`, `gallery[]`, `sections[]` {title, content}, `order` |
| `yearlyReview` | Yearly review | `year`, `slug`, `gradientColors` {from, to}, `sections[]` {title, content} |
| `journeyUpdate` | Monthly journey entry | `title`, `month`, `year`, `theme`, `thumbnail`, `linkedInUrl` |
| `mentorshipArticle` | Mentorship article | `title`, `slug`, `task`, `date`, `thumbnail`, `externalUrl` |
| `siteSettings` | Global settings (singleton) | `siteTitle`, `footerText`, `navLinks[]`, `socialLinks[]` |

---

## Task List

### Phase 1: Foundation
- [x] Replace existing `globals.css` with portfolio design system (CSS variables, Inter font, light/dark tokens)
- [x] Create `ThemeProvider.tsx` — client component with `localStorage` + system preference detection
- [x] Create `Navbar.tsx` — sticky nav, logo link, dropdown menus (Writing/Life/Learning), active states, theme toggle, mobile responsive with fixed dropdowns
- [x] Create `Footer.tsx` — centered copyright text
- [x] Update `layout.tsx` — wrap children with ThemeProvider, Navbar, Footer; flex column with `min-height: 100dvh`
- [x] Set up Tailwind v4 theme tokens to match CSS variables (colors, fonts, breakpoints)

### Phase 2: Home & About Pages (CMS-driven)
- [x] Create `src/app/page.tsx` — hero section: profile photo, name, title, location, social tiles, resume download, CTA button
- [x] Create `SocialTile.tsx` — icon tile with brand-color hover (LinkedIn blue, GitHub neutral, Medium neutral)
- [x] Create `src/app/about/page.tsx` — about page with bio, contributions, hobbies
- [x] Create about-row layout — side-by-side (text left, sticky photo right), mobile stacks photo first
- [x] Create `ExpandText.tsx` — paragraph with inline expand button, fade-in animation for hidden content
- [x] Create `ContributionsGrid.tsx` — 2-column grid of linked cards with emoji + title + description
- [x] Create `HobbiesList.tsx` — flex-wrap pill list with emoji + label

### Phase 3: Hub Pages
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

### Phase 4: Detail Pages
- [ ] Create `src/app/projects/[slug]/page.tsx` — back link, category badge, gallery, about, features, tech pills, metadata, links. Fetch from Sanity by slug
- [ ] Create `Gallery.tsx` — main image display + thumbnail strip, click to swap. Support video thumbnails
- [ ] Create video modal — iframe overlay, autoplay on open, close on Escape/click-outside/close button
- [ ] Create `src/app/resources/[slug]/page.tsx` — back link, title, description, resource list with external links. Fetch from Sanity
- [ ] Create `src/app/travel/[slug]/page.tsx` — back link, country header, gallery, content sections. Fetch from Sanity
- [ ] Create `src/app/reviews/[year]/page.tsx` — back link, year title, review content. Fetch from Sanity
- [ ] Generate static params for all detail routes using `generateStaticParams()`

### Phase 5: Sanity Setup (separate repo)
- [ ] Initialize Sanity project with Studio
- [ ] Create schema: `homePage` (singleton) — name, title, subtitle, location, profileImage, socials, resumeFile, ctaLinks
- [ ] Create schema: `aboutPage` (singleton) — profileImage, bioParagraphs, contributions, hobbies
- [ ] Create schema: `project` — all fields from mapping above
- [ ] Create schema: `blogSeries` + `blogArticle`
- [ ] Create schema: `resourceCategory`
- [ ] Create schema: `certificate`
- [ ] Create schema: `travelDestination`
- [ ] Create schema: `yearlyReview`
- [ ] Create schema: `journeyUpdate`
- [ ] Create schema: `mentorshipArticle`
- [ ] Create schema: `siteSettings` (singleton)
- [ ] Populate all content from static site into Sanity

### Phase 6: Sanity Integration (this repo)
- [ ] Install `next-sanity` and `@sanity/image-url` packages
- [ ] Create `src/lib/sanity/client.ts` — Sanity client configuration
- [ ] Create `src/lib/sanity/queries.ts` — GROQ queries for each page
- [ ] Create `src/lib/sanity/image.ts` — image URL builder helper
- [ ] Wire up all pages to fetch from Sanity instead of hardcoded data
- [ ] Migrate static images from `site/assets/` to Sanity CDN
- [ ] Set up ISR or on-demand revalidation for content updates

### Phase 7: Polish & Deploy
- [ ] Add `<head>` metadata + OG images for all pages
- [ ] Add `next/image` optimization for all images
- [ ] Lazy-load offscreen card grids and images
- [ ] Test full light/dark mode across all pages
- [ ] Test responsive layout at all 5 breakpoints
- [ ] Run Lighthouse audit and fix performance issues
- [ ] Configure deployment (Vercel)
- [ ] Set up Sanity webhook for on-demand revalidation
