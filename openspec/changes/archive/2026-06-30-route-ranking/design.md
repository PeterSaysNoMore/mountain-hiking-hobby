## Context

Static HTML hiking site (`2930jun/routes.html`). Three route cards with difficulty badges and a JS-powered filter bar. No build step, no framework. All styling is inline CSS per file.

Design tokens: Trail Pine `#3a5a40`, Forest Depth `#2c4430`, Canyon Amber `#e07b00` (one per page), Mountain Mist `#f5f5f0`. Typography: Georgia (headings/body), Arial (meta/badges).

## Goals / Non-Goals

**Goals:**
- Add visible rank numbers (#1, #2, #3) to each route card
- #1 visually distinct (Canyon Amber, larger); #2/#3 subdued (Trail Pine)
- Cards physically ordered by rank in the HTML

**Non-Goals:**
- Visitor voting or dynamic ranking
- JS-based sort
- Rank affecting filter behaviour

## Decisions

**Flex row layout for number + title**
Each `.route` card wraps its `h2` in a flex row alongside a `.rank-number` span. The number sits left; the h2 wraps independently at full remaining width.
Alternative: CSS Grid — rejected, overkill for two columns.

**CSS attribute selector for #1 styling**
`.route[data-rank="1"] .rank-number` targets Canyon Amber treatment. No extra class needed.
Alternative: separate `.rank-1` class — rejected, `data-rank` already carries the value.

**Canyon Amber on #1 rank number only**
Satisfies the one-Canyon-Amber-element-per-page rule. No other element on `routes.html` uses Canyon Amber.

**HTML order = rank order**
Yellowstone first, El Capitan second, Bright Angel third. No JS sort needed.

## Risks / Trade-offs

Adding more routes in future means manually maintaining rank order in HTML — acceptable for a personal hobby site.

Canyon Amber rule: if a future change adds another Canyon Amber element, the rank-1 number must change colour. Low risk.
