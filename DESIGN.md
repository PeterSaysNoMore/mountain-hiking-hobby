---
name: My Mountain-Hiking Hobby Website
description: A personal trail guide — vivid route stories told by someone who knows the mountain.
colors:
  trail-pine: "#3a5a40"
  forest-depth: "#2c4430"
  canyon-amber: "#e07b00"
  mountain-mist: "#f5f5f0"
  deep-ink: "#2c2c2c"
  trail-gray: "#444444"
  stone-mist: "#888888"
  pale-ridge: "#d0cfc8"
  summit-white: "#ffffff"
typography:
  display:
    fontFamily: "Georgia, serif"
    fontSize: "2.2rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Georgia, serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.03em"
rounded:
  pill: "20px"
  none: "0"
spacing:
  content-max: "700px"
  page-margin: "60px"
  section-gap: "48px"
components:
  nav-link:
    backgroundColor: "{colors.trail-pine}"
    textColor: "{colors.summit-white}"
    padding: "16px 24px"
  nav-link-active:
    backgroundColor: "{colors.forest-depth}"
    textColor: "{colors.summit-white}"
    padding: "16px 24px"
  badge-difficulty:
    backgroundColor: "{colors.canyon-amber}"
    textColor: "{colors.summit-white}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: My Mountain-Hiking Hobby Website

## 1. Overview

**Creative North Star: "The Trail Companion"**

This system feels like getting trail notes from a trusted friend — personal, direct, no pretense. Not a brand, not a publication, not an outdoor gear catalog. Someone who knows these trails and wants to take you along. The design steps back so the writing can do its job: put the reader on the mountain.

Typography carries almost all the weight here. Georgia's serifs do the editorial work; Arial handles the practical layer (navigation, metadata, badges). Color is restrained: one deep forest green anchors the page, one amber accent marks what's special, neutral backgrounds stay quiet. Nothing competes with the voice on the page.

This system explicitly rejects corporate outdoors brands (REI, North Face campaign sites), minimalist-cool aesthetics (cold white space, clinical type), outdoorsy-rugged clichés (dark olive, distressed textures, faux-vintage), and travel-blog generic patterns (stock heroes, identical card grids, "Top 10" bullets).

**Key Characteristics:**
- Content-first: the text is the design
- Single saturated accent (trail pine) in the navigation; everything else is neutral
- Flat surfaces, no elevation — separation through spacing and type, not shadow
- Two-font pairing on a contrast axis: editorial serif body + utilitarian sans UI
- Warm off-white background, never cream or paper-toned — it's functional, not decorative

## 2. Colors: The Forest & Canyon Palette

One saturated green anchors identity; one amber marks difficulty and points of emphasis; warm neutrals let the writing breathe.

### Primary
- **Trail Pine** (`#3a5a40`): The brand color. Navigation background, all headings, H1 border-bottom, inline links. The color that says "this is the site."
- **Forest Depth** (`#2c4430`): Trail Pine pressed darker. Nav hover and active states only — not used as a standalone color.

### Secondary
- **Canyon Amber** (`#e07b00`): The sole warm accent. Difficulty badges, occasional inline emphasis. Used in ≤5% of any screen — its rarity is its meaning.

### Neutral
- **Mountain Mist** (`#f5f5f0`): Body background. Slightly warm but near-neutral — a canvas, not a mood.
- **Deep Ink** (`#2c2c2c`): Base text for headings not colored Trail Pine.
- **Trail Gray** (`#444444`): Paragraph body text. Dark enough to read comfortably against Mountain Mist (≥4.5:1).
- **Stone Mist** (`#888888`): Metadata, subtitles, secondary labels. Used only for text at 0.85rem+, where contrast requirements are met.
- **Pale Ridge** (`#d0cfc8`): Section dividers (`<hr>`). Never used for text.
- **Summit White** (`#ffffff`): Navigation text on Trail Pine background.

### Named Rules
**The One Amber Rule.** Canyon Amber appears on one element per page: the difficulty badge. If you're reaching for it a second time, reach for Trail Pine instead.

**The No-Shadow Rule.** Surfaces are flat. Separation is achieved through spacing, type scale, and color — never box-shadow or drop-shadow.

## 3. Typography

**Display/Body Font:** Georgia (with `serif` fallback)
**UI/Label Font:** Arial (with `sans-serif` fallback)

**Character:** A deliberate contrast pairing. Georgia's warm serifs carry the editorial voice — it reads like ink on good paper. Arial keeps the navigation and metadata efficient and legible. The two never trade roles.

### Hierarchy
- **Display** (400 weight, 2.2rem, line-height 1.3): Page titles. H1 only. Colored Trail Pine with a 2px border-bottom. One per page.
- **Headline** (400 weight, 1.4rem, line-height 1.5): Route names and section headings. H2, colored Trail Pine. No border.
- **Body** (400 weight, 1.1rem, line-height 1.8): All editorial prose. Trail Gray (`#444444`). Max width 700px (~65–70ch). The generously loose line-height is intentional — trail stories need room to breathe.
- **Label** (400 weight, 0.85rem, line-height 1.4, letter-spacing 0.03em): Metadata, location lines, navigation. Arial, Stone Mist or Summit White depending on surface.

