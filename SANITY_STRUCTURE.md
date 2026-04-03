# Sanity CMS Integration Plan — Portfolio

## Architecture (based on al-khorezmi pattern)

```
portfolio/
├── sanity/                          ← Separate Sanity Studio (new)
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   ├── schemaTypes/
│   │   ├── index.ts                 ← Exports all types
│   │   ├── objects/
│   │   │   ├── galleryItem.ts       ← { type, image/videoUrl }
│   │   │   └── socialLink.ts        ← { platform, url, icon }
│   │   ├── singletons/
│   │   │   ├── homePage.ts
│   │   │   ├── aboutPage.ts
│   │   │   └── siteSettings.ts      ← navbar, footer, social links
│   │   └── documents/
│   │       ├── project.ts
│   │       ├── blogSeries.ts
│   │       ├── blogArticle.ts
│   │       ├── resourceCategory.ts
│   │       ├── certificate.ts
│   │       ├── travelDestination.ts
│   │       ├── yearlyReview.ts
│   │       ├── journeyUpdate.ts
│   │       └── mentorshipArticle.ts
│   └── seeders/
│       ├── seed.ts                  ← CLI runner (pnpm seed up/down)
│       ├── helpers.ts               ← uploadImage, imageRef, key()
│       ├── projects.seeder.ts       ← Seeds from src/data/projects.json
│       ├── resources.seeder.ts
│       ├── travel.seeder.ts
│       ├── reviews.seeder.ts
│       ├── certificates.seeder.ts
│       ├── blog.seeder.ts
│       ├── journey.seeder.ts
│       └── assets/                  ← Copied from site/assets/ for seeding
│
└── src/                             ← Existing Next.js app (modified)
    ├── lib/
    │   ├── sanity.ts                ← Client + sanityFetch wrapper
    │   └── sanity-types.ts          ← Manual TypeScript interfaces
    └── app/
        └── (pages fetch via sanityFetch instead of JSON import)
```

---

## Key Patterns (from al-khorezmi)

### Client Setup (`src/lib/sanity.ts`)
- Hardcode public `projectId` + `dataset` (no env vars for reads)
- Two clients: `sanityFetch` (CDN) and `sanityFetchFresh` (no CDN)
- Use `@sanity/client` directly, not `next-sanity` wrapper

### Image Handling
- No `@sanity/image-url` — use `asset->{ url }` in GROQ projections
- Returns plain CDN URL strings
- Whitelist `cdn.sanity.io` in `next.config.ts`

### Singleton Documents
- `homePage`, `aboutPage`, `siteSettings` pinned to fixed `documentId`
- `singletonTypes` Set prevents "Create new" in Studio

### Collection Documents
- `project`, `certificate`, etc. use `slug` field with `source: 'title'`
- Use `order` field for manual sorting

### Types (`src/lib/sanity-types.ts`)
- Manual TypeScript interfaces (no codegen)
- Shared base types: `SanityImage`, `SanitySlug`, `GalleryItem`

### Queries (co-located in pages)
- Each page file has its own GROQ query
- Explicit field projections, always project `_key` on arrays

### Seeder System
- Reads existing JSON data files
- Uploads images to Sanity CDN
- `pnpm seed up` / `pnpm seed down`

---

## Schema Definitions

### Singletons

**homePage** — `name, title, subtitle, location, profileImage, socials[], resumeFile, ctaLinks[]`

**aboutPage** — `profileImage, bioParagraphs[]{ summary, expandedText }, contributions[]{ emoji, title, description, url }, hobbies[]{ emoji, label }`

**siteSettings** — `siteTitle, footerText, navLinks[]`

### Documents

**project** — `title, slug, category, description, about, features[], techStack[], gallery[]{ type, image/videoUrl }, liveUrl, githubUrl, thumbnail, order`

**blogSeries** — `title, slug, order, articles[]→ ref blogArticle`

**blogArticle** — `title, partNumber, date, externalUrl, thumbnail`

**resourceCategory** — `title, slug, sectionLabel, gradient[2], items[]{ name, description, url }, order`

**certificate** — `title, issuer, date, category, image, verifyUrl`

**travelDestination** — `title, slug, flag, thumbnail, overview, placesToTravel[], personalTips[], order`

**yearlyReview** — `year, slug, gradient[2], sections[]{ title, items[] }`

**journeyUpdate** — `title, month, year, theme, thumbnail, linkedInUrl`

**mentorshipArticle** — `title, task, date, thumbnail, externalUrl`

---

## Migration Steps

1. Create Sanity Studio (`sanity/` directory)
2. Create all schema types
3. Build seeder system
4. Seed all content from JSON + site/assets
5. Add `src/lib/sanity.ts` client to frontend
6. Wire up pages one by one (replace JSON imports with GROQ queries)
7. Remove `src/data/` JSON files and API routes
