# Adding Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a CSS dropdown nav under "Favourite Routes", update the Bright Angel Trail page to the full route template (hero image + stats), and prepare routes.html for future route links.

**Architecture:** Pure static HTML — no build step, no JS, no frameworks. Nav dropdown uses CSS `:hover` only. Each route is a self-contained HTML file with inline CSS. Shared style changes (nav dropdown CSS) must be applied manually to every HTML file.

**Tech Stack:** HTML5, inline CSS, Node.js (existing Playwright-style tests)

## Global Constraints

- Design tokens: Trail Pine `#3a5a40`, Forest Depth `#2c4430`, Canyon Amber `#e07b00`, Mountain Mist `#f5f5f0`, Trail Gray `#444444`, Stone Mist `#888888`, Pale Ridge `#d0cfc8`, Summit White `#ffffff`
- Typography: Georgia for body/headings; Arial for nav, meta, labels, badges — never swapped
- Flat design: no `box-shadow`, no elevation
- Canyon Amber on exactly one element per page (difficulty badge)
- Content max-width: 700px
- After every HTML change: run `node tests/about-page.test.mjs && node tests/contact-page.test.mjs`
- Voice: enthusiastic mountain guide, warm, personal, short sentences, imperative mood (CLAUDE.md)

---

### Task 1: CSS Dropdown Navigation

**Files:**
- Modify: `index.html`, `routes.html`, `most-beautiful.html`, `about.html`, `contact.html`, `route-bright-angel-trail.html`

**Interfaces:**
- Produces: `.has-dropdown` / `.dropdown` CSS classes and updated nav HTML used by all subsequent tasks

**CSS to add** inside each file's `<style>` block, before `</style>`:

```css
.has-dropdown { position: relative; }
.dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #3a5a40;
  list-style: none;
  min-width: 180px;
  z-index: 100;
}
.has-dropdown:hover .dropdown { display: block; }
.dropdown li a { padding: 12px 24px; }
```

**Nav HTML to replace** in each file — find this block:

```html
<li><a href="routes.html">Favourite Routes</a></li>
<li><a href="most-beautiful.html">My Most Beautiful Route</a></li>
<li><a href="route-bright-angel-trail.html">Bright Angel Trail</a></li>
```

Replace with:

```html
<li class="has-dropdown">
  <a href="routes.html">Favourite Routes ▾</a>
  <ul class="dropdown">
    <li><a href="route-bright-angel-trail.html">Bright Angel Trail</a></li>
  </ul>
</li>
<li><a href="most-beautiful.html">My Most Beautiful Route</a></li>
```

**Active-state exceptions:**
- In `routes.html`: add `class="active"` to the "Favourite Routes ▾" anchor: `<a href="routes.html" class="active">Favourite Routes ▾</a>`
- In `route-bright-angel-trail.html`: add `class="active"` to the dropdown link: `<li><a href="route-bright-angel-trail.html" class="active">Bright Angel Trail</a></li>`

- [ ] **Step 1: Apply CSS + nav HTML to `index.html`**

  Add the CSS block above before `</style>`. Replace the three nav `<li>` items with the dropdown block above (no active state needed on this page).

- [ ] **Step 2: Apply to `routes.html`**

  Same CSS. Same nav replacement. Add `class="active"` to the "Favourite Routes ▾" anchor.

- [ ] **Step 3: Apply to `most-beautiful.html`**

  Same CSS. Same nav replacement. No active-state changes needed.

- [ ] **Step 4: Apply to `about.html`**

  Same CSS. Same nav replacement. No active-state changes needed.

- [ ] **Step 5: Apply to `contact.html`**

  Same CSS. Same nav replacement. No active-state changes needed.

- [ ] **Step 6: Apply to `route-bright-angel-trail.html`**

  Same CSS. Same nav replacement. Add `class="active"` to the Bright Angel Trail dropdown `<li>` link.

- [ ] **Step 7: Verify in browser**

  Open `index.html`. Hover "Favourite Routes ▾" — dropdown appears with "Bright Angel Trail". Click it — lands on route detail page. Dropdown disappears when cursor leaves. No layout shift on other pages.

- [ ] **Step 8: Run tests**

  ```bash
  cd 2930jun && node tests/about-page.test.mjs && node tests/contact-page.test.mjs
  ```

  Expected: `All assertions passed` on both.

- [ ] **Step 9: Commit**

  ```bash
  git add index.html routes.html most-beautiful.html about.html contact.html route-bright-angel-trail.html
  git commit -m "feat: replace top-level route nav link with CSS hover dropdown"
  ```

---

### Task 2: Update Bright Angel Trail Page to Full Template

**Files:**
- Modify: `route-bright-angel-trail.html`
- Create: `images/` directory (empty — image file is user-supplied)

**Interfaces:**
- Consumes: `.has-dropdown` / `.dropdown` from Task 1 (already applied to this file)
- Produces: `.hero-img` CSS class and three-block template (image → location meta → stats meta → badge) used as the standard for all future route pages

**CSS to add** inside `<style>` block:

