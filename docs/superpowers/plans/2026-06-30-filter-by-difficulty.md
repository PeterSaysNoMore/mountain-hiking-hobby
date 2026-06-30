# Filter Routes by Difficulty — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add difficulty badges to each route card on `routes.html` and a pill-button filter bar that shows/hides routes by difficulty level.

**Architecture:** Pure static HTML with a small inline `<script>` on `routes.html` only. Each `.route` div gets a `data-difficulty` attribute; filter buttons use `aria-pressed` state; JS toggles `hidden` on non-matching routes. Test-first: write `tests/routes-page.test.mjs` with all assertions before touching `routes.html`.

**Tech Stack:** HTML5, inline CSS, vanilla JS (inline `<script>`), Node.js test assertions (no test framework — same pattern as `tests/about-page.test.mjs`)

## Global Constraints

- Design tokens: Trail Pine `#3a5a40`, Forest Depth `#2c4430`, Canyon Amber `#e07b00`, Mountain Mist `#f5f5f0`, Stone Mist `#888`, Pale Ridge `#d0cfc8`, Summit White `#ffffff`
- Typography: Georgia for body/headings; Arial for nav, meta, labels, badges — never swapped
- Flat design: no `box-shadow`, no elevation
- Canyon Amber on exactly one element per page — listing badges use Trail Pine `#3a5a40`, not Canyon Amber
- Content max-width: 700px
- Voice: enthusiastic mountain guide, warm, personal, short sentences, imperative mood (CLAUDE.md)
- After every HTML change: run `node tests/about-page.test.mjs && node tests/contact-page.test.mjs`
- Difficulty values (lowercase in HTML, title-case in labels): `easy` / `moderate` / `hard` / `expert`
- Route difficulties: Yellowstone → `moderate`, El Capitan → `easy`, Bright Angel Trail → `moderate`

---

### Task 1: Write Failing Tests

**Files:**
- Create: `tests/routes-page.test.mjs`

**Interfaces:**
- Produces: test file run with `node tests/routes-page.test.mjs` — must FAIL before Task 2 implementation

- [ ] **Step 1: Create `tests/routes-page.test.mjs` with all assertions**

  ```javascript
  import { readFileSync, existsSync } from 'fs';
  import { resolve, dirname } from 'path';
  import { fileURLToPath } from 'url';
  import assert from 'assert';

  const __dir = dirname(fileURLToPath(import.meta.url));
  const root = resolve(__dir, '..');
  const file = resolve(root, 'routes.html');

  // 1. File must exist
  assert.ok(existsSync(file), 'routes.html does not exist');

  const html = readFileSync(file, 'utf8');

  // 2. Every .route div has a valid data-difficulty attribute
  const routeCount = (html.match(/class="route"/g) || []).length;
  const difficultyCount = (html.match(/data-difficulty="(?:easy|moderate|hard|expert)"/g) || []).length;
  assert.ok(routeCount > 0, 'No .route divs found');
  assert.strictEqual(difficultyCount, routeCount,
    `Every .route must have data-difficulty="easy|moderate|hard|expert" — found ${difficultyCount} of ${routeCount}`);

  // 3. Filter bar present with role and label
  assert.match(html, /role="group"/, 'Filter bar must have role="group"');
  assert.match(html, /aria-label="Filter by difficulty"/, 'Filter bar must have aria-label="Filter by difficulty"');

  // 4. Five filter buttons with correct data-filter values
  for (const value of ['all', 'easy', 'moderate', 'hard', 'expert']) {
    assert.match(html, new RegExp(`data-filter="${value}"`),
      `Missing filter button with data-filter="${value}"`);
  }

  // 5. "All" button is active by default; others are inactive
  assert.match(html, /data-filter="all"[^>]*aria-pressed="true"/,
    'data-filter="all" button must have aria-pressed="true"');
  for (const value of ['easy', 'moderate', 'hard', 'expert']) {
    assert.match(html, new RegExp(`data-filter="${value}"[^>]*aria-pressed="false"`),
      `data-filter="${value}" button must have aria-pressed="false"`);
  }

  // 6. Every .route card contains a .listing-badge
  const listingBadgeCount = (html.match(/class="listing-badge"/g) || []).length;
  assert.strictEqual(listingBadgeCount, routeCount,
    `Every .route must contain a .listing-badge — found ${listingBadgeCount} of ${routeCount}`);

  // 7. .no-results paragraph present with hidden attribute
  assert.match(html, /class="no-results"[^>]*hidden/, 'Missing .no-results element with hidden attribute');

  // 8. Inline script present
  assert.match(html, /<script[\s>]/, 'Missing <script> tag');

  console.log('All assertions passed — routes.html has difficulty filter feature.');
  ```

