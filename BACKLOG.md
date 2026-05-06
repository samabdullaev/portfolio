# Backlog

Post-launch nice-to-haves. Pick one per session when you have free time.
Each item has enough context to start cold.

The current roadmap (PLAN.md) handles release-blocking work; this file
holds polish, new features, and research items that don't need to ship
before going public.

---

## Studio UX

### CTA button URL — dropdown instead of free text
**What**: On the home page singleton in Sanity Studio, `ctaLinks[].url` is
currently a plain text input. Editors should pick from a dropdown of the
site's own routes (`/about`, `/projects`, `/blog`, etc.) so links can't
typo.

**How**: Build a custom input component (same pattern as
`portfolio-sanity/components/CityInput.tsx` — uses `useFormValue` to read
sibling field). Source the route list from a hardcoded array or a small
new `siteRoutes` singleton.

**Effort**: ~1 hour.

---

### Replace official Sanity icons with thiings.co picks
**What**: The desk-list section icons (HomeIcon, RocketIcon, etc. from
`@sanity/icons`) are functional but a bit generic. Replace with hand-picked
icons from <https://www.thiings.co/things> when good matches are found.

**How**: thiings.co exports SVGs. Drop into `portfolio-sanity/components/icons/`
and import in `sanity.config.ts` instead of `@sanity/icons`.

**Effort**: ~30 min once the icons are picked. Pick whenever you spot ones
you like — no rush.

---

## Frontend polish

### About: Kamran-style inner openers
**What**: Personal Story Openers on `/about` currently sit at the END of
each paragraph (the "show more" toggle is in trailing position). Kamran
Ahmed's site (<https://kamranahmed.info/>) has expanders **mid-sentence**
where each phrase opens up to reveal more inline. Better progressive
reveal.

**How**: Refactor `ExpandText.tsx` to support inline expansions. Schema
likely needs a richer field (Portable Text? markdown with custom marks?)
to mark which phrases open into more content.

**Effort**: ~half a day. Schema redesign + component rewrite.

---

### Expand social-links list
**What**: Currently advertising LinkedIn, GitHub, Medium. Could grow
to include Telegram, Instagram, YouTube, LeetCode, X/Twitter, Bluesky,
etc. as those channels become more active.

**How**: Two changes per new platform:
1. Add the platform name as an option on `homePage.socials[].platform`
   in `portfolio-sanity/schemaTypes/singletons/homePage.ts`.
2. Add an SVG icon entry to `SOCIAL_ICONS` in `src/data/social-icons.tsx`.

Without the icon entry, the tile renders blank.

**Effort**: ~10 min per platform. Best done in batches when refreshing
the socials section. Pairs naturally with the Otabek-style tiles below.

---

### Otabek-style colored social tiles
**What**: Otabek's site (<https://otabek.io/about>) shows social links
as colored cards with brand background + platform name visible. More
distinctive than our current monochrome icon tiles.

**How**: Extend `SOCIAL_ICONS` in `src/data/social-icons.tsx` with a
`brandColor` per platform, render `SocialTile.tsx` with a colored
background instead of just icon hover.

**Effort**: ~1 hour. Pure presentation change, no schema work.

---

### Modal focus trap + restoration
**What**: `<Modal>` (and `<MediaModal>` which extends it) opens without
trapping focus. Tab can move focus to elements behind the modal,
breaking keyboard navigation.

**How**:
- On open: save `document.activeElement`, move focus to a focusable
  element inside the modal (close button is conventional).
- While open: intercept Tab / Shift+Tab to cycle within the modal's
  focusable elements (querySelector for the standard list:
  `a, button, input, [tabindex]:not([tabindex="-1"])`).
- On close: restore focus to the saved element.

Lives in `src/components/ui/Modal.tsx`. Pure addition (~30 lines of
focus-management logic), no API change needed. Test with keyboard
navigation in browser + a11y tools.

**Effort**: ~30 min including testing.

---

### Mobile drawer — active page ring
**What**: When the mobile burger drawer is open, the active page's link
looks identical to inactive ones. Hard to tell where you are.

**How**: In `Navbar.tsx`, apply the same active-state treatment used on
filter chips — `box-shadow: inset 0 0 0 2px var(--color-text)` plus a
few pixels of padding so the ring sits inside the link bounds. Active
detection uses `usePathname()` matched against each link's `href`.

**Effort**: ~15 min CSS + visual verification at mobile viewport (375px).

---

### Detail-page back button — relocate for mobile thumb reach
**What**: The "Back to X" link sits at the top-left on detail pages.
Hard to reach on mobile. Move to bottom-right (or floating near the
end of the content) so it's within thumb range without scrolling all
the way back up.

**How**: Either reposition `<DetailBack>` in `src/components/layout/`
or duplicate it (top + bottom). Sticky-positioned floating button is
another option.

**Effort**: ~1 hour including responsive tweaks + tests.

---

## Features

### Keyboard shortcuts
**What**: Site-wide shortcuts for navigation, like
<https://zenorocha.com/>. E.g. `g h` → home, `g p` → projects,
`g b` → blog, `t` → toggle theme, `?` → show shortcuts overlay.

**How**: A small `useKeyboardShortcuts` hook + a help modal listing them.
Library option: `react-hotkeys-hook` is solid. Or hand-roll with a
keydown listener.

**Effort**: ~3 hours including the help overlay.

---

### Prompts page
**What**: New `/prompts` page listing your most-used AI prompts in a
copy-ready format. One-click copy to clipboard. Probably grouped by
category (coding, writing, research, etc.).

**How**:
- New Sanity doc type `prompt` with fields: `title`, `category`, `body`
  (long text), maybe `tags[]`.
- Hub page `/prompts` lists them grouped by category.
- Each prompt card has a copy button that pulls the body to clipboard.
- Probably wants `<CopyButton>` shared component.

**Effort**: ~half a day. New schema + new page + copy interaction.

---

### Page heroes editable from Sanity
**What**: Hub page heroes (e.g. "Projects — A collection of personal,
freelance, and hackathon projects") are currently hardcoded in each
page's `<HubHeader>` call. To change copy without a code commit, move
them to Sanity.

**How**: Either:
- (a) Extend `siteSettings` singleton with a `pageHeroes` object keyed by
  route slug
- (b) New `pageHero` doc type, one per page

Option (a) is simpler — single edit point in Studio. Each page reads
the hero text via the existing `siteSettings` query.

**Effort**: ~2 hours. Schema field + query update + 8 page edits.

---

## Research

### Shadcn UI migration — is it worth it?
**What**: Question whether migrating components to <https://ui.shadcn.com/>
(Radix primitives + Tailwind) would improve the codebase.

**My take (for future-Sam)**: Probably not worth a wholesale migration on
a working portfolio. The current components are well-structured Tailwind
+ React. Shadcn shines for app-style UIs with lots of dropdowns/dialogs/
forms — your portfolio is mostly static content. Cherry-pick if you ever
build something form-heavy.

**How (if pursued)**: Audit which components map to shadcn primitives.
Replace one at a time. The MediaModal is the most likely beneficiary
(Radix Dialog gives you focus trap + a11y for free — relevant to
Phase 13).

**Effort**: First do a 1-page assessment ("what would migrate, what
wouldn't, what's the win") — half a day. Migration itself depends on
scope.

---

## How to use this file

When you finish a backlog item, delete its section from this file and
add a one-line entry to PLAN.md's "completed phases" log if it's
substantial.
