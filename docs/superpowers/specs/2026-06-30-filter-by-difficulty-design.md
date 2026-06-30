# Design: Filter Routes by Difficulty

**Date:** 2026-06-30
**Scope:** `routes.html` only — adds difficulty badges to the route listing and a client-side filter bar

## Goal

Let visitors filter the route listing by difficulty level. Each route card shows its difficulty as a badge. A row of pill buttons above the list lets the visitor narrow down to one level at a time.

## Constraints

- Pure static HTML site — no build step, no framework
- Small inline `<script>` added to `routes.html` only — no JS on other pages
- Design tokens: Trail Pine `#3a5a40`, Forest Depth `#2c4430`, Canyon Amber `#e07b00`, Mountain Mist `#f5f5f0`, Stone Mist `#888`
- Canyon Amber on exactly one element per page — badges on the listing use Trail Pine instead; Canyon Amber badges on detail pages are unchanged
- Typography: Georgia for body; Arial for nav, meta, labels, badges
- Flat design — no box-shadow

## Difficulty Values

Four levels used across the site (lowercase in HTML attributes, title-case in labels):

| Value | Label |
|-------|-------|
| `easy` | Easy |
| `moderate` | Moderate |
| `hard` | Hard |
| `expert` | Expert |

Current routes and their difficulty:
- Bright Angel Trail → `moderate`
- Yellowstone → `moderate`
- El Capitan → `easy`

## Changes to routes.html

### 1. data-difficulty attribute

Every `.route` div gets `data-difficulty="<value>"`:

```html
<div class="route" data-difficulty="moderate">
```

### 2. Listing badge

New `.listing-badge` CSS class — Trail Pine pill, same geometry as `.badge` on detail pages:

```css
.listing-badge {
  display: inline-block;
  font-family: Arial, sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 14px;
  background-color: #3a5a40;
  color: #fff;
}
```

Position in each `.route` card: below `.meta` (location line), above the first `<p>`.

### 3. Filter bar

Placed between `<h1>` and the first `.route` div. Wrapped in a `<div>` with `role="group"` and `aria-label="Filter by difficulty"`:

```html
<div class="filter-bar" role="group" aria-label="Filter by difficulty">
  <button class="filter-btn" data-filter="all" aria-pressed="true">All</button>
  <button class="filter-btn" data-filter="easy" aria-pressed="false">Easy</button>
  <button class="filter-btn" data-filter="moderate" aria-pressed="false">Moderate</button>
  <button class="filter-btn" data-filter="hard" aria-pressed="false">Hard</button>
  <button class="filter-btn" data-filter="expert" aria-pressed="false">Expert</button>
</div>
```

CSS:

```css
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 36px;
}
.filter-btn {
  font-family: Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: bold;
  letter-spacing: 0.03em;
  padding: 6px 16px;
  border-radius: 20px;
  border: 2px solid #3a5a40;
  background-color: #fff;
  color: #3a5a40;
  cursor: pointer;
}
.filter-btn[aria-pressed="true"] {
  background-color: #2c4430;
  border-color: #2c4430;
  color: #fff;
}
```

### 4. No-results message

Hidden paragraph shown when the active filter matches zero routes:

```html
<p class="no-results" hidden>No routes match this difficulty. Try a different filter.</p>
```

Placed immediately after the filter bar, before the first `.route`.

### 5. Inline script

At the bottom of `<body>`, before `</body>`:

```html
<script>
  const buttons = document.querySelectorAll('.filter-btn');
  const routes = document.querySelectorAll('.route');
  const noResults = document.querySelector('.no-results');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      const filter = btn.dataset.filter;
      let visible = 0;
      routes.forEach(route => {
        const match = filter === 'all' || route.dataset.difficulty === filter;
        route.hidden = !match;
        if (match) visible++;
      });
      noResults.hidden = visible > 0;
    });
  });
</script>
```

Uses `hidden` attribute (not `display: none`) so screen readers also hide filtered-out routes.

## Tests

New file: `tests/routes-page.test.mjs`

Assertions:
1. `routes.html` exists
2. Each `.route` div has a `data-difficulty` attribute with a valid value (`easy|moderate|hard|expert`)
3. Filter bar present: `role="group"` wrapper + 5 buttons with `data-filter` attributes (`all`, `easy`, `moderate`, `hard`, `expert`)
4. "All" button has `aria-pressed="true"` by default; others have `aria-pressed="false"`
5. Each `.route` contains a `.listing-badge` element
6. `.no-results` element present with `hidden` attribute
7. `<script>` tag present in the file

## What Does NOT Change

- Detail pages (`.badge` with Canyon Amber) — unchanged
- Nav, other pages, design tokens — unchanged
- No JS added to any page except `routes.html`
- `<hr class="divider">` separators between routes — unchanged
