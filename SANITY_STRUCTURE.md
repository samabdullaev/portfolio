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
│   │   ├── galleryVideo.ts             ← { videoUrl, caption } — used inside project.gallery alongside plain images
│   │   └── socialLink.ts               ← { platform, url }
│   ├── singletons/
│   │   ├── homePage.ts
│   │   ├── aboutPage.ts
│   │   └── siteSettings.ts
│   └── documents/
│       ├── project.ts
│       ├── projectCategory.ts          ← Filter card on /projects (Personal, Freelance, Hackathon) — matched by `project.category` slug
│       ├── blogSeries.ts, blogArticle.ts ← blogSeries also acts as filter card on /blog (uses shortTitle + logo fields)
│       ├── resource.ts                 ← Single external resource (hub card, no detail page)
│       ├── resourceCategory.ts         ← Curated category with detail page on /resources/{slug}
│       ├── resourceTopic.ts            ← Hub grouping (Tools, Apps, Playbooks, …) — also filter card on /resources
│       ├── certificate.ts
│       ├── certificateIssuer.ts        ← Filter card on /certificates — referenced by certificate.issuer
│       ├── travelDestination.ts
│       ├── yearlyReview.ts
│       ├── journeyUpdate.ts
│       ├── journeyYear.ts              ← Filter card on /journey — matched by `journeyUpdate.year` number
│       └── mentorshipArticle.ts
└── seeders/
    ├── seed.ts                         ← CLI runner (`pnpm seed up [name…]` / `down`)
    ├── helpers.ts                      ← uploadImage, imageRef, key()
    ├── singletons.seeder.ts            ← Home, About, SiteSettings (text content)
    ├── projects.seeder.ts
    ├── project-categories.seeder.ts    ← 3 categories with their logos (Personal, Freelance, Hackathon)
    ├── blog.seeder.ts
    ├── blog-series-images.seeder.ts    ← Patches the 4 series with shortTitle + logo (without touching article thumbnails)
    ├── journey.seeder.ts
    ├── journey-years.seeder.ts         ← 4 year documents (2023–2026) with their logos
    ├── certificates.seeder.ts
    ├── certificate-issuers.seeder.ts   ← 9 issuer documents with their logos
    ├── mentorship.seeder.ts
    ├── travel.seeder.ts
    ├── resources.seeder.ts             ← All 34 resources/categories with thumbnails
    ├── resource-topics.seeder.ts       ← 8 hub-grouping documents with logos + mixed-type refs
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

**aboutPage** — `profileImage, bioParagraphs[]{ summary, expandedText }, contributions[]{ title, description, url, tag, subtitle?, channelName?, channelStatus?, activities[]? }, hobbies[]{ emoji, label }` (contributions array order maps to the 6 bento slots — LinkedIn, UzTech, GitHub, Publink, Medium, LeetCode. `tag` is the uppercase pill label shown on every card; `subtitle` is rendered only on the Quote/Publink slot; `channelName`/`channelStatus`/`activities` are rendered only on the Community/UzTech slot)

**siteSettings** — `siteTitle, footerText, navLinks[]`

### Documents

**project** — `title, slug, category, description, about, features[], techStack[], thumbnail{ caption }, gallery[]{ caption | videoUrl + caption }, liveUrl, githubUrl, order` (thumbnail leads the detail-page `<MediaGallery>`; gallery entries follow, mixing screenshots and YouTube/Vimeo videos. Every entry — image or video — carries its own `caption` shown as the modal title)

**projectCategory** — `title, slug, logo, order` (filter card on `/projects` — matched against `project.category` by slug)

**blogSeries** — `title, slug, shortTitle, logo, articles[] → ref blogArticle, order` (also acts as filter card on `/blog`; `shortTitle` is the compact filter label)

**blogArticle** — `title, partNumber, date, externalUrl, thumbnail`

**resource** — `title, slug, subtitle, thumbnail, externalUrl` (single external link card; no detail page)

**resourceCategory** — `title, slug, subtitle, thumbnail, sectionLabel, items[]{ name, desc, url }, sections[]{ label, items[] }` (curated category with detail page on `/resources/{slug}`)

**resourceTopic** — `title, slug, logo, order, items[] → ref (resource | resourceCategory)` (hub-page grouping; also filter card on `/resources`; mixed-type references)

**certificate** — `title, issuer → ref certificateIssuer, date, image, verifyUrl, order`

**certificateIssuer** — `name, slug, logo, order` (filter card on `/certificates`; reference target for `certificate.issuer`)

**travelDestination** — `title, slug, flag, thumbnail{ caption }, gallery[]{ caption }, overview, placesToTravel[], personalTips[], sections[], order` (thumbnail leads the detail-page `<MediaGallery>`; every image — thumbnail and gallery items — carries its own `caption` shown as the modal title)

**yearlyReview** — `year, slug, thumbnail{ caption }, gallery[]{ caption }, sections[]{ title, items[] }` (thumbnail drives the hub card and leads the detail-page gallery; every image — thumbnail and gallery items — carries its own `caption` shown as the modal title)

**journeyUpdate** — `title, month, year, thumbnail, linkedInUrl, order`

**journeyYear** — `year, slug, logo, order` (filter card on `/journey` — matched against `journeyUpdate.year` by number)

**mentorshipArticle** — `title, task, date, thumbnail, externalUrl`

---

## Common Workflows

**Add a new external resource:** create a `Resource` document (Studio sidebar → Resources → +). Then open any `Resource Topic` and add a reference to it.

**Add a new curated category with detail page:** create a `Resource Category` (sidebar → Resource Categories → +). Fill `items` or `sections`. Then add a reference to it from a `Resource Topic`.

**Add a new topic group on the hub:** create a `Resource Topic` (sidebar → Resource Topics → +) with title + ordered `items` references.

**Re-seed after schema or data changes:** from `portfolio-sanity/`, run e.g. `pnpm seed up resources resource-topics`. Run `pnpm run deploy` to publish schema changes to the hosted Studio.
