# Project Memory

Facts worth remembering across sessions. Append new discoveries at the bottom.

---

## Site

- Static HTML, no build step, no framework
- Deployed: https://petersaysnmore.github.io/mountain-hiking-hobby/
- Remote: https://github.com/PeterSaysNoMore/mountain-hiking-hobby.git

## Design tokens

- Trail Pine `#3a5a40` — primary (nav, headings, borders, badges on listing page)
- Forest Depth `#2c4430` — hover/active states
- Canyon Amber `#e07b00` — accent, **exactly one element per page**
- Mountain Mist `#f5f5f0` — page background
- Trail Gray `#444` — body text
- Stone Mist `#888` — meta/secondary text
- Pale Ridge `#d0cfc8` — dividers
- Summit White `#ffffff` — button backgrounds

## Typography

- Georgia — body text, headings
- Arial — nav, meta, labels, badges (never swapped)

## Layout

- Flat design — no `box-shadow` anywhere
- Content max-width: 700px

## Routes and difficulty

- Yellowstone → moderate
- El Capitan → easy
- Bright Angel Trail → moderate

## Tests

Full test command:
```bash
node tests/about-page.test.mjs && node tests/contact-page.test.mjs && node tests/routes-page.test.mjs
```

Pre-commit hook runs all three automatically (`.githooks/pre-commit`, active via `core.hooksPath`).

## OpenSpec

- Installed: `@fission-ai/openspec@latest` (global npm)
- Root: `openspec/` inside the site repo
- Specs live at `openspec/specs/<capability>/spec.md`
- Changes archived to `openspec/changes/archive/YYYY-MM-DD-<name>/`
- Workflow: `/opsx:explore` → `/opsx:propose` (implicit via explore) → `/opsx:apply` → `/opsx:archive`
- Completed change: `route-ranking` (archived 2026-06-30)

## Routes ranking

- Yellowstone → #1 (Canyon Amber rank number)
- El Capitan → #2 (Trail Pine rank number)
- Bright Angel Trail → #3 (Trail Pine rank number)
- Rank number sits left of h2 in `.rank-header` flex row

## Decisions

- Listing badges use Trail Pine (not Canyon Amber) — Canyon Amber reserved for detail pages
- Filter uses `hidden` attribute, not `display:none` — screen readers respect it
- Filter JS is inline `<script>` on `routes.html` only — no JS on other pages
- Canyon Amber on `routes.html` = #1 rank number (satisfies one-per-page rule)
