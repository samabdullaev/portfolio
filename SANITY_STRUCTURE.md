# Sanity CMS Integration — Portfolio

## Architecture

The Sanity Studio lives in a **sibling repository** at `../portfolio-sanity/`. The Next.js app in this repo reads from Sanity via a small client; nothing about Sanity is embedded here other than the client + types.

```
portfolio/                              ← This repo (Next.js app)
└── src/
    ├── lib/
    │   ├── sanity.ts                   ← Client (projectId p43tljnq, dataset production) + sanityFetch helper
    │   └── sanity-types.ts             ← Manual TypeScript shapes for query responses
    └── app/                            ← Pages fetch via sanityFetch (no JSON, no API routes)

../portfolio-sanity/                    ← Separate Studio repo
├── sanity.config.ts                    ← Studio config + sidebar structure
├── sanity.cli.ts                       ← Project info for CLI commands
├── schemaTypes/
│   ├── index.ts                        ← Exports all types
│   ├── objects/
│   │   ├── galleryItem.ts              ← { type, image/videoUrl }
│   │   └── socialLink.ts               ← { platform, url }
│   ├── singletons/
│   │   ├── homePage.ts
│   │   ├── aboutPage.ts
│   │   └── siteSettings.ts
│   └── documents/
│       ├── project.ts
│       ├── blogSeries.ts, blogArticle.ts
│       ├── resource.ts                 ← Single external resource (hub card, no detail page)
│       ├── resourceCategory.ts         ← Curated category with detail page on /resources/{slug}
│       ├── resourceTopic.ts            ← Hub grouping (Tools, Apps, Playbooks, …)
│       ├── certificate.ts
│       ├── travelDestination.ts
│       ├── yearlyReview.ts
│       ├── journeyUpdate.ts
│       └── mentorshipArticle.ts
└── seeders/
    ├── seed.ts                         ← CLI runner (`pnpm seed up [name…]` / `down`)
    ├── helpers.ts                      ← uploadImage, imageRef, key()
    ├── singletons.seeder.ts            ← Home, About, SiteSettings (text content)
    ├── projects.seeder.ts
    ├── blog.seeder.ts
    ├── journey.seeder.ts
    ├── certificates.seeder.ts
    ├── mentorship.seeder.ts
    ├── travel.seeder.ts
    ├── reviews.seeder.ts
    ├── resources.seeder.ts             ← All 34 resources/categories with thumbnails
    ├── resource-topics.seeder.ts       ← 8 hub-grouping documents with mixed-type refs
    ├── resource-images.seeder.ts       ← (legacy) only the 11 category thumbnails
    ├── images.seeder.ts                ← Profile/resume + bulk image uploads
    └── assets/                         ← Image source files for seeding
```

---

## Key Patterns

### Client Setup (`src/lib/sanity.ts`)
- Public `projectId` + `dataset` hardcoded (no env vars for reads).
- Uses `@sanity/client` directly. CDN on in production.

### Image Handling
- No `@sanity/image-url`. Use `asset->{ url }` in GROQ projections, render `<img src={url}>`.
- Sanity CDN URLs are inlined; no Next.js `remotePatterns` config needed.

### Singletons
- `homePage`, `aboutPage`, `siteSettings` pinned to fixed `_id`s.
- `singletonTypes` Set in `sanity.config.ts` hides "Create new" in Studio for these.

### Collection Documents
- Slug fields generated from `title` via `source: 'title'`.
- `order` field for manual sorting where applicable.

### Queries
- Co-located with the page that uses them.
- Explicit field projections; always project `_key` on arrays of objects.

### Seeder System
- Self-contained — each seeder defines its data inline (no JSON dependencies).
- `pnpm seed up <name>` runs a single seeder; `pnpm seed up` runs all.
- `down` reverses by deleting the documents the seeder created.

---

## Schema Summary

### Singletons

**homePage** — `name, title, subtitle, location, profileImage, socials[], resumeFile, ctaLabel, ctaUrl`

**aboutPage** — `profileImage, bioParagraphs[]{ summary, expandedText }, contributions[]{ emoji, title, description, url }, hobbies[]{ emoji, label }`

**siteSettings** — `siteTitle, footerText, navLinks[]`

### Documents

**project** — `title, slug, category, description, about, features[], techStack[], gallery[]{ type, image/videoUrl }, liveUrl, githubUrl, thumbnail, order`

**blogSeries** — `title, slug, order, articles[] → ref blogArticle`

**blogArticle** — `title, partNumber, date, externalUrl, thumbnail`

**resource** — `title, slug, subtitle, thumbnail, externalUrl` (single external link card; no detail page)

**resourceCategory** — `title, slug, subtitle, thumbnail, sectionLabel, items[]{ name, desc, url }, sections[]{ label, items[] }` (curated category with detail page on `/resources/{slug}`)

**resourceTopic** — `title, order, items[] → ref (resource | resourceCategory)` (hub-page grouping; mixed-type references)

**certificate** — `title, issuer, date, category, image, verifyUrl`

**travelDestination** — `title, slug, flag, thumbnail, overview, placesToTravel[], personalTips[], order`

**yearlyReview** — `year, slug, gradient[2], sections[]{ title, items[] }`

**journeyUpdate** — `title, month, year, theme, thumbnail, linkedInUrl`

**mentorshipArticle** — `title, task, date, thumbnail, externalUrl`

---

## Common Workflows

**Add a new external resource:** create a `Resource` document (Studio sidebar → Resources → +). Then open any `Resource Topic` and add a reference to it.

**Add a new curated category with detail page:** create a `Resource Category` (sidebar → Resource Categories → +). Fill `items` or `sections`. Then add a reference to it from a `Resource Topic`.

**Add a new topic group on the hub:** create a `Resource Topic` (sidebar → Resource Topics → +) with title + ordered `items` references.

**Re-seed after schema or data changes:** from `portfolio-sanity/`, run e.g. `pnpm seed up resources resource-topics`. Run `pnpm run deploy` to publish schema changes to the hosted Studio.