- [ ] **Step 2: Run test — confirm it fails**

  ```bash
  node tests/routes-page.test.mjs
  ```

  Expected: AssertionError on assertion 2 (`data-difficulty` count mismatch) or assertion 3 (missing role). The test must fail before proceeding.

- [ ] **Step 3: Commit the failing test**

  ```bash
  git add tests/routes-page.test.mjs
  git commit -m "test: add failing tests for routes difficulty filter"
  ```

---

### Task 2: Implement Filter Feature on routes.html

**Files:**
- Modify: `routes.html`

**Interfaces:**
- Consumes: test assertions from Task 1 — every assertion in `tests/routes-page.test.mjs` must pass after this task
- Produces: working difficulty filter on `routes.html`

- [ ] **Step 1: Add `.listing-badge` and `.filter-bar`/`.filter-btn` CSS to `routes.html`**

  Inside the `<style>` block, before `</style>`, add:

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

- [ ] **Step 2: Add filter bar and no-results message to `<main>`**

  Find this line in `routes.html`:

  ```html
      <h1>Favourite Routes</h1>
  
      <div class="route">
  ```

  Replace with:

  ```html
      <h1>Favourite Routes</h1>

      <div class="filter-bar" role="group" aria-label="Filter by difficulty">
        <button class="filter-btn" data-filter="all" aria-pressed="true">All</button>
        <button class="filter-btn" data-filter="easy" aria-pressed="false">Easy</button>
        <button class="filter-btn" data-filter="moderate" aria-pressed="false">Moderate</button>
        <button class="filter-btn" data-filter="hard" aria-pressed="false">Hard</button>
        <button class="filter-btn" data-filter="expert" aria-pressed="false">Expert</button>
      </div>
      <p class="no-results" hidden>No routes match this difficulty. Try a different filter.</p>

      <div class="route">
  ```

- [ ] **Step 3: Add `data-difficulty` and `.listing-badge` to the Yellowstone route**

  Find:

  ```html
      <div class="route">
        <h2>Yellowstone National Park — Grand Loop Trails</h2>
        <div class="meta">Wyoming / Montana / Idaho, USA</div>
        <p>
  ```

  Replace with:

  ```html
      <div class="route" data-difficulty="moderate">
        <h2>Yellowstone National Park — Grand Loop Trails</h2>
        <div class="meta">Wyoming / Montana / Idaho, USA</div>
        <span class="listing-badge">Moderate</span>
        <p>
  ```

- [ ] **Step 4: Add `data-difficulty` and `.listing-badge` to the El Capitan route**

  Find:

  ```html
      <div class="route">
        <h2>El Capitan — Valley Floor Trail</h2>
        <div class="meta">Yosemite National Park, California, USA</div>
        <p>
  ```

  Replace with:

  ```html
      <div class="route" data-difficulty="easy">
        <h2>El Capitan — Valley Floor Trail</h2>
        <div class="meta">Yosemite National Park, California, USA</div>
        <span class="listing-badge">Easy</span>
        <p>
  ```

- [ ] **Step 5: Add `data-difficulty` and `.listing-badge` to the Bright Angel route**

  Find:

  ```html
      <div class="route">
        <h2>Bright Angel Trail</h2>
        <div class="meta">Grand Canyon National Park, Arizona, USA</div>
        <p>
  ```

  Replace with:

  ```html
      <div class="route" data-difficulty="moderate">
        <h2>Bright Angel Trail</h2>
        <div class="meta">Grand Canyon National Park, Arizona, USA</div>
        <span class="listing-badge">Moderate</span>
        <p>
  ```

- [ ] **Step 6: Add inline script before `</body>`**

  Find `</body>` and insert before it:

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

- [ ] **Step 7: Run the new routes test — must pass**

  ```bash
  node tests/routes-page.test.mjs
  ```

  Expected: `All assertions passed — routes.html has difficulty filter feature.`

- [ ] **Step 8: Run the full test suite — must pass**

  ```bash
  node tests/about-page.test.mjs && node tests/contact-page.test.mjs
  ```

  Expected: both print `All assertions passed`.

- [ ] **Step 9: Commit**

  ```bash
  git add routes.html
  git commit -m "feat: add difficulty badges and filter bar to routes listing"
  ```
