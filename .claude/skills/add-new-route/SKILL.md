Ask the user for the following four things, one by one in a friendly way:

1. **Route title** — the name of the route and the park or region it is in
2. **Photo** — a file path or URL to a photo for this route (or "skip" to add no photo)
3. **Description** — a few sentences about the route in their own words: what they remember, what stands out, why they love it
4. **Difficulty** — Easy, Moderate, or Challenging

Once you have all four answers, do the following:

**Step 1 — Create a new route page.**

Create a new HTML file in `/Users/peter.schrijver/_TOP/Claude/2930jun/` named after the route title (lowercase, hyphens, no spaces, e.g. `route-fairy-falls.html`).

The page must match the style of the existing pages exactly — same nav, same CSS, same green colour scheme. Use the shared nav structure with all three existing nav links plus a link to this new page.

Write the route description in the fixed tone of voice from CLAUDE.md: enthusiastic mountain guide, warm, vivid, short punchy sentences. Expand the user's own words into that style — do not just copy them verbatim.

If a photo was provided, include it at the top of the main content as a full-width image (max-width: 100%, border-radius: 6px, margin-bottom: 24px). If the user said "skip", omit the image entirely.

Show the difficulty level as a styled badge below the subtitle (green for Easy, orange for Moderate, red for Challenging).

**Step 2 — Add the route to routes.html.**

Open `/Users/peter.schrijver/_TOP/Claude/2930jun/routes.html` and add a new `<div class="route">` entry at the bottom (before `</main>`), with:
- The route title as `<h2>`
- Location/park as `.meta`
- A short teaser paragraph (2–3 sentences, mountain-guide tone)
- A "Read more →" link pointing to the new page

Also add a `<hr class="divider">` before the new entry.

**Step 3 — Update the nav on all existing pages.**

Add a nav link to the new page in the `<nav>` of `index.html`, `routes.html`, and `most-beautiful.html`.

**Step 4 — Open the new page in the browser.**

Run: `open /Users/peter.schrijver/_TOP/Claude/2930jun/<new-filename>.html`

Then confirm to the user what was created and what was updated.
