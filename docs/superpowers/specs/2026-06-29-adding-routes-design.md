# Design: Adding Routes to the Hiking Site

**Date:** 2026-06-29
**Scope:** Route detail pages, nav dropdown, routes listing updates

## Goal

Scale the site to support multiple full route detail pages, with a dropdown nav and a consistent template. Currently one detail page exists (Bright Angel Trail); this design makes that the standard for all routes.

## Navigation

**Change:** Remove "Bright Angel Trail" from top-level nav. Add CSS `:hover` dropdown under "Favourite Routes" listing all route detail pages.

New nav order: Home | Favourite Routes ▾ | My Most Beautiful Route | About | Contact

**Dropdown behaviour:**
- Triggered by `:hover` on the "Favourite Routes" `<li>` — pure CSS, no JS
- Submenu: Trail Pine background (`#3a5a40`), same Arial/0.95rem/letter-spacing style as top-level nav links
- Hover state on submenu items: Forest Depth (`#2c4430`) — consistent with top-level
- Positioned absolutely below the nav bar, left-aligned to the parent item
- Adding a new route = add one `<li>` to the dropdown in every HTML file

**Files to update when nav changes:** index.html, routes.html, most-beautiful.html, about.html, contact.html, and every route detail page.

## Route Detail Page Template

Every route gets its own `route-<slug>.html` file. Structure top to bottom:

1. **Hero image** — full content width (700px max), above the H1. File lives in `images/` directory (`images/route-<slug>.jpg`).
2. **H1** — route name, Trail Pine, 2px border-bottom (existing style)
3. **Location meta** — Arial, 0.85rem, Stone Mist (`#888`)
4. **Stats row** — Distance · Elevation gain · Duration, inline, same Arial label style as meta. Example: `18 km  ·  1 400 m  ·  7–9 hrs`
5. **Difficulty badge** — Canyon Amber pill (existing style), below stats row
6. **Prose** — Georgia, 1.1rem, Trail Gray (`#444`), line-height 1.8

No new CSS is introduced beyond what exists. Stats row reuses the `.meta` label style.

### Image handling
- Local files only, stored in `2930jun/images/`
- One image per route, named `route-<slug>.jpg`
- `<img>` tag with `width: 100%`, `max-width: 700px`, `display: block`, `margin-bottom: 32px`
- No captions, no alt-text placeholder — author adds descriptive alt text per image

## routes.html Updates

- Yellowstone and El Capitan entries get "Read more →" links added (same style as Bright Angel's existing link)
- No stats or photos added to the listing page — stays text-driven per design principles
- Bright Angel entry already has "Read more →"; no change needed there

## What Does NOT Change

- Design system (colors, typography, spacing) — unchanged
- "My Most Beautiful Route" page — stays as-is, top-level nav
- Prose voice and tone — unchanged (CLAUDE.md rules apply)
- No build tools, no JS, no frameworks introduced

## Adding a New Route (Process)

1. Create `route-<slug>.html` from the template above
2. Add `images/route-<slug>.jpg`
3. Add `<li>` with route link to the dropdown in every existing HTML file
4. Add summary + "Read more →" entry to `routes.html`