```css
.hero-img {
  width: 100%;
  max-width: 700px;
  display: block;
  margin-bottom: 32px;
}
```

**`<main>` block — full replacement** (preserve existing prose paragraphs unchanged):

```html
<main>
  <img class="hero-img" src="images/route-bright-angel-trail.jpg" alt="The Bright Angel Trail descending into the Grand Canyon">
  <h1>Bright Angel Trail</h1>
  <div class="meta">Grand Canyon National Park, Arizona, USA</div>
  <div class="meta">15 km  ·  1 370 m descent  ·  6–9 hrs return</div>
  <span class="badge">Moderate</span>

  <p>
    Step up to the rim. Look down. That is where we are going.
  </p>
  <p>
    The Bright Angel Trail drops into the Grand Canyon from the South Rim — and from the first step, the sun is with you. It pours down onto the red and orange canyon walls. It warms the stone beneath your boots. It fills the whole place with light.
  </p>
  <p>
    The trail winds down through layer after layer of ancient rock. Limestone. Sandstone. Vishnu schist. Each band a different colour. Each one millions of years old. You are not just hiking down a canyon. You are walking back through time.
  </p>
  <p>
    Rest houses mark the way. Water at the top, shade in the middle, the Colorado River waiting at the bottom for those who push all the way through. But even a few miles in is enough to feel it. The scale. The silence. The sun on your face at the bottom of the world.
  </p>
  <p>
    One rule: what goes down must come back up. Save your legs. The climb out is where this trail earns its name.
  </p>
</main>
```

Note: The hero `<img>` will show a broken image indicator until `images/route-bright-angel-trail.jpg` is added. That is expected — add the photo file separately when available.

- [ ] **Step 1: Create images directory**

  ```bash
  mkdir -p 2930jun/images
  ```

- [ ] **Step 2: Add `.hero-img` CSS to `<style>` block**

  Insert before `</style>`.

- [ ] **Step 3: Replace `<main>` content**

  Insert the `<img class="hero-img">` before `<h1>`. Add the stats `<div class="meta">` after the location meta. Keep all existing prose paragraphs unchanged.

- [ ] **Step 4: Verify in browser**

  Open `route-bright-angel-trail.html`. Layout should be: broken image placeholder → H1 → location → stats → amber badge → prose. Stats row font matches location meta (Arial, 0.85rem, Stone Mist). Difficulty badge is still the only Canyon Amber element.

- [ ] **Step 5: Run tests**

  ```bash
  node tests/about-page.test.mjs && node tests/contact-page.test.mjs
  ```

  Expected: both pass.

- [ ] **Step 6: Commit**

  ```bash
  git add route-bright-angel-trail.html images/
  git commit -m "feat: add hero image slot and stats row to Bright Angel Trail page"
  ```

---

### Task 3: Prepare routes.html for Future Route Links

**Files:**
- Modify: `routes.html`

**Interfaces:**
- Consumes: nothing from prior tasks (independent content change)
- Produces: `Read more →` link pattern on all route entries — the standard to follow when adding any new route to routes.html

Yellowstone and El Capitan currently have no detail pages. The "Read more →" links are added now using the expected future filenames. They will be dead links until those pages are created.

**In the Yellowstone `.route` div**, after the last `<p>`, add:

```html
<a href="route-yellowstone.html" style="font-family: Arial, sans-serif; font-size: 0.9rem; color: #3a5a40; text-decoration: none; font-weight: bold;">Read more →</a>
```

**In the El Capitan `.route` div**, after the last `<p>`, add:

```html
<a href="route-el-capitan.html" style="font-family: Arial, sans-serif; font-size: 0.9rem; color: #3a5a40; text-decoration: none; font-weight: bold;">Read more →</a>
```

- [ ] **Step 1: Add "Read more →" to Yellowstone entry**

- [ ] **Step 2: Add "Read more →" to El Capitan entry**

- [ ] **Step 3: Verify in browser**

  Open `routes.html`. All three route entries end with "Read more →" in Trail Pine, bold, Arial. Yellowstone and El Capitan links lead to 404 — expected until those pages exist.

- [ ] **Step 4: Run tests**

  ```bash
  node tests/about-page.test.mjs && node tests/contact-page.test.mjs
  ```

  Expected: both pass.

- [ ] **Step 5: Commit**

  ```bash
  git add routes.html
  git commit -m "feat: add Read more links to Yellowstone and El Capitan route entries"
  ```

---

## Adding a New Route (Reference)

When adding any new route after this plan:

1. Create `route-<slug>.html` — copy the Bright Angel Trail page as the template; update name, location, stats, badge difficulty, prose, and nav active state
2. Add `images/route-<slug>.jpg`
3. In the `<nav>` dropdown of every HTML file, add: `<li><a href="route-<slug>.html">Route Name</a></li>`
4. In `routes.html`, add a `.route` div with summary + `<a href="route-<slug>.html">Read more →</a>` (update the existing dead link if one was already added in Task 3)
5. Run `node tests/about-page.test.mjs && node tests/contact-page.test.mjs`
6. Commit