### Named Rules
**The Two-Font Rule.** Georgia handles editorial content; Arial handles the utility layer. No third face enters. No swapping roles.

**The Serif-First Rule.** When in doubt, reach for Georgia. Arial earns its place only when information is functional (navigation, metadata, a badge label) — never for decorative use.

## 4. Elevation

This system is completely flat. There are no shadows, no blur effects, no layered surfaces. Depth is conveyed through spacing, color contrast (Trail Pine against Mountain Mist), and typographic scale — nothing else.

The flatness is a feature, not an oversight. Shadows on a personal hiking site would look like someone trying to make it feel more important than it is. The content earns attention through words, not visual tricks.

### Named Rules
**The Flat Commitment.** If you feel the urge to add a box-shadow, add more vertical spacing instead. The page has rhythm; it doesn't need altitude.

## 5. Components

### Navigation
The navigation bar is full-width, Trail Pine background, Summit White text. A practical rail at the top of every page — understated, never decorative.
- **Bar:** `background-color: #3a5a40`, `padding: 0 40px`
- **Links:** Arial, 0.95rem, letter-spacing 0.03em, `padding: 16px 24px`, no underlines
- **Hover / Active:** Forest Depth (`#2c4430`) background, 0.2s ease transition on background
- **No border:** The color contrast between the green nav and the off-white body is boundary enough

### Page Heading (H1)
The page title with a 2px Trail Pine border-bottom. The border does not decorate — it anchors. It marks where the page begins.
- **Font:** Georgia, 2.2rem, Trail Pine color
- **Border:** `border-bottom: 2px solid #3a5a40`, `padding-bottom: 10px`
- **Margin:** 24px below (tighter on detail pages that follow with a subtitle)

### Difficulty Badge
A lone warm accent. Small pill, Canyon Amber background, Summit White text.
- **Shape:** 20px border-radius (full pill at this size)
- **Typography:** Arial, 0.8rem, bold, letter-spacing 0.05em, uppercase
- **Background:** Canyon Amber (`#e07b00`)
- **Padding:** `4px 12px`
- **Placement:** Below the page H1 and metadata, above the first paragraph — marks the trail before the reader sets out

### Route Entry
A self-contained section for a single trail. No card border, no card background — just spacing and type hierarchy.
- **Title (H2):** Georgia, 1.4rem, Trail Pine
- **Location meta:** Arial, 0.85rem, Stone Mist
- **Gap below meta:** 14px; gap below H2: 4px (title and location feel bonded)
- **Body paragraphs:** Georgia, 1.05–1.1rem, Trail Gray, line-height 1.8
- **Spacing between entries:** 48px (generous — each route is its own moment)

### Divider
A 1px Pale Ridge line between route entries. Quiet, not decorative — just a breath between stories.
- **Style:** `border: none; border-top: 1px solid #d0cfc8`
- **Spacing:** 48px of margin below

### Inline Link
Used for "Read more →" within route summaries. No underline. Trail Pine, bold, small sans.
- **Font:** Arial, 0.9rem, bold, Trail Pine
- **Hover:** Text decoration underline (the only underline in the system — hover state only)

## 6. Do's and Don'ts

### Do:
- **Do** use Georgia for all editorial prose — route descriptions, intros, body copy of any kind.
- **Do** let the writing breathe: 1.8 line-height on body, generous vertical spacing between sections.
- **Do** use Trail Pine (`#3a5a40`) as the single brand color for headings, nav, and links.
- **Do** reserve Canyon Amber (`#e07b00`) for exactly one element per page.
- **Do** keep surfaces flat — no shadows, no blur, no elevation tricks.
- **Do** maintain paragraph text at `#444444` minimum against the off-white background (contrast ≥4.5:1).
- **Do** use Arial only for UI-layer text: navigation, metadata, labels, badges.

### Don't:
- **Don't** make it look like a corporate outdoors brand (REI, North Face). No product-marketing energy, no polished campaign photography layout, no glossy slick surfaces.
- **Don't** go minimalist-cool: cold white backgrounds, clinical type, excessive negative space without warmth.
- **Don't** fall into the outdoorsy-rugged cliché: no dark olive, no distressed textures, no wood-grain backgrounds, no faux-vintage treatments.
- **Don't** use travel-blog generic patterns: no stock-photo hero sections, no "Top 10" bullet lists, no identical card grids.
- **Don't** add box-shadows. The design is flat. Add spacing instead.
- **Don't** introduce a third typeface. Two fonts, two roles — that's the system.
- **Don't** use Canyon Amber (`#e07b00`) for body text, headings, or decorative color. It's a signal color; its meaning comes from rarity.
- **Don't** use Stone Mist (`#888888`) for any text below 0.85rem — contrast fails at small sizes.
- **Don't** use side-stripe border-left or border-right accents on route entries or callouts. Use spacing and type instead.
