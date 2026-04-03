# Portfolio Migration — CLAUDE.md

## Project Overview

| Field | Value |
|-------|-------|
| **Owner** | Sam Abdullaev — Frontend Software Engineer |
| **Purpose** | Personal portfolio showcasing projects, blog, travel, certificates, mentorship, and more |
| **Current State** | Static HTML/CSS/JS site in `site/` (50 HTML files, 9 CSS files, 150+ assets) |
| **Target State** | Next.js app (this repo) + JSON data files + API routes (Sanity deferred) |
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
src/
├── app/
│   ├── layout.tsx                     ← Root layout: Navbar, Footer, ThemeProvider
│   ├── page.tsx                       ← Home (hero)
│   ├── globals.css                    ← Tailwind + CSS variables + all shared styles
│   ├── project-detail.css             ← Detail page styles (project, resource, travel, review)
│   ├── about/page.tsx                 ← About
│   ├── blog/page.tsx                  ← Blog hub
│   ├── projects/
│   │   ├── page.tsx                   ← Projects hub
│   │   └── [slug]/page.tsx            ← Project detail
│   ├── journey/page.tsx               ← Journey hub
│   ├── resources/
│   │   ├── page.tsx                   ← Resources hub
│   │   └── [slug]/page.tsx            ← Resource detail
│   ├── certificates/
│   │   ├── page.tsx                   ← Certificates hub (grouped by issuer)
│   │   └── certificates.css           ← Certificate modal styles
│   ├── travel/
│   │   ├── page.tsx                   ← Travel hub
│   │   └── [slug]/page.tsx            ← Travel detail
│   ├── reviews/
│   │   ├── page.tsx                   ← Reviews hub
│   │   ├── reviews.css                ← Year gradient styles
│   │   └── [year]/page.tsx            ← Review detail
│   ├── mentorship/page.tsx            ← Mentorship hub
│   └── api/                           ← API routes (JSON data endpoints)
│       ├── projects/[slug]/route.ts
│       ├── resources/[slug]/route.ts
│       ├── travel/[slug]/route.ts
│       └── reviews/[year]/route.ts
├── data/                              ← JSON data files (source of truth until Sanity)
│   ├── projects.json                  ← 14 projects
│   ├── resources.json                 ← 11 resource categories
│   ├── travel.json                    ← 11 destinations
│   └── reviews.json                   ← 5 yearly reviews
└── components/                        ← (see Shared Components below)
```

### Shared Components

```
src/components/
├── layout/
│   ├── Navbar.tsx                     ← Sticky nav with dropdowns, theme toggle
│   └── Footer.tsx                     ← Copyright footer
├── ui/
│   ├── ThemeProvider.tsx              ← Dark/light mode context + localStorage
│   ├── TopicSection.tsx               ← Section with header + card grid + Show All/Show Less
│   ├── CardGrid.tsx                   ← Simple grid wrapper (no state)
│   ├── HubCard.tsx                    ← Thumbnail + title + subtitle card
│   ├── Gallery.tsx                    ← Main image + thumbnail strip + video modal
│   ├── VideoModal.tsx                 ← YouTube iframe overlay with autoplay
│   ├── ExpandText.tsx                 ← Expandable paragraph with animation
│   └── SocialTile.tsx                 ← Icon tile with brand-color hover
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

See [PLAN.md](./PLAN.md) for the full task list with progress tracking.
